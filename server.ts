import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import { allBlogPosts } from "./src/data/blogPosts";
import { enhancedRemedies } from "./src/data/enhancedRemedies";
import { conditionsData } from "./src/data/conditionsData";
import { serverResources as resources } from "./src/data/serverResources";
import { assertPrivateDownloadAvailable, createSignedDownloadUrl, getFirestoreDocument, getPaidOrderEmailStatus, isPaidOrderStoreConfigured, patchFirestoreDocument, persistPaidOrder, updatePaidOrderEmailStatus, verifyFirebaseIdToken } from "./src/server/paidOrderStore";
import { isResourceEmailConfigured, sendAppointmentRequestNotification, sendAppointmentStatusNotification, sendPaidResourceEmail } from "./src/server/resourceEmail";
import { deleteClinicCalendarEvent, getClinicTimezone, isClinicCalendarConfigured, upsertClinicCalendarEvent } from "./src/server/clinicCalendar";
import path from "path";
import { fileURLToPath } from "url";
import Razorpay from "razorpay";
import crypto from "crypto";
import { GoogleGenAI, Type } from "@google/genai";
import { AI_ACADEMIC_CONSENT_HEADER, hasAiAcademicConsent, validateAcademicAiText } from "./src/server/aiPrivacyGuard";

// Safe path resolution for both ES modules and CommonJS
const getDirNameAndFileName = () => {
  try {
    if (typeof __filename !== "undefined" && typeof __dirname !== "undefined" && __filename && __dirname) {
      return { filename: __filename, dirname: __dirname };
    }
  } catch (e) {}

  try {
    if (typeof import.meta !== "undefined" && import.meta.url) {
      const filename = fileURLToPath(import.meta.url);
      const dirname = path.dirname(filename);
      return { filename, dirname };
    }
  } catch (e) {}

  const cwd = process.cwd();
  return { filename: path.join(cwd, "server.ts"), dirname: cwd };
};

const { filename: __filename, dirname: __dirname } = getDirNameAndFileName();

// Initialize Razorpay lazily to avoid crash if keys are missing
let razorpayInstance: Razorpay | null = null;

function getRazorpay() {
  if (!razorpayInstance) {
    const keyId = process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!keyId || !keySecret) {
      console.warn("Razorpay API keys are missing. Payment features will be disabled.");
      return null;
    }
    
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpayInstance;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isServerlessRuntime = Boolean(
    process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT
  );

  // Netlify forwards the visitor address through X-Forwarded-For. Trust only
  // the platform proxy hop so IP-based API limits key on the visitor, not the
  // shared function runtime.
  if (process.env.NETLIFY) {
    app.set('trust proxy', 1);
  }

  // Database setup (Pure JS In-Memory representation)
  // Helper to generate slug
  const generateSlug = (title: string, id: string) => {
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    return `${slug}-${id.substring(0, 5)}`;
  };

  // Helper to estimate reading time
  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / wordsPerMinute))} min read`;
  };

  const postsDb: any[] = allBlogPosts.map(post => {
    const slug = (post as any).slug || generateSlug(post.title, post.id);
    return {
      id: post.id,
      slug: slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      date: post.date,
      category: post.category,
      image: post.image,
      tags: post.tags || [],
      readingTime: estimateReadingTime(post.content),
      seoTitle: post.seoTitle || null,
      quickSummary: (post as any).quickSummary || [],
      keyPatterns: (post as any).keyPatterns || [],
      whoItSuits: (post as any).whoItSuits || null,
      whenToConsider: (post as any).whenToConsider || [],
      modalities: (post as any).modalities || { better: [], worse: [] },
      comparisons: (post as any).comparisons || [],
      relatedCarePlans: (post as any).relatedCarePlans || [],
      citations: (post as any).citations || [],
      relatedRemedies: (post as any).relatedRemedies || [],
      relatedConditions: (post as any).relatedConditions || []
    };
  });

  console.log("Database seeded with", postsDb.length, "posts in-memory.");

  app.use(express.json({
    limit: "128kb",
    verify: (req: any, _res, buffer: Buffer) => {
      // Preserve exact bytes only for Razorpay's signed webhook. Request bodies
      // for ordinary API/AI calls are not duplicated into req.rawBody.
      const requestPath = String(req.originalUrl || req.url || "").split("?")[0];
      const requestSegments = requestPath.split("/").filter(Boolean);
      if (requestSegments[requestSegments.length - 1] === "razorpay-webhook") {
        req.rawBody = Buffer.from(buffer);
      }
    },
  }));

  // API responses can contain account, appointment, order or AI-generated data.
  // They must never be stored by browsers, service workers, or shared proxies.
  app.use("/api", (_req, res, next) => {
    res.setHeader("Cache-Control", "private, no-store, max-age=0, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
  });
  
  async function emailPaidResourceIfConfigured(order: any, payment: any, resource: any, orderOwnerId: string, userEmail: string): Promise<'sent' | 'not-configured' | 'failed' | 'expired'> {
    if (!isResourceEmailConfigured()) return 'not-configured';

    const existingStatus = await getPaidOrderEmailStatus(order.id).catch(() => undefined);
    if (existingStatus === 'sent') return 'sent';

    const createdAt = typeof order.created_at === 'number' ? new Date(order.created_at * 1000) : new Date();
    const emailExpirySeconds = 24 * 60 * 60;
    try {
      // Anchor the email URL to the Razorpay order creation time so webhook retries
      // generate the same payload and Resend can safely deduplicate them.
      const emailDownloadUrl = createSignedDownloadUrl(resource.storageObject, emailExpirySeconds, createdAt);
      await sendPaidResourceEmail({
        orderId: order.id,
        to: userEmail,
        resourceTitle: resource.title,
        downloadUrl: emailDownloadUrl,
        amount: Number(payment.amount),
        currency: payment.currency,
      });
      await updatePaidOrderEmailStatus(order.id, 'sent');
      return 'sent';
    } catch (emailError: any) {
      const expired = String(emailError?.message || '').includes('expired');
      console.error('Paid resource email delivery failed:', emailError?.name || 'ProviderError');
      await updatePaidOrderEmailStatus(order.id, expired ? 'expired' : 'failed').catch((statusError) => {
        console.error('Unable to persist resource email status:', statusError?.name || 'StorageError');
      });
      return expired ? 'expired' : 'failed';
    }
  }

  function firestoreField(document: any, fieldName: string): any {
    const field = document?.fields?.[fieldName];
    if (!field) return undefined;
    if ('stringValue' in field) return field.stringValue;
    if ('timestampValue' in field) return field.timestampValue;
    if ('integerValue' in field) return Number(field.integerValue);
    return undefined;
  }

  function appointmentRecord(document: any, requestId: string) {
    if (!document) return null;
    return {
      id: requestId,
      updateTime: document.updateTime,
      userId: firestoreField(document, 'userId'),
      userEmail: firestoreField(document, 'userEmail'),
      displayName: firestoreField(document, 'displayName') || '',
      phoneNumber: firestoreField(document, 'phoneNumber') || '',
      serviceType: firestoreField(document, 'serviceType') || 'general-consultation',
      preferredDate: firestoreField(document, 'preferredDate') || '',
      preferredTime: firestoreField(document, 'preferredTime') || '',
      timezone: firestoreField(document, 'timezone') || 'UTC',
      status: firestoreField(document, 'status') || 'requested',
      adminResponse: firestoreField(document, 'adminResponse') || '',
      confirmedDateTime: firestoreField(document, 'confirmedDateTime') || '',
      confirmedTimeZone: firestoreField(document, 'confirmedTimeZone') || '',
      calendarEventId: firestoreField(document, 'calendarEventId') || '',
    };
  }

  function appointmentAdminUids(): string[] {
    return (process.env.CURIVA_APPOINTMENT_ADMIN_UIDS || '').split(',').map((value) => value.trim()).filter(Boolean);
  }

  app.get('/api/appointments/config', (_req, res) => {
    res.json({
      calendarConfigured: isClinicCalendarConfigured() && isPaidOrderStoreConfigured(),
      clinicTimezone: getClinicTimezone(),
      notificationsConfigured: Boolean(process.env.CURIVA_APPOINTMENT_NOTIFICATION_EMAIL?.trim() && isResourceEmailConfigured()),
    });
  });

  const appointmentNotifyRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many appointment notification attempts. Please try again later.' },
  });

  const appointmentAdminUpdateRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many appointment review attempts. Please try again later.' },
  });

  app.post('/api/appointments/notify-request', appointmentNotifyRateLimiter, async (req, res) => {
    const authorization = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Sign in to notify the clinic about an appointment request.' });
    }
    let identity: { uid: string; email: string | null; emailVerified: boolean };
    try {
      identity = await verifyFirebaseIdToken(authorization.slice(7).trim());
    } catch {
      return res.status(401).json({ success: false, error: 'Your Curiva account session could not be verified.' });
    }
    if (!identity.emailVerified) {
      return res.status(403).json({ success: false, error: 'Verify your account email before sending a clinic notification.' });
    }
    const requestId = typeof req.body?.requestId === 'string' ? req.body.requestId : '';
    if (!requestId || requestId.length > 128 || requestId.includes('/')) {
      return res.status(400).json({ success: false, error: 'A valid appointment request ID is required.' });
    }
    const clinicEmail = process.env.CURIVA_APPOINTMENT_NOTIFICATION_EMAIL?.trim();
    if (!clinicEmail || !isResourceEmailConfigured()) {
      return res.status(503).json({ success: false, notification: 'not-configured', error: 'Clinic request email notifications are not configured.' });
    }
    try {
      const document = await getFirestoreDocument('appointmentRequests', requestId);
      const request = appointmentRecord(document, requestId);
      if (!request) return res.status(404).json({ success: false, error: 'Appointment request was not found.' });
      if (request.userId !== identity.uid) return res.status(403).json({ success: false, error: 'You can notify the clinic only about your own request.' });
      if (request.status !== 'requested') return res.status(409).json({ success: false, error: 'Only a pending request can be notified.' });
      await sendAppointmentRequestNotification({
        requestId,
        to: clinicEmail,
        requesterName: request.displayName,
        requesterEmail: request.userEmail || identity.email || '',
        phoneNumber: request.phoneNumber,
        serviceType: request.serviceType,
        preferredDate: request.preferredDate,
        preferredTime: request.preferredTime,
        timezone: request.timezone,
      });
      return res.status(200).json({ success: true, notification: 'sent' });
    } catch (error: any) {
      console.error('Appointment request notification failed:', error?.name || 'ProviderError');
      return res.status(502).json({ success: false, notification: 'failed', error: 'Your request is saved, but the clinic email notification failed.' });
    }
  });

  app.post('/api/appointments/admin-update', appointmentAdminUpdateRateLimiter, async (req, res) => {
    const authorization = typeof req.headers.authorization === 'string' ? req.headers.authorization : '';
    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Sign in as a clinic administrator to update requests.' });
    }
    let identity: { uid: string; email: string | null; emailVerified: boolean };
    try {
      identity = await verifyFirebaseIdToken(authorization.slice(7).trim());
    } catch {
      return res.status(401).json({ success: false, error: 'Your Curiva account session could not be verified.' });
    }
    if (!identity.emailVerified || !appointmentAdminUids().includes(identity.uid)) {
      return res.status(403).json({ success: false, error: 'This account is not configured as an appointment administrator.' });
    }

    const requestId = typeof req.body?.requestId === 'string' ? req.body.requestId : '';
    const status = req.body?.status;
    const adminResponse = typeof req.body?.adminResponse === 'string' ? req.body.adminResponse.trim().slice(0, 500) : '';
    const confirmedDateTime = typeof req.body?.confirmedDateTime === 'string' ? req.body.confirmedDateTime : '';
    if (!requestId || requestId.length > 128 || requestId.includes('/') || !['requested', 'confirmed', 'declined', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid appointment review request.' });
    }

    try {
      const document = await getFirestoreDocument('appointmentRequests', requestId);
      const request = appointmentRecord(document, requestId);
      if (!request) return res.status(404).json({ success: false, error: 'Appointment request was not found.' });
      if (!request.userEmail) return res.status(400).json({ success: false, error: 'The requester needs an account email before this request can be confirmed.' });
      if (status === 'confirmed' && !isClinicCalendarConfigured()) {
        return res.status(503).json({ success: false, error: 'Clinic confirmation is disabled until the Google Calendar, clinic time zone, and administrator UID list are configured.' });
      }

      let eventId = request.calendarEventId || '';
      let clinicTimezone = request.confirmedTimeZone || '';
      let confirmedTime = request.confirmedDateTime || '';
      let rollbackCalendar: (() => Promise<void>) | null = null;

      if (status === 'confirmed') {
        if (!confirmedDateTime) {
          return res.status(400).json({ success: false, error: 'Enter the actual clinic date and time before confirming.' });
        }
        const event = await upsertClinicCalendarEvent(request, confirmedDateTime, adminResponse);
        eventId = event.id;
        clinicTimezone = event.timeZone;
        confirmedTime = confirmedDateTime;
        if (request.status === 'confirmed' && request.confirmedDateTime) {
          rollbackCalendar = async () => { await upsertClinicCalendarEvent(request, request.confirmedDateTime!, request.adminResponse || ''); };
        } else {
          rollbackCalendar = () => deleteClinicCalendarEvent(request.id, event.id);
        }
      } else if (request.calendarEventId) {
        await deleteClinicCalendarEvent(request.id, request.calendarEventId);
        rollbackCalendar = async () => { await upsertClinicCalendarEvent(request, request.confirmedDateTime || confirmedDateTime, request.adminResponse || ''); };
        eventId = '';
        clinicTimezone = '';
        confirmedTime = '';
      }

      const fields: Record<string, any> = {
        status: { stringValue: status },
        adminResponse: { stringValue: adminResponse },
        updatedAt: { timestampValue: new Date().toISOString() },
      };
      const updateMask = ['status', 'adminResponse', 'updatedAt'];
      const deleteMask: string[] = [];
      if (status === 'confirmed') {
        fields.calendarEventId = { stringValue: eventId };
        fields.confirmedDateTime = { stringValue: confirmedTime };
        fields.confirmedTimeZone = { stringValue: clinicTimezone };
        updateMask.push('calendarEventId', 'confirmedDateTime', 'confirmedTimeZone');
      } else {
        deleteMask.push('calendarEventId', 'confirmedDateTime', 'confirmedTimeZone');
      }

      try {
        await patchFirestoreDocument('appointmentRequests', requestId, fields, updateMask, deleteMask, request.updateTime);
      } catch (writeError) {
        if (rollbackCalendar) {
          try {
            await rollbackCalendar();
          } catch (rollbackError: any) {
            console.error('Calendar rollback failed and requires manual reconciliation:', rollbackError?.name || 'CalendarError');
          }
        }
        throw writeError;
      }

      let emailDelivery: 'sent' | 'not-configured' | 'failed' = 'not-configured';
      if (isResourceEmailConfigured()) {
        try {
          await sendAppointmentStatusNotification({
            requestId,
            to: request.userEmail,
            requesterName: request.displayName,
            status,
            adminResponse,
            confirmedDateTime: status === 'confirmed' ? confirmedTime : undefined,
            confirmedTimeZone: status === 'confirmed' ? clinicTimezone : undefined,
          });
          emailDelivery = 'sent';
        } catch (emailError: any) {
          console.error('Appointment status email failed:', emailError?.name || 'ProviderError');
          emailDelivery = 'failed';
        }
      }
      return res.json({
        success: true,
        status,
        calendarEventId: status === 'confirmed' ? eventId : null,
        calendarTimezone: status === 'confirmed' ? clinicTimezone : null,
        emailDelivery,
      });
    } catch (error: any) {
      console.error('Appointment review update failed:', error?.name || 'StorageError');
      const errorMessage = String(error?.message || '');
      const conflict = errorMessage.includes('HTTP 409') ||
        errorMessage.includes('HTTP 412') ||
        errorMessage.includes('overlaps an existing clinic calendar event');
      return res.status(conflict ? 409 : 503).json({
        success: false,
        error: conflict ? 'Another administrator changed this request; refresh before trying again.' : error?.message || 'The request could not be updated safely.',
      });
    }
  });

  // Resource email delivery is intentionally unavailable until a real provider is configured.
  // Never report a successful delivery when the server has not sent an email.
  app.post("/api/send-resource-email", (_req, res) => {
    res.status(503).json({
      success: false,
      error: "Resource email delivery is not configured yet. Please contact Curiva support for access."
    });
  });

  const createRazorpayOrderLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many order creation attempts. Please try again later." },
  });

  // Razorpay Order Creation
  // Prices and currency are derived from the server-side catalogue; never trust client-supplied amounts.
  app.post("/api/create-razorpay-order", createRazorpayOrderLimiter, async (req, res) => {
    const resourceId = typeof req.body?.resourceId === "string" ? req.body.resourceId : "";
    const customerEmail = typeof req.body?.email === "string" ? req.body.email.trim() : "";
    const authorization = typeof req.headers.authorization === "string" ? req.headers.authorization : "";
    let verifiedOrderUser: { uid: string; email: string | null; emailVerified: boolean } | null = null;
    if (authorization.startsWith("Bearer ")) {
      try {
        verifiedOrderUser = await verifyFirebaseIdToken(authorization.slice(7).trim());
      } catch {
        return res.status(401).json({ error: "Your account session could not be verified. Sign in again before checkout." });
      }
    }
    const emailParts = customerEmail.split("@");
    const emailDomain = emailParts[1] || "";
    const hasWhitespace = [...customerEmail].some((character) => character.charCodeAt(0) <= 32);
    if (
      customerEmail.length > 200 ||
      emailParts.length !== 2 ||
      !emailParts[0] ||
      !emailDomain.includes(".") ||
      emailDomain.startsWith(".") ||
      emailDomain.endsWith(".") ||
      hasWhitespace
    ) {
      return res.status(400).json({ error: "Enter a valid email address before creating an order." });
    }
    const resource = resources.find((item) => item.id === resourceId);

    if (!resource) {
      return res.status(400).json({ error: "Choose a valid resource before creating an order." });
    }
    if (typeof resource.storageObject !== "string" || !resource.storageObject) {
      return res.status(503).json({ error: "Secure downloads are not configured for this resource yet." });
    }
    try {
      await assertPrivateDownloadAvailable(resource.storageObject);
    } catch (storageError: any) {
      console.error("Private resource availability check failed:", storageError?.name || "StorageError");
      return res.status(503).json({
        error: "Secure resource storage is not configured or the PDF is not uploaded yet. No payment has been taken.",
      });
    }
    if (!Number.isFinite(resource.price) || resource.price < 1) {
      return res.status(400).json({ error: "This resource is not configured for online payment." });
    }

    const razorpay = getRazorpay();
    if (!razorpay) {
      return res.status(503).json({ error: "Online payment is temporarily unavailable." });
    }

    try {
      const order = await razorpay.orders.create({
        amount: Math.round(resource.price * 100),
        currency: "INR",
        receipt: `res_${crypto.randomUUID().replace(/-/g, "").slice(0, 24)}`,
        notes: { resource_id: resource.id, customer_email: verifiedOrderUser?.email || customerEmail, customer_uid: verifiedOrderUser?.uid || "guest" },
      });
      res.json(order);
    } catch (error: any) {
      // Keep provider diagnostics in server logs; do not expose internal error details to clients.
      console.error("Razorpay order creation failed:", error?.name || "ProviderError");
      res.status(502).json({
        error: "Unable to create a payment order right now. Please try again later."
      });
    }
  });

  // Razorpay webhook recovery for captured payments if the browser callback is interrupted.
  app.post("/api/razorpay-webhook", async (req, res) => {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return res.status(503).json({ received: false, error: "Payment webhook is not configured." });
    }

    const signatureHeader = req.headers["x-razorpay-signature"];
    const signature = Array.isArray(signatureHeader) ? signatureHeader[0] : signatureHeader;
    const rawBody = (req as any).rawBody as Buffer | undefined;
    if (!rawBody || typeof signature !== "string" || !/^[a-f0-9]{64}$/i.test(signature)) {
      return res.status(400).json({ received: false, error: "Invalid webhook signature." });
    }

    const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest();
    const providedSignature = Buffer.from(signature, "hex");
    if (!(providedSignature.length === expectedSignature.length && crypto.timingSafeEqual(expectedSignature, providedSignature))) {
      return res.status(400).json({ received: false, error: "Invalid webhook signature." });
    }

    if (req.body?.event !== "payment.captured") {
      return res.status(200).json({ received: true, ignored: true });
    }

    const paymentEntity = req.body?.payload?.payment?.entity;
    const orderId = typeof paymentEntity?.order_id === "string" ? paymentEntity.order_id : "";
    const paymentId = typeof paymentEntity?.id === "string" ? paymentEntity.id : "";
    if (!orderId || !paymentId) {
      return res.status(400).json({ received: false, error: "Captured payment webhook is missing its order/payment ID." });
    }

    const razorpay = getRazorpay();
    if (!razorpay) {
      return res.status(503).json({ received: false, error: "Payment verification is temporarily unavailable." });
    }

    try {
      const [order, payment] = await Promise.all([
        razorpay.orders.fetch(orderId),
        razorpay.payments.fetch(paymentId),
      ]);
      const resourceId = typeof order.notes?.resource_id === "string" ? order.notes.resource_id : "";
      const resource = resources.find((item) => item.id === resourceId);
      const expectedAmount = resource && Number.isFinite(resource.price) ? Math.round(resource.price * 100) : -1;
      const paymentAmount = Number(payment.amount);
      const orderAmount = Number(order.amount);

      if (
        !resource ||
        order.id !== orderId ||
        payment.order_id !== orderId ||
        payment.id !== paymentId ||
        payment.status !== "captured" ||
        !Number.isSafeInteger(paymentAmount) ||
        paymentAmount !== orderAmount ||
        orderAmount !== expectedAmount ||
        payment.currency !== "INR" ||
        order.currency !== "INR"
      ) {
        return res.status(400).json({ received: false, error: "Payment does not match a captured catalogue order." });
      }

      const userEmail = typeof order.notes?.customer_email === "string" ? order.notes.customer_email : "";
      if (!userEmail) {
        console.error("Captured payment webhook has no customer email:", orderId);
        return res.status(503).json({ received: false, error: "Captured order is missing its contact email." });
      }

      const ownerId = typeof order.notes?.customer_uid === "string" ? order.notes.customer_uid : "guest";
      await persistPaidOrder({
        orderId: order.id,
        paymentId: payment.id,
        userId: ownerId,
        userEmail,
        resourceId: resource.id,
        resourceTitle: resource.title,
        amount: paymentAmount,
        currency: payment.currency,
      });
      const emailDelivery = await emailPaidResourceIfConfigured(order, payment, resource, ownerId, userEmail);
      if (emailDelivery === 'failed') {
        // Ask Razorpay to retry; Resend's idempotency key prevents duplicate delivery.
        return res.status(503).json({ received: false, recorded: true, error: "Paid order was recorded; resource email delivery will be retried." });
      }
      return res.status(200).json({ received: true, recorded: true, emailDelivery });
    } catch (error: any) {
      console.error("Razorpay webhook processing failed:", error?.name || "WebhookError");
      return res.status(503).json({ received: false, error: "Webhook processing failed; Razorpay may retry." });
    }
  });

  const verifyRazorpayPaymentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: "Too many payment verification attempts. Please try again later." },
  });

  // Razorpay Payment Verification
  app.post("/api/verify-razorpay-payment", verifyRazorpayPaymentLimiter, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body ?? {};
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return res.status(503).json({ success: false, error: "Payment verification is temporarily unavailable." });
    }
    if (
      typeof razorpay_order_id !== "string" || !razorpay_order_id ||
      typeof razorpay_payment_id !== "string" || !razorpay_payment_id ||
      typeof razorpay_signature !== "string" || !/^[a-f0-9]{64}$/i.test(razorpay_signature)
    ) {
      return res.status(400).json({ success: false, message: "Invalid payment verification payload." });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest();
    const providedSignature = Buffer.from(razorpay_signature, "hex");

    if (!(providedSignature.length === expectedSignature.length && crypto.timingSafeEqual(expectedSignature, providedSignature))) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // A valid signature alone does not prove that the payment was captured for the
    // expected catalogue price. Cross-check both records with Razorpay's API.
    const razorpay = getRazorpay();
    if (!razorpay) {
      return res.status(503).json({ success: false, error: "Payment verification is temporarily unavailable." });
    }

    try {
      const [order, payment] = await Promise.all([
        razorpay.orders.fetch(razorpay_order_id),
        razorpay.payments.fetch(razorpay_payment_id),
      ]);
      const resourceId = typeof order.notes?.resource_id === "string" ? order.notes.resource_id : "";
      const resource = resources.find((item) => item.id === resourceId);
      const expectedAmount = resource && Number.isFinite(resource.price) ? Math.round(resource.price * 100) : -1;
      const paymentAmount = Number(payment.amount);
      const orderAmount = Number(order.amount);

      if (
        !resource ||
        order.id !== razorpay_order_id ||
        payment.order_id !== razorpay_order_id ||
        payment.id !== razorpay_payment_id ||
        payment.status !== "captured" ||
        !Number.isSafeInteger(paymentAmount) ||
        paymentAmount !== orderAmount ||
        orderAmount !== expectedAmount ||
        payment.currency !== "INR" ||
        order.currency !== "INR"
      ) {
        return res.status(400).json({ success: false, message: "Payment does not match a captured catalogue order." });
      }

      // Record the captured payment in Firestore from the trusted server before releasing access.
      // The browser is never allowed to mark an order as paid.
      const orderedUserId = typeof order.notes?.customer_uid === "string" ? order.notes.customer_uid : "guest";
      const authorization = typeof req.headers.authorization === "string" ? req.headers.authorization : "";
      let verifiedUser: { uid: string; email: string | null; emailVerified: boolean } | null = null;
      if (authorization.startsWith("Bearer ")) {
        try {
          verifiedUser = await verifyFirebaseIdToken(authorization.slice(7).trim());
        } catch {
          return res.status(401).json({
            success: false,
            paymentVerified: true,
            retryable: true,
            error: "Razorpay verified the payment, but your account could not be re-verified. Sign in and retry verification; do not pay again.",
          });
        }
      }

      if (orderedUserId !== "guest" && (!verifiedUser || !verifiedUser.emailVerified || verifiedUser.uid !== orderedUserId)) {
        return res.status(401).json({
          success: false,
          paymentVerified: true,
          retryable: true,
          error: "This payment belongs to a different Curiva account. Sign in to the account used at checkout and retry; do not pay again.",
        });
      }
      const orderOwnerId = orderedUserId === "guest" ? "guest" : verifiedUser!.uid;
      const userEmail = (orderOwnerId !== "guest" ? verifiedUser?.email : null) ||
        (typeof order.notes?.customer_email === "string" ? order.notes.customer_email : "");
      if (!userEmail) {
        return res.status(503).json({
          success: false,
          paymentVerified: true,
          retryable: false,
          error: "Razorpay verified the payment, but the order has no verified contact email. Do not pay again; contact Curiva support with your payment ID.",
        });
      }

      let downloadUrl: string;
      try {
        // The object was checked before checkout, but signed URLs are created only after capture.
        downloadUrl = createSignedDownloadUrl(resource.storageObject, 3600);
      } catch (downloadError: any) {
        console.error("Private download signing failed:", downloadError?.name || "SigningError");
        return res.status(503).json({
          success: false,
          paymentVerified: true,
          retryable: true,
          error: "Razorpay verified your payment, but the secure download link could not be issued. Retry verification; do not pay again.",
        });
      }

      try {
        await persistPaidOrder({
          orderId: order.id,
          paymentId: payment.id,
          userId: orderOwnerId,
          userEmail,
          resourceId: resource.id,
          resourceTitle: resource.title,
          amount: paymentAmount,
          currency: payment.currency,
        });
      } catch (recordError: any) {
        const configured = isPaidOrderStoreConfigured();
        console.error("Captured payment could not be persisted:", recordError?.name || "StorageError");
        return res.status(503).json({
          success: false,
          paymentVerified: true,
          retryable: configured,
          error: configured
            ? "Razorpay verified your payment, but secure order recording is temporarily unavailable. Retry verification here; do not pay again."
            : "Razorpay verified your payment, but secure order recording is not configured. Do not pay again; contact Curiva support with your payment ID.",
        });
      }

      const emailDelivery = await emailPaidResourceIfConfigured(order, payment, resource, orderOwnerId, userEmail);
      return res.json({
        success: true,
        message: "Payment verified and securely recorded.",
        resourceId: resource.id,
        downloadUrl,
        emailDelivery,
        orderId: order.id,
        amount: paymentAmount,
        currency: payment.currency,
      });
    } catch (error: any) {
      console.error("Razorpay verification lookup failed:", error?.name || "ProviderError");
      return res.status(502).json({ success: false, error: "Could not confirm payment status with Razorpay. Please contact support before retrying." });
    }
  });

  // Gemini Proxy API Endpoints
  function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  async function safeGenerateContent(params: {
    model: string;
    contents: any;
    config?: any;
    fallback: any;
  }): Promise<any> {
    const modelsToTry = [params.model, "gemini-3.1-flash-lite", "gemini-flash-latest"];
    for (let i = 0; i < modelsToTry.length; i++) {
      const currentModel = modelsToTry[i];
      try {
        const ai = getGeminiClient();
        const response = await ai.models.generateContent({
          model: currentModel,
          contents: params.contents,
          config: params.config,
        });
        return response;
      } catch (error: any) {
        const msg = error?.message || String(error);
        if (msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("limit") || msg.includes("Quota")) {
          console.log(`[Gemini Status] ${currentModel} rate-limited or quota reached.`);
        } else {
          // Never log provider error bodies or request-derived content.
          console.log(`[Gemini Status] ${currentModel} temporarily unavailable (${error?.name || 'ProviderError'}).`);
        }
        if (msg.includes("API key") || msg.includes("is required") || msg.includes("not found")) {
          break;
        }
      }
    }
    
    console.warn(`[Gemini Safe] All models exhausted or API key is invalid/rate-limited. Engaging offline fallback.`);
    if (typeof params.fallback === "function") {
      return params.fallback();
    }
    return { text: params.fallback };
  }

  function getInstantResponseForKeyword(text: string): { title: string; path: string; category: string; description: string }[] {
    const combined = text.toLowerCase();
    const matched: { title: string; path: string; category: string; description: string }[] = [];

    const REFERENCE_CATALOG: Record<string, { title: string; path: string; category: string; description: string }> = {
      "lycopodium": { 
        title: "Lycopodium Clavatum", 
        path: "/read/lycopodium-profile", 
        category: "Constitutional Profile",
        description: "A deep-acting constitutional remedy prepared from club moss, characterized by apprehension, lack of self-confidence, digestive flatulence, and right-sided complaints."
      },
      "pulsatilla": { 
        title: "Pulsatilla Nigricans", 
        path: "/read/pulsatilla-profile", 
        category: "Constitutional Profile",
        description: "Prepared from the wind flower; suited to mild, gentle, yielding personalities with highly changeable symptoms and thirstlessness."
      },
      "arsenicum": { 
        title: "Arsenicum Album", 
        path: "/read/arsenicum-profile", 
        category: "Constitutional Profile",
        description: "A powerful remedy for profound anxiety, restlessness, burning pains relieved by heat, and extreme fastidiousness."
      },
      "gelsemium": { 
        title: "Gelsemium Sempervirens", 
        path: "/read/gelsemium-profile", 
        category: "Constitutional Profile",
        description: "Suited to states of heavy dullness, dizziness, drowsiness, muscular weakness, and anticipatory stage fright."
      },
      "aconite": { 
        title: "Aconitum Napellus", 
        path: "/read/aconite-profile", 
        category: "Constitutional Profile",
        description: "The primary acute remedy for sudden, violent onset of fever, congestion, panic, and extreme restlessness after dry, cold winds."
      },
      "aconitum": { 
        title: "Aconitum Napellus", 
        path: "/read/aconite-profile", 
        category: "Constitutional Profile",
        description: "The primary acute remedy for sudden, violent onset of fever, congestion, panic, and extreme restlessness after dry, cold winds."
      },
      "belladonna": { 
        title: "Belladonna", 
        path: "/read/belladonna-profile", 
        category: "Constitutional Profile",
        description: "Indicated for sudden, violent congestion with high fever, burning heat, red flushed face, throbbing headache, and dilated pupils."
      },
      "bryonia": { 
        title: "Bryonia Alba", 
        path: "/read/bryonia-profile", 
        category: "Constitutional Profile",
        description: "Characteristics include extreme dryness of all mucous membranes, stitching pains, and intense aggravation from any physical motion."
      },
      "ignatia": { 
        title: "Ignatia Amara", 
        path: "/read/ignatia-profile", 
        category: "Constitutional Profile",
        description: "The premier remedy for hysterical manifestations, sudden emotional shocks, paradoxical symptoms, and silent, acute grief."
      },
      "sulphur": { 
        title: "Sulphur", 
        path: "/read/sulphur-profile", 
        category: "Constitutional Profile",
        description: "The 'ragged philosopher' remedy, suited to intellectual but untidy individuals who are extremely hot and suffer from burning skin."
      },
      "nux vomica": { 
        title: "Nux Vomica", 
        path: "/read/nux-vomica-profile", 
        category: "Constitutional Profile",
        description: "Excellent for modern sedentary lifestyles, digestive disorders, irritability, and oversensitiveness due to stimulants or stress."
      },
      "nux-vomica": { 
        title: "Nux Vomica", 
        path: "/read/nux-vomica-profile", 
        category: "Constitutional Profile",
        description: "Excellent for modern sedentary lifestyles, digestive disorders, irritability, and oversensitiveness due to stimulants or stress."
      },
      "rhus tox": { 
        title: "Rhus Toxicodendron", 
        path: "/read/rhus-tox", 
        category: "Constitutional Profile",
        description: "Indicated for joint stiffness, rheumatic pains, and physical restlessness where pains are worse during rest and better with motion."
      },
      "rhus-tox": { 
        title: "Rhus Toxicodendron", 
        path: "/read/rhus-tox", 
        category: "Constitutional Profile",
        description: "Indicated for joint stiffness, rheumatic pains, and physical restlessness where pains are worse during rest and better with motion."
      },
      "natrum mur": { 
        title: "Natrum Muriaticum", 
        path: "/read/natrum-muriaticum", 
        category: "Constitutional Profile",
        description: "Suited to reserved, introverted personalities harboring chronic, silent grief, dwelling on past memories, and craving salt."
      },
      "nat-mur": { 
        title: "Natrum Muriaticum", 
        path: "/read/nat-mur-profile", 
        category: "Constitutional Profile",
        description: "Suited to reserved, introverted personalities harboring chronic, silent grief, dwelling on past memories, and craving salt."
      },
      "sepia": { 
        title: "Sepia Officinalis", 
        path: "/read/sepia", 
        category: "Constitutional Profile",
        description: "Indicated for pelvic bearing-down sensations, hormonal imbalances, and profound emotional indifference towards loved ones."
      },
      "hair loss": { 
        title: "Hair Loss, Alopecia & Thinning Guide", 
        path: "/read/hair-loss-homeopathy", 
        category: "Therapeutics Guide",
        description: "A comprehensive clinical guide to addressing male pattern baldness, alopecia areata, female thinning, and scalp rejuvenation naturally."
      },
      "alopecia": { 
        title: "Hair Loss, Alopecia & Thinning Guide", 
        path: "/read/hair-loss-homeopathy", 
        category: "Therapeutics Guide",
        description: "A comprehensive clinical guide to addressing male pattern baldness, alopecia areata, female thinning, and scalp rejuvenation naturally."
      },
      "hair fall": { 
        title: "Hair Loss, Alopecia & Thinning Guide", 
        path: "/read/hair-loss-homeopathy", 
        category: "Therapeutics Guide",
        description: "A comprehensive clinical guide to addressing male pattern baldness, alopecia areata, female thinning, and scalp rejuvenation naturally."
      },
      "anxiety": { 
        title: "Anxiety & Mental Strain Study", 
        path: "/read/anxiety-homeopathy-deep", 
        category: "Therapeutics Guide",
        description: "An in-depth study of psychological stress, anticipatory anxiety, and constitutional stress-management techniques in homeopathy."
      },
      "depression": { 
        title: "Depression & Chronic Mood Guide", 
        path: "/read/depression-homeopathy", 
        category: "Therapeutics Guide",
        description: "A clinical guide focusing on melancholia, quiet grief, and safe natural alternatives for restoration of mental health."
      },
      "eczema": { 
        title: "Eczema & Dermatitis Therapeutics", 
        path: "/read/eczema-homeopathy", 
        category: "Therapeutics Guide",
        description: "Treating chronic dry or weeping skin eruptions, itching modalities, and the risk of topical steroid suppression."
      },
      "asthma": { 
        title: "Asthma & Bronchial Spasms Guide", 
        path: "/read/asthma-homeopathy", 
        category: "Therapeutics Guide",
        description: "Addressing respiratory allergies, dyspnea, and spasmodic coughing with homeopathic therapeutic matches."
      },
      "migraine": { 
        title: "Migraines & Periodic Headaches", 
        path: "/read/migraine-homeopathy", 
        category: "Therapeutics Guide",
        description: "Addressing vascular head pain, localized throbbing, lateralization, and sensory triggers."
      },
      "insomnia": { 
        title: "Insomnia & Sleep Disturbances", 
        path: "/read/insomnia-homeopathy", 
        category: "Therapeutics Guide",
        description: "Understanding sleeplessness from active minds, physical fatigue, and rest-cycle restoration."
      },
      "gastritis": { 
        title: "Gastritis & Acid Reflux Study", 
        path: "/read/gastritis-homeopathy", 
        category: "Therapeutics Guide",
        description: "Managing heartburn, flatulence, GERD, and stomach ulcers with natural gastrointestinal therapy."
      },
      "psoriasis": { 
        title: "Psoriasis & Scalp Plaques Guide", 
        path: "/read/psoriasis-homeopathy", 
        category: "Therapeutics Guide",
        description: "Tackling silver-scaled skin plaques, thick scalp dermatitis, and deep chronic auto-immune miasmatic blockages."
      },
      "organon": { 
        title: "Organon of Medicine & Hahnemannian Philosophy", 
        path: "/lexicon/philosophy", 
        category: "Academic Reference",
        description: "A fundamental guide to Samuel Hahnemann's Organon of Medicine, including vital force, miasms, and laws of cure."
      },
      "aphorism": { 
        title: "Organon of Medicine & Hahnemannian Philosophy", 
        path: "/lexicon/philosophy", 
        category: "Academic Reference",
        description: "Analyzing the fundamental laws and guidelines laid down in Hahnemann's Aphorisms."
      },
      "remedy comparison": { 
        title: "Comparative Remedy Matrix", 
        path: "/analysis", 
        category: "Study Tool",
        description: "An interactive workspace for side-by-side comparative clinical evaluation of sister remedies."
      },
      "comparative analyzer": { 
        title: "Comparative Remedy Matrix", 
        path: "/analysis", 
        category: "Study Tool",
        description: "An interactive workspace for side-by-side comparative clinical evaluation of sister remedies."
      },
      "repertory": { 
        title: "Classical Repertory Analysis Tool", 
        path: "/repertory", 
        category: "Study Tool",
        description: "Our integrated desktop repertory designed for matching case rubrics with grading-based remedy outcomes."
      },
      "symptom checker": { 
        title: "Symptom-to-Rubric Checker", 
        path: "/symptom-checker", 
        category: "Diagnostic Tool",
        description: "An advanced, user-friendly helper translating common patient language into medical repertory rubrics."
      },
      "mcq": { 
        title: "Live MCQ Question Practice Board", 
        path: "/mcq-practice" , 
        category: "Academic Prep",
        description: "Practise real AIAPGET questions, track performance analytics, and prepare for state-level entrance exams."
      },
      "career": { 
        title: "BHMS Career Path & Scope Guide", 
        path: "/read/bhms-career", 
        category: "Academic Guide",
        description: "Exploring paths after BHMS, including MD, public sector jobs, clinical practice, and research fellowships."
      },
      "anatomy": { 
        title: "First-Year Anatomy Integrated Guide", 
        path: "/read/bhms-anatomy", 
        category: "Anatomy Blueprint",
        description: "Study first-year anatomy, high-yield organ regions, and dissection notes aligned with BHMS syllabus."
      },
      "physiology": { 
        title: "First-Year Physiology Integrated Guide", 
        path: "/read/bhms-physiology", 
        category: "Physiology Blueprint",
        description: "Crucial guidelines for studying cardiac cycle, nerve reflexes, and endocrine feedback systems in BHMS."
      },
      "research": { 
        title: "High-Dilution Clinical Homoeopathic Evidence", 
        path: "/read/research-homeopathy-evidence", 
        category: "Research Reference",
        description: "A database of physical chemistry, nanoparticle models, and double-blind clinical trials supporting homeopathy."
      }
    };

    // Check matches
    for (const [key, value] of Object.entries(REFERENCE_CATALOG)) {
      if (combined.includes(key)) {
        if (!matched.some(m => m.path === value.path)) {
          matched.push(value);
        }
      }
    }

    return matched;
  }

  function appendReferenceLinks(text: string, queryText: string = ""): string {
    const combined = (text + " " + queryText).toLowerCase();
    const matched: { name: string; path: string; category: string }[] = [];

    const REFERENCE_CATALOG: Record<string, { name: string; path: string; category: string }> = {
      "lycopodium": { name: "Lycopodium Clavatum", path: "/read/lycopodium-profile", category: "Constitutional Profile" },
      "pulsatilla": { name: "Pulsatilla Nigricans", path: "/read/pulsatilla-profile", category: "Constitutional Profile" },
      "arsenicum": { name: "Arsenicum Album", path: "/read/arsenicum-profile", category: "Constitutional Profile" },
      "gelsemium": { name: "Gelsemium Sempervirens", path: "/read/gelsemium-profile", category: "Constitutional Profile" },
      "aconite": { name: "Aconitum Napellus", path: "/read/aconite-profile", category: "Constitutional Profile" },
      "aconitum": { name: "Aconitum Napellus", path: "/read/aconite-profile", category: "Constitutional Profile" },
      "belladonna": { name: "Belladonna", path: "/read/belladonna-profile", category: "Constitutional Profile" },
      "bryonia": { name: "Bryonia Alba", path: "/read/bryonia-profile", category: "Constitutional Profile" },
      "ignatia": { name: "Ignatia Amara", path: "/read/ignatia-profile", category: "Constitutional Profile" },
      "sulphur": { name: "Sulphur", path: "/read/sulphur-profile", category: "Constitutional Profile" },
      "nux vomica": { name: "Nux Vomica", path: "/read/nux-vomica-profile", category: "Constitutional Profile" },
      "nux-vomica": { name: "Nux Vomica", path: "/read/nux-vomica-profile", category: "Constitutional Profile" },
      "rhus tox": { name: "Rhus Toxicodendron", path: "/read/rhus-tox", category: "Constitutional Profile" },
      "rhus-tox": { name: "Rhus Toxicodendron", path: "/read/rhus-tox", category: "Constitutional Profile" },
      "natrum mur": { name: "Natrum Muriaticum", path: "/read/natrum-muriaticum", category: "Constitutional Profile" },
      "nat-mur": { name: "Natrum Muriaticum", path: "/read/nat-mur-profile", category: "Constitutional Profile" },
      "sepia": { name: "Sepia Officinalis", path: "/read/sepia", category: "Constitutional Profile" },
      "hair loss": { name: "Hair Loss, Alopecia & Thinning Guide", path: "/read/hair-loss-homeopathy", category: "Therapeutics Guide" },
      "alopecia": { name: "Hair Loss, Alopecia & Thinning Guide", path: "/read/hair-loss-homeopathy", category: "Therapeutics Guide" },
      "hair fall": { name: "Hair Loss, Alopecia & Thinning Guide", path: "/read/hair-loss-homeopathy", category: "Therapeutics Guide" },
      "anxiety": { name: "Anxiety & Mental Strain Study", path: "/read/anxiety-homeopathy-deep", category: "Therapeutics Guide" },
      "depression": { name: "Depression & Chronic Mood Guide", path: "/read/depression-homeopathy", category: "Therapeutics Guide" },
      "eczema": { name: "Eczema & Dermatitis Therapeutics", path: "/read/eczema-homeopathy", category: "Therapeutics Guide" },
      "asthma": { name: "Asthma & Bronchial Spasms Guide", path: "/read/asthma-homeopathy", category: "Therapeutics Guide" },
      "migraine": { name: "Migraines & Periodic Headaches", path: "/read/migraine-homeopathy", category: "Therapeutics Guide" },
      "insomnia": { name: "Insomnia & Sleep Disturbances", path: "/read/insomnia-homeopathy", category: "Therapeutics Guide" },
      "gastritis": { name: "Gastritis & Acid Reflux Study", path: "/read/gastritis-homeopathy", category: "Therapeutics Guide" },
      "psoriasis": { name: "Psoriasis & Scalp Plaques Guide", path: "/read/psoriasis-homeopathy", category: "Therapeutics Guide" },
      "organon": { name: "Organon of Medicine & Hahnemannian Philosophy", path: "/lexicon/philosophy", category: "Academic Reference" },
      "aphorism": { name: "Organon of Medicine & Hahnemannian Philosophy", path: "/lexicon/philosophy", category: "Academic Reference" },
      "remedy comparison": { name: "Comparative Remedy Matrix", path: "/analysis", category: "Study Tool" },
      "comparative analyzer": { name: "Comparative Remedy Matrix", path: "/analysis", category: "Study Tool" },
      "repertory": { name: "Classical Repertory Analysis Tool", path: "/repertory", category: "Study Tool" },
      "symptom checker": { name: "Symptom-to-Rubric Checker", path: "/symptom-checker", category: "Diagnostic Tool" },
      "mcq": { name: "Live MCQ Question Practice Board", path: "/mcq-practice" , category: "Academic Prep" },
      "career": { name: "BHMS Career Path & Scope Guide", path: "/read/bhms-career", category: "Academic Guide" },
      "anatomy": { name: "First-Year Anatomy Integrated Guide", path: "/read/bhms-anatomy", category: "Anatomy Blueprint" },
      "physiology": { name: "First-Year Physiology Integrated Guide", path: "/read/bhms-physiology", category: "Physiology Blueprint" },
      "research": { name: "High-Dilution Clinical Homoeopathic Evidence", path: "/read/research-homeopathy-evidence", category: "Research Reference" }
    };

    // Find matches
    for (const [key, value] of Object.entries(REFERENCE_CATALOG)) {
      if (combined.includes(key)) {
        // Avoid duplicate paths
        if (!matched.some(m => m.path === value.path)) {
          matched.push(value);
        }
      }
      if (matched.length >= 4) break; // Limit to up to 4 references
    }

    // Default general references if none matched
    if (matched.length === 0) {
      matched.push({ name: "Homoeopathic Encyclopedia", path: "/lexicon/all", category: "Verified Registry" });
      matched.push({ name: "Organon of Medicine & Hahnemannian Philosophy", path: "/lexicon/all", category: "Academic Reference" });
    }

    // Append neutral links to related learning pages; the presence of a page match
    // is not a clinical review or evidence assessment.
    let referenceSection = `\n\n---\n\n### 📚 Related Study Pages:\n*Use these pages as educational reading, and check the cited source and edition where available:*`;
    
    matched.forEach(ref => {
      referenceSection += `\n- **[${ref.name}](${ref.path})** (${ref.category}) — Related academic reading.`;
    });

    return text + referenceSection;
  }

  // These routes invoke external AI/search providers. The shared limiter caps repeated
  // requests within a running function instance; use a shared store if the deployment
  // later scales across many concurrent instances.
  const aiApiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many AI requests. Please try again later.' },
  });

  function requireAcademicAiConsent(req: express.Request, res: express.Response): boolean {
    if (!hasAiAcademicConsent(req.get(AI_ACADEMIC_CONSENT_HEADER))) {
      res.status(428).json({
        error: "Explicit acknowledgement is required before sending academic text to the external AI provider.",
        noticeVersion: "academic-only-v1"
      });
      return false;
    }
    return true;
  }

  function validateExternalAcademicText(
    value: unknown,
    maxLength: number,
    res: express.Response,
    label: string
  ): string | null {
    const result = validateAcademicAiText(value, maxLength);
    if (result.ok === true) return result.text;
    if (result.ok === false && result.reason === "too-long") {
      res.status(413).json({ error: `${label} is too long.` });
    } else if (result.ok === false && result.reason === "sensitive") {
      res.status(400).json({
        error: `${label} appears to contain personal, identifying or health information. It was not sent. Remove those details and use academic-only text.`
      });
    } else {
      res.status(400).json({ error: `${label} must be a non-empty text value.` });
    }
    return null;
  }

  app.post("/api/gemini/curiva-care", aiApiRateLimiter, async (req, res) => {
    try {
      const body = req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body : {};
      const { prompt, conversationHistory } = body;
      if (!requireAcademicAiConsent(req, res)) return;
      const validatedPrompt = validateExternalAcademicText(prompt, 4000, res, "Prompt");
      if (!validatedPrompt) return;
      if (typeof prompt !== "string" || !prompt.trim()) {
        return res.status(400).json({ error: "A non-empty prompt is required" });
      }
      if (prompt.length > 4000) {
        return res.status(413).json({ error: "Prompt is too long. Please keep it under 4,000 characters." });
      }
      if (
        conversationHistory !== undefined &&
        (!Array.isArray(conversationHistory) ||
          conversationHistory.length > 12 ||
          conversationHistory.some((message: any) =>
            !message ||
            typeof message !== "object" ||
            !["user", "model"].includes(message.role) ||
            typeof message.text !== "string" ||
            message.text.length > 3000
          ))
      ) {
        return res.status(400).json({ error: "Conversation history is invalid or too large." });
      }
      const safeHistory = Array.isArray(conversationHistory) ? conversationHistory : [];
      for (const message of safeHistory) {
        if (typeof message.text !== "string" || !validateExternalAcademicText(message.text, 3000, res, "Conversation message")) {
          return;
        }
      }
      const historyCharacters = safeHistory.reduce((total: number, message: any) => total + message.text.length, 0);
      if (historyCharacters > 12000) {
        return res.status(413).json({ error: "Conversation history is too long. Start a new study conversation." });
      }

      // Check if the prompt matches an academic reference page.
      const matchedContent = getInstantResponseForKeyword(prompt);
      if (matchedContent.length > 0) {
        let text = `### 📚 Study references matching your topic:\nThese are Curiva learning pages related to the words in your prompt. A page match is not a clinical assessment or verification of treatment effectiveness.\n\n`;
        matchedContent.forEach(item => {
          text += `- **[${item.title}](${item.path})** (${item.category})\n  *${item.description}*\n\n`;
        });
        text += `\nFor education only: do not use these pages or an AI response to diagnose, choose a remedy, set a dose, delay medical assessment, or change prescribed treatment. Consult a qualified registered medical practitioner for personal health decisions.`;
        return res.json({ text });
      }

      const curivaCareSystemInstruction = `
        You are Curiva's AI Homoeopathy Study Assistant. You are an educational language model, not a clinician, homeopath, practitioner, or member of a clinical advisory team.
        You help students and readers understand homoeopathic history, terminology, repertory concepts, and educational materials. You do not provide patient care.

        CRITICAL RESPONSE INSTRUCTIONS:
        0. SAFETY AND SCOPE: Never diagnose, assess an individual's symptoms, select a remedy for a person, or recommend a potency, dose, schedule, or treatment plan. Do not tell anyone to stop, change, or delay prescribed medicines, tests, emergency care, or evidence-based treatment. Explain that traditional homoeopathic concepts are historical/traditional frameworks and do not imply proven clinical effectiveness. State uncertainty clearly. Do not request or repeat identifiable patient information. For personal health decisions, direct users to a qualified registered medical practitioner; for an emergency, advise contacting local emergency services immediately.
        1. BE PERFECT & BRIEF: Always keep your responses very short, concise, and focused. Limit your primary response to a maximum of 100-120 words (1-2 small paragraphs or a few key bullet points).
        2. DEPTH RESTRICTION: Only provide long paragraphs, detailed essays, or exhaustive texts if the user explicitly asks for "long text", "long explanation", "detailed report", or similar keywords.
        3. ACADEMIC REFERENCES: When useful, include one or two links to relevant study or reference pages from the authorized index below. Do not present condition pages or remedy profiles as medical recommendations.

        AUTHORIZED CONTENT SITE MAP & INDEX:
        - Constitutional Remedy Profiles:
          * Lycopodium Clavatum (lack of confidence, warm sweets): '/read/lycopodium-profile'
          * Pulsatilla Nigricans (changeable symptoms, mild, weeping): '/read/pulsatilla-profile'
          * Arsenicum Album (high anxiety, restlessness, chilly): '/read/arsenicum-profile'
          * Gelsemium Sempervirens (dullness, dizziness, drowsiness): '/read/gelsemium-profile'
          * Aconitum Napellus (sudden acute panic and fears): '/read/aconite-profile'
          * Belladonna (sudden heat, fever, redness): '/read/belladonna-profile'
          * Bryonia Alba (dryness, pain worse with any motion): '/read/bryonia-profile'
          * Ignatia Amara (grief, silent sorrow, emotional contradictions): '/read/ignatia-profile'
          * Sulphur (intellectual, ragged philosopher, hot feet): '/read/sulphur-profile'
          * Nux Vomica (digestive issues, sedentary, oversensitive): '/read/nux-vomica-profile'
          * Rhus Toxicodendron (restlessness, joints stiff but better moving): '/read/rhus-tox' or '/read/rhus-tox-profile'
          * Natrum Muriaticum (suppressed deep sorrow, craves salt): '/read/natrum-muriaticum' or '/read/nat-mur-profile'
          * Sepia Officinalis (indifference to loved ones, bearing down pain): '/read/sepia'
        - Condition education pages (academic background only):
          * Hair Loss, Alopecia & Thinning: '/read/hair-loss-homeopathy'
          * Anxiety & Mental Strain: '/read/anxiety-homeopathy-deep'
          * Depression & Chronic Low Mood: '/read/depression-homeopathy'
          * Eczema & Chronic Dermatitis: '/read/eczema-homeopathy'
          * Asthma, Bronchial Spasms: '/read/asthma-homeopathy'
          * Migraines & Periodic Headaches: '/read/migraine-homeopathy'
          * Insomnia & High Sleep Disturbances: '/read/insomnia-homeopathy'
          * Gastritis, Acid Reflux & Bloating: '/read/gastritis-homeopathy'
          * Psoriasis & Scalp Plaques: '/read/psoriasis-homeopathy'
        - Academy Studies & Study Tools:
          * Organon & Core Hahnemannian Philosophy: '/lexicon/philosophy' or '/organon-philosophy'
          * Treatments Lounge & Case Management: '/lexicon/clinical'
          * Live Interactive MCQ Board Practice: '/mcq-practice'
          * Complete BHMS Career paths & scope: '/read/bhms-career'
          * First Year Anatomy Guidelines: '/read/bhms-anatomy'
          * First Year Physiology Guidelines: '/read/bhms-physiology'
          * Scientific Evidence & High-Dilution Research: '/read/research-homeopathy-evidence'
          * Free Symptom-to-Rubric Checker: '/symptom-checker'

        For example, if someone asks about Gelsemium, keep the explanation clear, mention it is detailed in Gelsemium Sempervirens and insert '/read/gelsemium-profile' inside a beautiful link format. Always prioritize accuracy, and stay within the word limit!
      `;

      const ai = getGeminiClient();
      
      const contents: any[] = [];
      if (safeHistory.length > 0) {
        safeHistory.forEach((msg: any) => {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: prompt }]
      });

      const response = await safeGenerateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: curivaCareSystemInstruction
        },
        fallback: `The AI study assistant is temporarily unavailable. Please retry later, or use the site's Materia Medica and Organon pages as academic references. Do not use a fallback message or study page for diagnosis or treatment decisions.`
      });

      const rawText = response?.text || "";
      const textWithLinks = rawText ? appendReferenceLinks(rawText, prompt) : "No response received from the study assistant.";
      res.json({ text: textWithLinks });
    } catch (error: any) {
      console.error("Gemini Curiva Care proxy failed:", error?.name || "ProviderError");
      res.status(500).json({ error: "Unable to process the study question right now. Please try again later." });
    }
  });

  app.post("/api/gemini/hair-loss-coach", aiApiRateLimiter, (_req, res) => {
    return res.status(410).json({
      error: "Personalized hair-health AI coaching is disabled to protect personal health information.",
      message: "Use the public educational chapters and consult a qualified registered medical practitioner or dermatologist for personal concerns."
    });
  });

  app.post("/api/gemini/search", aiApiRateLimiter, async (req, res) => {
    try {
      const body = req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body : {};
      const { query } = body;
      if (typeof query !== "string" || !query.trim()) {
        return res.status(400).json({ error: "A non-empty search query is required" });
      }
      if (query.length > 500) {
        return res.status(413).json({ error: "Search query is too long. Please keep it under 500 characters." });
      }
      if (!validateExternalAcademicText(query, 500, res, "Search query")) return;

      const q = query.toLowerCase().trim();
      const localResults: any[] = [];

      // 1. Check keyword catalog first
      const matchedContent = getInstantResponseForKeyword(q);
      matchedContent.forEach(item => {
        localResults.push({
          title: item.title,
          type: item.category.toLowerCase().includes("profile") || item.category.toLowerCase().includes("remedy") ? "remedy" : "article",
          link: item.path,
          reason: `Related ${item.category} study resource matching "${query}".`
        });
      });

      // 2. Check enhancedRemedies
      enhancedRemedies.forEach(rem => {
        if (rem.name.toLowerCase().includes(q) || rem.latinName?.toLowerCase().includes(q) || rem.description.toLowerCase().includes(q)) {
          if (!localResults.some(r => r.link === `/remedy/${rem.id}`)) {
            localResults.push({
              title: rem.name,
              type: "remedy",
              link: `/remedy/${rem.id}`,
              reason: `Materia Medica profile for ${rem.name}: ${rem.origin}`
            });
          }
        }
      });

      // 3. Check conditionsData
      conditionsData.forEach(cond => {
        if (cond.title.toLowerCase().includes(q) || cond.description.toLowerCase().includes(q)) {
          if (!localResults.some(r => r.link === `/conditions/${cond.id}`)) {
            localResults.push({
              title: cond.title,
              type: "ailment",
              link: `/conditions/${cond.id}`,
              reason: `Related condition-education page for ${cond.title}: ${cond.excerpt}`
            });
          }
        }
      });

      // 4. Check allBlogPosts (postsDb)
      postsDb.forEach(post => {
        if (post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)) {
          if (!localResults.some(r => r.link === `/read/${post.slug}`)) {
            localResults.push({
              title: post.title,
              type: "article",
              link: `/read/${post.slug}`,
              reason: `Related learning article: ${post.excerpt}`
            });
          }
        }
      });

      // Search remains inside the Curiva public catalogue. No unmatched query
      // is sent to Gemini or another third-party search provider.
      return res.json(localResults.slice(0, 5));

    } catch (error: any) {
      console.error("Gemini local catalogue search failed:", error?.name || "SearchError");
      res.status(500).json({ error: "Unable to search the Curiva catalogue right now. Please try again later." });
    }
  });

  app.post("/api/gemini/analyze-symptoms", aiApiRateLimiter, async (_req, res) => {
    return res.status(410).json({
      error: "Symptom-to-remedy analysis is disabled pending an educational redesign.",
      message: "This endpoint must not be used for diagnosis, individualized remedy selection, potency, dosing, or treatment advice."
    });
  });

  app.post("/api/gemini/case-simulation", aiApiRateLimiter, async (req, res) => {
    try {
      const { messages, targetRemedy } = req.body;
      if (typeof targetRemedy !== "string" || !validateExternalAcademicText(targetRemedy, 120, res, "Study exercise label") ||
          !Array.isArray(messages) || messages.length > 30) {
        return res.status(400).json({ error: "A valid fictional study simulation is required." });
      }
      for (const message of messages) {
        if (!message || typeof message !== "object" || typeof message.content !== "string" ||
            !validateExternalAcademicText(message.content, 1500, res, "Simulation message")) {
          return;
        }
      }

      // Local fictional simulator only. User-entered text is validated and is
      // not forwarded to any external model or stored by this route.
      const userMessages = messages || [];
      const latestMsg = userMessages.length > 0 ? userMessages[userMessages.length - 1] : { role: "user", content: "" };
      const userMessageText = latestMsg.content || "";
      
      const rem = enhancedRemedies.find(r => r.name.toLowerCase().includes(targetRemedy.toLowerCase()) || targetRemedy.toLowerCase().includes(r.name.toLowerCase()));
      const defaultResponse = `Hello Doctor. I've been feeling quite sick lately and hope you can help. I am suffering from some health issues. Please ask me about my symptoms, modalities, thermal states, or mental characteristics.`;
      
      if (!rem) {
        return res.json({ text: defaultResponse });
      }

      let responseText = "";
      const msg = userMessageText.toLowerCase().trim();

      if (userMessages.length <= 1) {
        responseText = `Hello Doctor. Thank you for seeing me. I've been feeling quite sick lately and hope you can help. I am suffering from ${rem.description.split(',')[0].toLowerCase() || "some health issues"}.`;
      } else if (msg.includes("hello") || msg.includes("hi ") || msg.includes("greet")) {
        responseText = `Hello Doctor. What would you like to know about my condition?`;
      } else if (msg.includes("better") || msg.includes("worse") || msg.includes("modality") || msg.includes("makes you feel") || msg.includes("aggravat") || msg.includes("ameliorat")) {
        const better = rem.modalities.better.length > 0 ? `I feel better when: ${rem.modalities.better.join(", ")}.` : "";
        const worse = rem.modalities.worse.length > 0 ? `I feel worse when: ${rem.modalities.worse.join(", ")}.` : "";
        responseText = `Well doctor, ${worse} ${better} That's how it seems to change.`;
      } else if (msg.includes("mind") || msg.includes("mental") || msg.includes("fear") || msg.includes("anxious") || msg.includes("temperament") || msg.includes("emotion") || msg.includes("feeling")) {
        if (rem.mind && rem.mind.length > 0) {
          responseText = `Mentally, I feel: ${rem.mind.join(", ")}. It has been affecting my mood quite a bit.`;
        } else {
          responseText = `I feel quite anxious and uneasy about my health state, doctor.`;
        }
      } else if (msg.includes("thirst") || msg.includes("drink") || msg.includes("water") || msg.includes("thirsty")) {
        responseText = `Regarding thirst, ${rem.thirst}.`;
      } else if (msg.includes("physical") || msg.includes("body") || msg.includes("other symptom") || msg.includes("pain") || msg.includes("feel like")) {
        if (rem.physical && rem.physical.length > 0) {
          responseText = `Physically, I experience: ${rem.physical.join(", ")}.`;
        } else {
          responseText = `I have: ${rem.keyCharacteristics.slice(0, 2).join(", ")}.`;
        }
      } else if (msg.includes("thermal") || msg.includes("hot") || msg.includes("chilly") || msg.includes("weather") || msg.includes("temperature")) {
        responseText = `I would say I am generally a ${rem.thermal.toLowerCase()} person. I react strongly to temperature changes.`;
      } else if (msg.includes("characteristic") || msg.includes("keynote") || msg.includes("describe") || msg.includes("symptom") || msg.includes("happen")) {
        responseText = `The main things I notice are: ${rem.keyCharacteristics.join(". ")}.`;
      } else if (msg.includes("origin") || msg.includes("source") || msg.includes("made of") || msg.includes("prepare")) {
        responseText = `I believe this remedy is associated with ${rem.origin}.`;
      } else if (msg.includes("prescription") || msg.includes("give you") || msg.includes("prescribe") || msg.includes("remedy is") || msg.includes("take some") || msg.includes("take ") || msg.includes("suggest")) {
        responseText = `Thank you Doctor. Please submit your official prescription in the assessment box below to evaluate if it's the perfect match for my state!`;
      } else {
        const details = [
          `My main complaints are: ${rem.keyCharacteristics[0] || rem.description}.`,
          `Regarding temperature, I am definitely ${rem.thermal.toLowerCase()}.`,
          `I really notice that ${rem.modalities.worse[0] ? "I am much worse from " + rem.modalities.worse[0] : "my symptoms are quite specific"}.`,
          `I can tell you that ${rem.thirst}.`,
          `I am hoping you can find the right remedy. Ask me about my modalities, physical complaints, or mental state to be sure.`
        ];
        const index = userMessages.length % details.length;
        responseText = details[index];
      }

      return res.json({ text: responseText });
    } catch (error: any) {
      console.error("Local case simulation failed:", error?.name || "SimulationError");
      res.status(500).json({ error: "The study simulation could not be completed. Please try again." });
    }
  });

  app.post("/api/gemini/simulation-feedback", aiApiRateLimiter, async (req, res) => {
    try {
      const { targetRemedy, userPrescription, sessionSummary } = req.body;
      if (typeof targetRemedy !== "string" || targetRemedy.length > 120 ||
          !validateExternalAcademicText(userPrescription, 500, res, "Study answer") ||
          (typeof sessionSummary === "string" && sessionSummary.trim().length > 0 &&
            !validateExternalAcademicText(sessionSummary, 3000, res, "Session summary"))) {
        return;
      }

      // Local fictional-exercise evaluator only; never use it for real prescriptions.
      const targetLower = targetRemedy.toLowerCase().trim();
      const userPrescLower = userPrescription.toLowerCase().trim();
      
      const isPerfectMatch = userPrescLower.includes(targetLower) || targetLower.includes(userPrescLower);
      const rem = enhancedRemedies.find(r => r.name.toLowerCase().includes(targetLower) || targetLower.includes(r.name.toLowerCase()));
      
      const score = isPerfectMatch ? 95 : (userPrescLower.length > 3 ? 40 : 10);
      const strengths = isPerfectMatch 
        ? ["Matched the exercise's preselected target profile by name.", "Recognized terminology used in the fictional study case."] 
        : ["The proposed answer did not match the exercise's preselected profile."];
      const weaknesses = isPerfectMatch 
        ? ["Could explore deeper miasmatic background or potency selection details."] 
        : [`Did not identify the correct target remedy (${targetRemedy}).`, `Missed the key modalities and characteristic symptoms representing this constitutional profile.`];
      const lesson = rem 
        ? `In this fictional exercise, the target profile ${rem.name} is described with these traditional materia medica features: ${rem.keyCharacteristics.slice(0, 2).join(", ")}. These notes are historical study content, not treatment guidance.` 
        : `Make sure to carefully study the keynotes, thermal states, and modalities before final repertorization.`;

      return res.json({ score, strengths, weaknesses, lesson });
    } catch (error: any) {
      console.error("Local study feedback failed:", error?.name || "SimulationError");
      res.status(500).json({ error: "The study feedback could not be completed. Please try again." });
    }
  });

  app.post("/api/gemini/professional-tool", aiApiRateLimiter, async (_req, res) => {
    return res.status(410).json({
      error: "The professional clinical-decision tool is disabled pending an educational redesign.",
      message: "This endpoint must not be used for diagnosis, individualized remedy selection, potency, dosing, or treatment advice."
    });
  });

  app.post("/api/gemini/generate-ebook", aiApiRateLimiter, (_req, res) => {
    return res.status(410).json({
      error: "Public health eBook generation from arbitrary prompts is disabled.",
      message: "Health content must pass the Curiva editorial, source, licensing and qualified review workflow before publication."
    });
  });

  app.post("/api/custom-search", aiApiRateLimiter, (_req, res) => {
    return res.status(410).json({
      error: "External research search is temporarily disabled.",
      message: "Use the cited public-health sources and verified repository links. Queries are not forwarded to a third-party search provider."
    });
  });

  // Personalization is deterministic and local-data-minimal. Do not inspect
  // open-tab URLs, page titles, profile objects or free-text prompts, and do
  // not forward user context to Gemini or any other third party.
  app.post("/api/personalize", aiApiRateLimiter, (req, res) => {
    const requestedRole = req.body && typeof req.body.role === "string"
      ? req.body.role.trim().toLowerCase().slice(0, 40)
      : "student";
    const role = (["student", "intern", "practitioner", "public"].includes(requestedRole)
      ? requestedRole
      : "student") as "student" | "intern" | "practitioner" | "public";

    const config = {
      student: {
        tone: "academic",
        nav: [
          { name: "BHMS Course Syllabus", to: "/cbdc-syllabus", icon: "GraduationCap", desc: "NCH competencies and curriculum" },
          { name: "Anatomy Core", to: "/anatomy", icon: "Activity", desc: "Anatomy library and notes" },
          { name: "Physiology Core", to: "/physiology", icon: "Activity", desc: "Physiology and biochemistry" },
          { name: "MCQ Practice", to: "/mcq-practice", icon: "Sparkles", desc: "Academic revision questions" }
        ],
        modules: [
          { id: "syllabus", title: "BHMS Course Syllabus", cta: "Explore curriculum", link: "/cbdc-syllabus", desc: "Review year-wise competencies and learning outcomes." }
        ],
        searchDefaults: ["Anatomy study guides", "Organon aphorisms", "Physiology revision"],
        recommendations: [{ title: "MCQ Practice Board", link: "/mcq-practice", snippet: "Practise academic questions and review explanations." }]
      },
      intern: {
        tone: "academic",
        nav: [
          { name: "Materia Medica", to: "/materia-medica", icon: "BookOpen", desc: "Reference profiles for study" },
          { name: "Clinical Guides", to: "/clinical-guides", icon: "BookMarked", desc: "General educational reading" },
          { name: "MCQ Practice", to: "/mcq-practice", icon: "Sparkles", desc: "Academic revision questions" }
        ],
        modules: [
          { id: "clinical-guides", title: "Clinical Education Library", cta: "Open guides", link: "/clinical-guides", desc: "General educational information; not a patient assessment or clinical decision tool." }
        ],
        searchDefaults: ["Materia Medica terminology", "Clinical examination principles", "Medical terminology"],
        recommendations: [{ title: "Materia Medica", link: "/materia-medica", snippet: "Review historical and academic reference descriptions." }]
      },
      practitioner: {
        tone: "academic",
        nav: [
          { name: "Materia Medica", to: "/materia-medica", icon: "BookOpen", desc: "Academic reference library" },
          { name: "Remedy Comparison", to: "/analysis", icon: "GitCompare", desc: "Educational comparison" },
          { name: "Public Health Education", to: "/public-education", icon: "Globe", desc: "Evidence and safety literacy" }
        ],
        modules: [
          { id: "comparative", title: "Comparative Study", cta: "Open comparison", link: "/analysis", desc: "Compare historical materia medica descriptions for academic study only." }
        ],
        searchDefaults: ["Materia Medica comparisons", "Historical repertory terminology", "Evidence appraisal"],
        recommendations: [{ title: "Public Health Education", link: "/public-education", snippet: "Review plain-language health education and evidence notes." }]
      },
      public: {
        tone: "simple",
        nav: [
          { name: "Public Health Education", to: "/public-education", icon: "Globe", desc: "Plain-language health education" },
          { name: "Health eBooks", to: "/ebooks", icon: "BookMarked", desc: "Read public health guides" },
          { name: "About Curiva", to: "/about", icon: "Info", desc: "About this educational project" }
        ],
        modules: [
          { id: "ebooks", title: "Public Health eBooks", cta: "Read eBooks", link: "/ebooks", desc: "Read general health information and know when to seek professional care." }
        ],
        searchDefaults: ["Understanding common health conditions", "When to seek medical help", "Evaluating health information"],
        recommendations: [{ title: "Public Health Education", link: "/public-education", snippet: "Explore evidence-aware health education in accessible language." }]
      }
    }[role];

    res.setHeader("Cache-Control", "private, no-store, max-age=0");
    return res.json({
      role,
      tone: config.tone,
      nav: config.nav,
      modules: config.modules,
      searchDefaults: config.searchDefaults,
      recommendations: config.recommendations,
      sourceTabs: []
    });
  });

  // API Routes
  app.get("/api/posts", (req, res) => {
    const { category, search, tag, startDate, endDate } = req.query;
    let filtered = [...postsDb];

    if (category && category !== "All") {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (search) {
      const searchStr = (search as string).toLowerCase();
      filtered = filtered.filter(p => 
        (p.title && p.title.toLowerCase().includes(searchStr)) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(searchStr)) ||
        (p.content && p.content.toLowerCase().includes(searchStr))
      );
    }

    if (tag) {
      const tagStr = (tag as string).toLowerCase();
      filtered = filtered.filter(p => 
        p.tags && p.tags.some((t: string) => t.toLowerCase() === tagStr)
      );
    }

    if (startDate) {
      filtered = filtered.filter(p => new Date(p.date) >= new Date(startDate as string));
    }

    if (endDate) {
      filtered = filtered.filter(p => new Date(p.date) <= new Date(endDate as string));
    }

    res.json(filtered);
  });

  app.get("/api/posts/slug/:slug", (req, res) => {
    try {
      const slugParam = req.params.slug;
      console.log(`[API] Fetching post by slug: ${slugParam}`);
      let post = postsDb.find(p => p.slug === slugParam);
      
      // Fallback to checking by ID if slug doesn't match
      if (!post) {
        post = postsDb.find(p => p.id === slugParam);
      }

      if (post) {
        res.json(post);
      } else {
        console.warn(`[API] Post not found for slug or id: ${slugParam}`);
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      console.error("[API] Public article lookup failed:", error?.name || "StorageError");
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.get("/api/posts/:id", (req, res) => {
    try {
      const post = postsDb.find(p => p.id === req.params.id);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  // Vite middleware for development
  if (!isServerlessRuntime && process.env.NODE_ENV !== "production") {
    // Load Vite only in the local development server. Keeping it out of the
    // static import graph prevents Netlify's function bundler from tracing
    // Vite's native CSS transformer dependencies into the serverless API.
    const vitePackage = "vite";
    const { createServer: createViteServer } = await import(vitePackage);
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!isServerlessRuntime) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

  return app;
}

// Reuse the exact same API routes in the standalone server and Netlify Function adapter.
export const appPromise = startServer();
