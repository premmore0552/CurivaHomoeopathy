import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Database, ExternalLink, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-bg-primary pb-20 pt-24 transition-colors">
      <SEO
        title="Privacy & Data Protection | Curiva Homoeopathy"
        description="How Curiva currently handles account, study, appointment, payment and optional AI data, and the limits of the current controls."
      />
      <motion.main initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
            <ShieldCheck className="h-4 w-4" /> Privacy and data protection
          </div>
          <h1 className="font-serif text-4xl font-bold text-primary md:text-5xl">Privacy Policy</h1>
          <p className="text-xs italic text-text-tertiary">Reviewed: 7 November 2026</p>
          <p className="text-base leading-8 text-text-secondary">
            This notice describes the data flows currently implemented in Curiva's website and learning app. It is not a promise that every historical record has already been erased, nor a legal compliance certification. The platform is an educational service, not an approved electronic patient-record or telemedicine system.
          </p>
        </header>

        <section className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
          <h2 className="flex items-center gap-2 font-bold text-text-primary"><AlertTriangle className="h-5 w-5 text-amber-600" /> Important health-information boundary</h2>
          <p className="mt-2 text-sm leading-7 text-text-secondary">
            Do not enter patient names, phone numbers, addresses, identity numbers, medical-record numbers, photographs, diagnoses, lab reports, prescriptions, clinical case histories, or other identifiable or sensitive health information into study notes, AI tools, feedback, social messages, profile fields, or general website forms. Curiva's study and education tools are not designed or approved for storing patient records.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-text-primary">1. Information and where it is stored</h2>
          <ul className="list-disc space-y-3 pl-6 text-sm leading-7 text-text-secondary">
            <li><strong>Account profile:</strong> When you sign in, the website may create a Firebase Authentication account and a Firestore profile containing your account UID, email, display name, profile image URL, learner/professional category, and optional short profile fields. The profile is intended for basic account and learning preferences, not medical records.</li>
            <li><strong>Native learning progress:</strong> The Android learning app stores lesson completion, quiz progress and other study markers locally on the device. The separate website/native account progress feature may sync a limited study-progress document to Firestore for the signed-in account. It is not intended for health or patient information.</li>
            <li><strong>Study Toolkit:</strong> Website tasks, notes, reflections, custom flashcards, study sessions and reading logs are held in browser sessionStorage, separated by account/guest scope. They are not sent to Firestore by the current Study Toolkit provider. The browser tab/session may clear this data. Browser storage is not encrypted by Curiva and should not be used for confidential records.</li>
            <li><strong>Bookmarks and reading history:</strong> Website bookmarks, article history and study performance summaries are held in the current browser session. Public Health eBook bookmarks, completed-chapter markers and last-read positions are stored locally in the browser. Clearing site data or ending the relevant session may remove some or all of this data. These features are not synced to the Curiva server by the current reader/service.</li>
            <li><strong>Appointment requests:</strong> If you submit an appointment request, the backend may store the account identifier/email (when available), name, optional phone number, service category, requested date/time, timezone and request status/administrative response. The appointment form should not be used to submit symptoms, diagnoses, reports or clinical histories.</li>
            <li><strong>Purchases:</strong> For paid resources, Curiva's server stores order/payment identifiers, user ID or guest marker, resource, amount, currency, contact email and fulfilment status. Razorpay processes payment details. Curiva does not receive or store the full card number, CVV or banking password through this website.</li>
            <li><strong>Security and operational logs:</strong> Hosting, Firebase, payment and email providers may process technical information such as IP address, device/browser metadata, request timestamps, error details and fraud/security signals under their own terms. Do not assume that every infrastructure log is under Curiva's direct control.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-text-primary">2. AI features and external processing</h2>
          <p className="text-sm leading-7 text-text-secondary">
            Some academic AI features remain available only after an explicit, tab-scoped acknowledgement. When you submit an academic prompt or recent chat context, the text is sent to Curiva's server and then to Google Gemini to generate a response. The acknowledgement lasts for the current browser tab/session. Google processes submitted content under its own terms and policies. Do not submit personal, clinical, identifying or patient information even if the interface accepts it.
          </p>
          <p className="text-sm leading-7 text-text-secondary">
            Curiva applies conservative pattern checks for common identifiers and health narratives before sending supported AI prompts. These checks are best-effort only; they cannot reliably identify or remove every sensitive detail. Passing a check does not make text anonymous or safe to share.
          </p>
          <p className="text-sm leading-7 text-text-secondary">
            Personalized hair-health AI coaching, symptom-to-remedy analysis, patient-case analysis modes, arbitrary AI eBook generation, and external query-based research search are disabled in the current build. The personalization engine now uses a predefined role configuration and does not send profile information, search terms, open-tab titles or URLs to Gemini.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-text-primary">3. Contact, feedback, analytics and cookies</h2>
          <p className="text-sm leading-7 text-text-secondary">
            The current website does not operate a newsletter subscription form or online feedback submission service. The contact page provides public social links only; those third-party platforms have their own privacy terms. Curiva's in-app analytics helper is disabled and does not log or forward event properties. This does not rule out technical logs created by the hosting, authentication, payment, security or content-delivery providers.
          </p>
          <p className="text-sm leading-7 text-text-secondary">
            Non-essential analytics/advertising cookies are not activated by the current application code. Firebase Authentication and browser storage may use necessary local storage mechanisms for sign-in, security and user-selected learning features. Browser settings can be used to clear local site data, but doing so may sign you out or remove device-local learning progress.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-text-primary">4. Service providers</h2>
          <p className="text-sm leading-7 text-text-secondary">
            The current architecture uses Firebase Authentication/Firestore for account and selected learning/appointment data; Razorpay for payments; Google Gemini for explicitly acknowledged academic AI requests; Resend or another configured provider for transactional email; and Netlify/hosting and content-delivery services for delivery, functions and operational logs. Provider availability/configuration may differ by environment. Each provider processes information under its own contractual terms and privacy documentation.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-sm leading-7 text-text-secondary">
            <li><a className="font-semibold text-primary underline" href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase privacy and security information</a></li>
            <li><a className="font-semibold text-primary underline" href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer">Razorpay privacy policy</a></li>
            <li><a className="font-semibold text-primary underline" href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer">Google Gemini API terms</a></li>
            <li><a className="font-semibold text-primary underline" href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Netlify privacy policy</a></li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-text-primary">5. Security controls and limitations</h2>
          <p className="text-sm leading-7 text-text-secondary">
            Current controls include owner-scoped Firestore rules for account records, client-side denial of legacy case-log/screening/free-text cloud collections, privileged-only administrator membership changes, rate limits on selected API endpoints, private paid-resource downloads, HTTPS and standard security headers, and a service worker restricted to public static assets. API responses are configured as private/no-store. These measures reduce risk but do not guarantee that a breach, misconfiguration, malicious browser extension, compromised device, or third-party incident is impossible.
          </p>
          <p className="text-sm leading-7 text-text-secondary">
            Legacy records may still exist in Firestore from earlier application versions. Client access to the legacy case-log, screening and Study Toolkit collections is denied in the current rules, but a read-only inventory and an approved retention/deletion process are still required before we can say that historical data has been deleted.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-text-primary">6. Retention, access and deletion</h2>
          <p className="text-sm leading-7 text-text-secondary">
            Account, appointment, payment and security records may be retained for service operation, fraud prevention, dispute handling, financial/legal obligations and security investigations. A complete, published retention schedule and self-service account-deletion workflow are not yet available in the current application. Do not assume that deleting local browser data deletes server-side account, appointment or payment records.
          </p>
          <p className="text-sm leading-7 text-text-secondary">
            Before production use, Curiva must publish a verified privacy contact and implement a documented process to receive, authenticate, track and fulfil applicable access, correction, deletion and grievance requests, including exceptions for records that must be retained by law. This page does not invent a privacy email address or promise a deletion timeline that has not been implemented.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-text-primary">7. Children and sensitive information</h2>
          <p className="text-sm leading-7 text-text-secondary">
            The platform is not designed to collect children's health information or to provide child-specific clinical advice. Do not submit a child's identifying information, health records or photographs. A future feature that processes children's data or sensitive health information requires separate legal, product and security review before activation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-text-primary">8. India privacy-law review</h2>
          <p className="text-sm leading-7 text-text-secondary">
            Curiva should be reviewed by qualified India-focused privacy counsel against the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025, including applicable phased commencement dates, notices, consent, children's data, security safeguards, grievance handling, processor contracts and cross-border processing. This policy is a technical data-flow summary, not legal advice or a statement that Curiva has been certified as compliant.
          </p>
          <p className="text-sm leading-7 text-text-secondary">
            Official references: <a className="font-semibold text-primary underline" href="https://www.meity.gov.in/" target="_blank" rel="noopener noreferrer">MeitY</a> and the <a className="font-semibold text-primary underline" href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014&lang=2&reg=3" target="_blank" rel="noopener noreferrer">Government announcement on the 2025 Rules</a>.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-bg-secondary p-5">
          <h2 className="flex items-center gap-2 font-bold text-text-primary"><Database className="h-5 w-5 text-primary" /> Privacy and security status</h2>
          <p className="mt-2 text-sm leading-7 text-text-secondary">
            We are progressively hardening account, study, appointment, AI, storage and content systems. The current source-code protections are not a substitute for a professional penetration test, Firebase/hosting configuration audit, processor-contract review or medical-content governance review.
          </p>
          <Link to="/medical-disclaimer" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary underline underline-offset-4">Read the Medical Disclaimer <ExternalLink className="h-4 w-4" /></Link>
        </section>
      </motion.main>
    </div>
  );
}
