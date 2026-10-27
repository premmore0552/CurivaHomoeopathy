import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Info,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import SEO from '../components/SEO';
import {
  addDoc,
  auth,
  collection,
  db,
  doc,
  onAuthStateChanged,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '../lib/firebase';

type ServiceType = 'initial-consultation' | 'follow-up' | 'general-consultation';
type RequestStatus = 'requested' | 'confirmed' | 'declined' | 'cancelled';

type AppointmentRequest = {
  id: string;
  userId: string;
  userEmail: string | null;
  displayName: string;
  phoneNumber: string;
  serviceType: ServiceType;
  preferredDate: string;
  preferredTime: 'morning' | 'afternoon' | 'evening';
  timezone: string;
  status: RequestStatus;
  adminResponse?: string;
  createdAt?: { toMillis?: () => number } | string | null;
};

const serviceOptions: { value: ServiceType; label: string }[] = [
  { value: 'initial-consultation', label: 'Initial consultation request' },
  { value: 'follow-up', label: 'Follow-up request' },
  { value: 'general-consultation', label: 'General consultation enquiry' },
];

const timeOptions = [
  { value: 'morning', label: 'Morning preference' },
  { value: 'afternoon', label: 'Afternoon preference' },
  { value: 'evening', label: 'Evening preference' },
] as const;

function getLocalDateString() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().slice(0, 10);
}

function statusLabel(status: RequestStatus) {
  switch (status) {
    case 'confirmed':
      return 'Confirmed by clinic';
    case 'declined':
      return 'Unable to accommodate';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Awaiting review';
  }
}

function createdAtMillis(value: AppointmentRequest['createdAt']) {
  if (value && typeof value === 'object' && typeof value.toMillis === 'function') {
    return value.toMillis();
  }
  if (typeof value === 'string') return Date.parse(value) || 0;
  return 0;
}

export default function Appointments() {
  const [user, setUser] = useState(auth.currentUser);
  const [authReady, setAuthReady] = useState(false);
  const [requests, setRequests] = useState<AppointmentRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [displayName, setDisplayName] = useState(auth.currentUser?.displayName || '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('initial-consultation');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [understandsRequest, setUnderstandsRequest] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setDisplayName(currentUser?.displayName || '');
      setAuthReady(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setRequests([]);
      setLoadingRequests(false);
      return;
    }

    setLoadingRequests(true);
    const requestsQuery = query(
      collection(db, 'appointmentRequests'),
      where('userId', '==', user.uid),
    );
    const unsubscribe = onSnapshot(
      requestsQuery,
      (snapshot) => {
        const rows: AppointmentRequest[] = [];
        snapshot.forEach((docRef: any) => {
          rows.push({ id: docRef.id, ...docRef.data() } as AppointmentRequest);
        });
        rows.sort((a, b) => createdAtMillis(b.createdAt) - createdAtMillis(a.createdAt));
        setRequests(rows);
        setLoadingRequests(false);
        setError('');
      },
      () => {
        setLoadingRequests(false);
        setError('Appointment requests are not enabled for this Firebase project yet. The administrator must deploy the reviewed Firestore rules before this feature can save or display requests.');
      },
    );

    return unsubscribe;
  }, [user?.uid]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('');
    setError('');

    if (!user) {
      setError('Sign in before creating an appointment request.');
      return;
    }
    if (!preferredDate || preferredDate < getLocalDateString()) {
      setError('Choose today or a future date for your preferred consultation.');
      return;
    }
    if (!understandsRequest) {
      setError('Please confirm that you understand this is a request, not a confirmed appointment.');
      return;
    }

    setSubmitting(true);
    try {
      const requestRef = await addDoc(collection(db, 'appointmentRequests'), {
        userId: user.uid,
        userEmail: user.email ?? null,
        displayName: displayName.trim().slice(0, 100),
        phoneNumber: phoneNumber.trim().slice(0, 30),
        serviceType,
        preferredDate,
        preferredTime,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        status: 'requested',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      let notificationWarning = '';
      try {
        const idToken = await user.getIdToken();
        const notifyResponse = await fetch('/api/appointments/notify-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
          body: JSON.stringify({ requestId: requestRef.id }),
        });
        if (!notifyResponse.ok) notificationWarning = ' Email notification could not be confirmed; contact the clinic directly if you need a timely response.';
      } catch {
        notificationWarning = ' Email notification could not be confirmed; contact the clinic directly if you need a timely response.';
      }

      setPreferredDate('');
      setPreferredTime('morning');
      setServiceType('initial-consultation');
      setPhoneNumber('');
      setUnderstandsRequest(false);
      setNotice(`Your request has been saved to your Curiva account. It has not reserved a slot and is not yet a confirmed appointment.${notificationWarning}`);
    } catch {
      setError('We could not save this request. Check your connection and sign-in, or ask the administrator to verify the appointment-request Firestore rules.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f8f5] py-8 pb-16 text-[#193b35] sm:py-12">
      <SEO
        title="Appointment Requests | Curiva Homoeopathy"
        description="Submit and track a consultation request with Curiva Homoeopathy. Requests are not confirmed bookings until reviewed by the clinic."
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#4b6d5e] transition hover:text-[#153d35]">
          <ArrowLeft className="h-4 w-4" /> Back to Curiva
        </Link>

        <section className="relative overflow-hidden rounded-[2rem] bg-[#112f35] p-6 text-white shadow-[0_25px_70px_rgba(17,47,53,0.14)] sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#8dcfb0]/15 blur-3xl" />
          <div className="relative max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c8e8d7]">
              <CalendarDays className="h-3.5 w-3.5" /> Consultation requests
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Start with a request. Confirm the details before you attend.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#d5e5e0] sm:text-base">
              Share a preferred day and time window. This form does not show live clinic availability or instantly book a slot; staff must review the request and confirm it separately.
            </p>
          </div>
        </section>

        {!authReady ? (
          <div className="mt-6 rounded-2xl border border-[#e0e9e2] bg-white p-6 text-sm text-[#687b72]">Checking your sign-in…</div>
        ) : !user ? (
          <section className="mt-6 rounded-3xl border border-[#e0e9e2] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f5ef] text-[#21664e]">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-xl font-bold">Sign in to keep your request private</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#687b72]">
              Requests are linked to your signed-in account so you can review their status. This form does not ask for symptoms, diagnoses, or medical documents.
            </p>
            <Link to="/auth" state={{ from: '/appointments' }} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#153d35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#205747]">
              Sign in to continue <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        ) : (
          <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-3xl border border-[#e0e9e2] bg-white p-5 shadow-[0_8px_30px_rgba(25,59,53,0.04)] sm:p-8">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f5ef] text-[#21664e]">
                  <CalendarDays className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xl font-bold">Request a consultation</h2>
                  <p className="mt-1 text-sm leading-6 text-[#718079]">Choose a preference, not a guaranteed appointment slot.</p>
                </div>
              </div>

              {notice && (
                <div role="status" className="mt-5 rounded-2xl border border-[#cfe7d7] bg-[#eff8f1] p-4 text-sm leading-6 text-[#245b43]">
                  <div className="flex items-start gap-2 font-semibold"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> Request saved</div>
                  <p className="mt-1">{notice}</p>
                  <p className="mt-2 text-xs leading-5">No automatic email or SMS notification is configured in this release. Until clinic staff confirm the request, do not rely on it for care.</p>
                </div>
              )}
              {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700">{error}</p>}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="appointment-name" className="mb-2 block text-sm font-semibold">Name for the request</label>
                  <input id="appointment-name" name="displayName" autoComplete="name" maxLength={100} value={displayName} onChange={(event) => setDisplayName(event.target.value)} className="w-full rounded-xl border border-[#dce6df] bg-white px-4 py-3 text-sm text-[#193b35] outline-none transition focus:border-[#438064]" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="appointment-phone" className="mb-2 block text-sm font-semibold">Phone number (optional)</label>
                  <input id="appointment-phone" name="phoneNumber" inputMode="tel" autoComplete="tel" maxLength={30} value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} className="w-full rounded-xl border border-[#dce6df] bg-white px-4 py-3 text-sm text-[#193b35] outline-none transition focus:border-[#438064]" placeholder="A number the clinic may use to contact you" />
                  <p className="mt-1.5 text-xs text-[#7b8982]">Only provide a number you are comfortable sharing with authorized clinic staff.</p>
                </div>
                <div>
                  <label htmlFor="appointment-service" className="mb-2 block text-sm font-semibold">Request type</label>
                  <select id="appointment-service" value={serviceType} onChange={(event) => setServiceType(event.target.value as ServiceType)} className="w-full rounded-xl border border-[#dce6df] bg-white px-4 py-3 text-sm text-[#193b35] outline-none transition focus:border-[#438064]">
                    {serviceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="appointment-date" className="mb-2 block text-sm font-semibold">Preferred date</label>
                    <input id="appointment-date" type="date" min={getLocalDateString()} required value={preferredDate} onChange={(event) => setPreferredDate(event.target.value)} className="w-full rounded-xl border border-[#dce6df] bg-white px-4 py-3 text-sm text-[#193b35] outline-none transition focus:border-[#438064]" />
                  </div>
                  <div>
                    <label htmlFor="appointment-time" className="mb-2 block text-sm font-semibold">Preferred time window</label>
                    <select id="appointment-time" value={preferredTime} onChange={(event) => setPreferredTime(event.target.value as typeof preferredTime)} className="w-full rounded-xl border border-[#dce6df] bg-white px-4 py-3 text-sm text-[#193b35] outline-none transition focus:border-[#438064]">
                      {timeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </div>
                </div>
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-[#f5f8f5] p-4 text-sm leading-6 text-[#536f61]">
                  <input type="checkbox" required checked={understandsRequest} onChange={(event) => setUnderstandsRequest(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#21664e]" />
                  <span>I understand this submits a request only. No slot is reserved until the clinic separately confirms it.</span>
                </label>
                <button type="submit" disabled={submitting} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#153d35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#205747] disabled:cursor-not-allowed disabled:opacity-60">
                  {submitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  {submitting ? 'Saving request…' : 'Save appointment request'}
                </button>
              </form>
            </section>

            <aside className="space-y-5">
              <section className="rounded-3xl border border-[#dce9df] bg-[#eaf5ed] p-5 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#21664e]"><ShieldCheck className="h-5 w-5" /></div>
                <h2 className="mt-4 text-lg font-bold">Privacy by design</h2>
                <p className="mt-2 text-sm leading-6 text-[#536f61]">This request collects scheduling preferences and contact details only. Do not enter medical histories or upload reports here. The clinic must assess any health concern through an appropriate confidential consultation.</p>
              </section>

              <section className="rounded-3xl border border-[#e0e9e2] bg-white p-5 sm:p-7">
                <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#438064]" /><h2 className="text-lg font-bold">Your requests</h2></div>
                <p className="mt-2 text-sm leading-6 text-[#718079]">Status updates appear here when an authorized administrator reviews your request.</p>
                {loadingRequests ? (
                  <p className="mt-4 text-sm text-[#718079]">Loading requests…</p>
                ) : requests.length === 0 ? (
                  <p className="mt-4 rounded-xl bg-[#f5f8f5] p-4 text-sm leading-6 text-[#718079]">No requests yet. Your saved requests will appear here.</p>
                ) : (
                  <div className="mt-4 space-y-3">
                    {requests.map((request) => (
                      <article key={request.id} className="rounded-2xl border border-[#e3ebe5] p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-bold">{serviceOptions.find((option) => option.value === request.serviceType)?.label || 'Consultation request'}</p>
                          <span className={'rounded-full px-3 py-1 text-[11px] font-bold ' + (request.status === 'confirmed' ? 'bg-[#e0f2e5] text-[#206344]' : request.status === 'declined' || request.status === 'cancelled' ? 'bg-[#f0f1ef] text-[#68736d]' : 'bg-[#fff3d9] text-[#885e14]')}>
                            {statusLabel(request.status)}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-[#536f61]">{request.preferredDate} · {timeOptions.find((option) => option.value === request.preferredTime)?.label || request.preferredTime}</p>
                        {request.adminResponse && <p className="mt-2 rounded-xl bg-[#f5f8f5] p-3 text-sm leading-5 text-[#536f61]">{request.adminResponse}</p>}
                        {request.status === 'requested' && (
                          <button type="button" onClick={async () => {
                            try {
                              await updateDoc(doc(db, 'appointmentRequests', request.id), { status: 'cancelled', updatedAt: serverTimestamp() });
                              setNotice('Your pending request was cancelled.');
                            } catch {
                              setError('We could not cancel this request. Please try again or contact support.');
                            }
                          }} className="mt-3 text-xs font-bold text-[#536f61] underline underline-offset-4 hover:text-[#153d35]">
                            Cancel request
                          </button>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </section>
              <p className="flex items-start gap-2 text-xs leading-5 text-[#7b8982]"><Info className="mt-0.5 h-4 w-4 shrink-0" /> For urgent or emergency symptoms, do not wait for an online request. Contact local emergency services or go to the nearest emergency department.</p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
