import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CalendarDays, CheckCircle2, LockKeyhole, RefreshCw, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import {
  auth,
  collection,
  db,
  onAuthStateChanged,
  onSnapshot,
  orderBy,
  query,
} from '../lib/firebase';

type RequestStatus = 'requested' | 'confirmed' | 'declined' | 'cancelled';

type AppointmentRequest = {
  id: string;
  userId: string;
  userEmail: string | null;
  displayName: string;
  phoneNumber: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  status: RequestStatus;
  adminResponse?: string;
  confirmedDateTime?: string;
  confirmedTimeZone?: string;
  calendarEventId?: string;
};

function getLocalDateTimeString() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

const statusOptions: { value: RequestStatus; label: string }[] = [
  { value: 'requested', label: 'Awaiting review' },
  { value: 'confirmed', label: 'Confirmed by clinic' },
  { value: 'declined', label: 'Unable to accommodate' },
  { value: 'cancelled', label: 'Cancelled' },
];

const serviceLabels: Record<string, string> = {
  'initial-consultation': 'Initial consultation request',
  'follow-up': 'Follow-up request',
  'general-consultation': 'General consultation enquiry',
};

export default function AdminAppointments() {
  const [userId, setUserId] = useState<string | null>(auth.currentUser?.uid ?? null);
  const [authReady, setAuthReady] = useState(false);
  const [requests, setRequests] = useState<AppointmentRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [statusDrafts, setStatusDrafts] = useState<Record<string, RequestStatus>>({});
  const [responseDrafts, setResponseDrafts] = useState<Record<string, string>>({});
  const [confirmedDateTimeDrafts, setConfirmedDateTimeDrafts] = useState<Record<string, string>>({});
  const [calendarConfigured, setCalendarConfigured] = useState(false);
  const [clinicTimezone, setClinicTimezone] = useState('');
  const [notificationsConfigured, setNotificationsConfigured] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/appointments/config')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('config unavailable')))
      .then((config) => {
        if (!active) return;
        setCalendarConfigured(Boolean(config.calendarConfigured));
        setClinicTimezone(typeof config.clinicTimezone === 'string' ? config.clinicTimezone : '');
        setNotificationsConfigured(Boolean(config.notificationsConfigured));
      })
      .catch(() => {
        if (!active) return;
        setCalendarConfigured(false);
        setNotificationsConfigured(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserId(currentUser?.uid ?? null);
      setAuthReady(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!userId) {
      setRequests([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const requestsQuery = query(
      collection(db, 'appointmentRequests'),
      orderBy('createdAt', 'desc'),
    );
    const unsubscribe = onSnapshot(
      requestsQuery,
      (snapshot) => {
        const rows: AppointmentRequest[] = [];
        snapshot.forEach((docRef: any) => {
          rows.push({ id: docRef.id, ...docRef.data() } as AppointmentRequest);
        });
        setRequests(rows);
        setLoading(false);
        setPermissionError(false);
        setLoadError('');
      },
      (error: any) => {
        setLoading(false);
        setPermissionError(error?.code === 'permission-denied');
        setLoadError(
          error?.code === 'permission-denied'
            ? 'Your account is not authorized to review appointment requests. Firestore rules allow access only to designated administrators.'
            : 'Appointment requests could not be loaded. Verify the Firestore configuration and rules.',
        );
      },
    );

    return unsubscribe;
  }, [userId]);

  async function saveReview(request: AppointmentRequest) {
    setSavingId(request.id);
    setSuccess('');
    setLoadError('');
    const status = statusDrafts[request.id] ?? request.status;
    const adminResponse = (responseDrafts[request.id] ?? request.adminResponse ?? '').trim().slice(0, 500);

    try {
      if (status === 'confirmed' && !(confirmedDateTimeDrafts[request.id] ?? request.confirmedDateTime)) {
        setLoadError('Enter the actual clinic date and time before confirming.');
        return;
      }
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) throw new Error('Your session has expired. Sign in again.');
      const response = await fetch('/api/appointments/admin-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({
          requestId: request.id,
          status,
          adminResponse,
          confirmedDateTime: confirmedDateTimeDrafts[request.id] ?? request.confirmedDateTime ?? '',
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'The review could not be saved.');
      const emailMessage = result.emailDelivery === 'sent'
        ? ' A status email was accepted by the configured provider.'
        : result.emailDelivery === 'failed'
          ? ' The status changed, but status email failed.'
          : ' Status email delivery is not configured.';
      setSuccess(status === 'confirmed'
        ? `Calendar event created for ${confirmedDateTimeDrafts[request.id] ?? request.confirmedDateTime} (${result.calendarTimezone || clinicTimezone}).${emailMessage}`
        : `Review saved.${emailMessage}`);
    } catch (error: any) {
      setLoadError(error?.message || 'The review could not be saved. Please check the connection and try again.');
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f8f5] py-8 pb-16 text-[#193b35] sm:py-12">
      <SEO title="Appointment Request Review | Curiva Homoeopathy" description="Authorized staff review of consultation requests." />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#4b6d5e] hover:text-[#153d35]">
          <ArrowLeft className="h-4 w-4" /> Back to Curiva
        </Link>

        <section className="rounded-[2rem] bg-[#112f35] p-6 text-white shadow-[0_25px_70px_rgba(17,47,53,0.14)] sm:p-9">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d8f0e1] text-[#21664e]"><ShieldCheck className="h-6 w-6" /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9ed7b7]">Authorized workspace</p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Appointment request review</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#d5e5e0]">Review preferred dates and update request status. Mark a request confirmed only after checking the real clinic calendar and contacting the requester through an approved channel.</p>
            </div>
          </div>
        </section>

        {!calendarConfigured && (
          <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <strong>Calendar confirmation is disabled.</strong> Configure the clinic Google Calendar ID, clinic time zone, allowlisted administrator UIDs, and service-account calendar access before confirming requests. Requests remain unconfirmed until then.
          </div>
        )}
        {calendarConfigured && !notificationsConfigured && (
          <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            Appointment status email notifications are not configured.
          </div>
        )}

        {!authReady ? (
          <div className="mt-6 rounded-2xl border border-[#e0e9e2] bg-white p-6 text-sm text-[#687b72]">Checking authorization…</div>
        ) : !userId ? (
          <section className="mt-6 rounded-3xl border border-[#e0e9e2] bg-white p-6">
            <LockKeyhole className="h-6 w-6 text-[#438064]" />
            <h2 className="mt-3 text-xl font-bold">Sign in required</h2>
            <p className="mt-2 text-sm leading-6 text-[#687b72]">Sign in with an authorized administrator account to review requests. Firestore security rules remain the final access control.</p>
            <Link to="/auth" state={{ from: '/admin/appointments' }} className="mt-4 inline-flex rounded-full bg-[#153d35] px-5 py-3 text-sm font-bold text-white">Sign in</Link>
          </section>
        ) : (
          <section className="mt-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">Requests</h2>
                <p className="mt-1 text-sm text-[#718079]">Contact details are displayed only when your account has permission to read this collection.</p>
              </div>
              <span className="rounded-full border border-[#dce6df] bg-white px-3 py-2 text-xs font-bold text-[#536f61]">{requests.length} total</span>
            </div>

            {success && <p role="status" className="mb-4 rounded-xl border border-[#cfe7d7] bg-[#eff8f1] p-3 text-sm text-[#245b43]"><CheckCircle2 className="mr-2 inline h-4 w-4" />{success}</p>}
            {loadError && <p role="alert" className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">{loadError}</p>}

            {loading ? (
              <div className="rounded-2xl border border-[#e0e9e2] bg-white p-6 text-sm text-[#687b72]">Loading appointment requests…</div>
            ) : permissionError ? (
              <div className="rounded-2xl border border-[#e0e9e2] bg-white p-6">
                <LockKeyhole className="h-6 w-6 text-[#687b72]" />
                <h3 className="mt-3 font-bold">No administrator access</h3>
                <p className="mt-2 text-sm leading-6 text-[#687b72]">Do not broaden collection rules to make this page work. Grant access only through the reviewed administrator policy.</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="rounded-2xl border border-[#e0e9e2] bg-white p-6 text-sm text-[#687b72]">No requests are available.</div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <article key={request.id} className="rounded-3xl border border-[#e0e9e2] bg-white p-5 shadow-[0_8px_30px_rgba(25,59,53,0.035)] sm:p-7">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#e8f5ef] px-3 py-1 text-[11px] font-bold text-[#21664e]">{request.status}</span>
                          <span className="text-xs text-[#7b8982]">ID: {request.id}</span>
                        </div>
                        <h3 className="mt-3 text-lg font-bold">{serviceLabels[request.serviceType] || 'Consultation request'}</h3>
                        <p className="mt-2 text-sm text-[#536f61]"><CalendarDays className="mr-1.5 inline h-4 w-4" />{request.preferredDate} · {request.preferredTime} · {request.timezone}</p>
                        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                          <div><dt className="text-xs font-semibold uppercase tracking-wide text-[#7b8982]">Requester</dt><dd className="mt-1 break-words font-semibold">{request.displayName || 'Name not provided'}</dd></div>
                          <div><dt className="text-xs font-semibold uppercase tracking-wide text-[#7b8982]">Account email</dt><dd className="mt-1 break-words font-semibold">{request.userEmail || 'No email on account'}</dd></div>
                          <div className="sm:col-span-2"><dt className="text-xs font-semibold uppercase tracking-wide text-[#7b8982]">Phone (optional)</dt><dd className="mt-1 break-words font-semibold">{request.phoneNumber || 'Not provided'}</dd></div>
                        </dl>
                      </div>

                      <div className="w-full space-y-4 lg:max-w-sm">
                        <div>
                          <label htmlFor={'status-' + request.id} className="mb-2 block text-sm font-semibold">Request status</label>
                          <select id={'status-' + request.id} value={statusDrafts[request.id] ?? request.status} onChange={(event) => setStatusDrafts((prior) => ({ ...prior, [request.id]: event.target.value as RequestStatus }))} className="w-full rounded-xl border border-[#dce6df] bg-white px-3 py-3 text-sm outline-none focus:border-[#438064]">
                            {statusOptions.map((option) => <option key={option.value} value={option.value} disabled={option.value === 'confirmed' && !calendarConfigured}>{option.label}</option>)}
                          </select>
                        </div>
                        {(statusDrafts[request.id] ?? request.status) === 'confirmed' && (
                          <div>
                            <label htmlFor={'confirmed-time-' + request.id} className="mb-2 block text-sm font-semibold">
                              Actual clinic appointment time{clinicTimezone ? ` (${clinicTimezone})` : ''}
                            </label>
                            <input
                              id={'confirmed-time-' + request.id}
                              type="datetime-local"
                              min={getLocalDateTimeString()}
                              required
                              value={confirmedDateTimeDrafts[request.id] ?? request.confirmedDateTime ?? ''}
                              onChange={(event) => setConfirmedDateTimeDrafts((prior) => ({ ...prior, [request.id]: event.target.value }))}
                              className="w-full rounded-xl border border-[#dce6df] bg-white px-3 py-3 text-sm outline-none focus:border-[#438064]"
                            />
                            <p className="mt-1 text-xs text-[#7b8982]">The server creates the Google Calendar event before saving the confirmed status.</p>
                          </div>
                        )}
                        <div>
                          <label htmlFor={'response-' + request.id} className="mb-2 block text-sm font-semibold">Message for requester (optional)</label>
                          <textarea id={'response-' + request.id} rows={3} maxLength={500} value={responseDrafts[request.id] ?? request.adminResponse ?? ''} onChange={(event) => setResponseDrafts((prior) => ({ ...prior, [request.id]: event.target.value }))} className="w-full resize-y rounded-xl border border-[#dce6df] bg-white px-3 py-3 text-sm outline-none focus:border-[#438064]" placeholder="Do not include clinical details here." />
                        </div>
                        <button type="button" disabled={savingId === request.id} onClick={() => void saveReview(request)} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#153d35] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#205747] disabled:opacity-60">
                          {savingId === request.id ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                          {savingId === request.id ? 'Saving…' : 'Save review'}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        <p className="mt-8 text-xs leading-5 text-[#7b8982]">Do not use request notes or contact fields for medical histories. Confirmed status should reflect a real calendar check and a completed contact step—not an automated assumption.</p>
      </div>
    </div>
  );
}
