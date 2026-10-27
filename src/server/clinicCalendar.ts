import crypto from 'node:crypto';
import { getServerAccessToken } from './paidOrderStore';

export type ClinicCalendarRequest = {
  id: string;
  userEmail: string | null;
  displayName: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  status: string;
  adminResponse?: string;
  confirmedDateTime?: string;
  confirmedTimeZone?: string;
  calendarEventId?: string;
};

export function isClinicCalendarConfigured(): boolean {
  const calendarId = process.env.CURIVA_CLINIC_CALENDAR_ID?.trim();
  const timezone = process.env.CURIVA_CLINIC_TIMEZONE?.trim();
  if (!calendarId || !timezone || !(process.env.CURIVA_APPOINTMENT_ADMIN_UIDS || '').trim()) return false;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

export function getClinicTimezone(): string | null {
  const timezone = process.env.CURIVA_CLINIC_TIMEZONE?.trim();
  if (!timezone) return null;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone });
    return timezone;
  } catch {
    return null;
  }
}

function parseWallClock(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) throw new Error('Choose a valid clinic date and time');
  const parts = {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    hour: Number(match[4]),
    minute: Number(match[5]),
  };
  const check = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute));
  if (
    check.getUTCFullYear() !== parts.year ||
    check.getUTCMonth() + 1 !== parts.month ||
    check.getUTCDate() !== parts.day ||
    parts.hour > 23 || parts.minute > 59
  ) throw new Error('Choose a valid clinic date and time');
  return parts;
}

function wallClockToEpoch(value: string, timezone: string): number {
  const desired = parseWallClock(value);
  const target = Date.UTC(desired.year, desired.month - 1, desired.day, desired.hour, desired.minute);
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  });
  let instant = target;
  for (let iteration = 0; iteration < 4; iteration += 1) {
    const formatted = Object.fromEntries(formatter.formatToParts(new Date(instant)).map((part) => [part.type, part.value]));
    const represented = Date.UTC(
      Number(formatted.year), Number(formatted.month) - 1, Number(formatted.day),
      Number(formatted.hour), Number(formatted.minute),
    );
    const correction = target - represented;
    instant += correction;
    if (correction === 0) break;
  }
  const verified = Object.fromEntries(formatter.formatToParts(new Date(instant)).map((part) => [part.type, part.value]));
  if (
    Number(verified.year) !== desired.year ||
    Number(verified.month) !== desired.month ||
    Number(verified.day) !== desired.day ||
    Number(verified.hour) !== desired.hour ||
    Number(verified.minute) !== desired.minute
  ) throw new Error('That clinic time does not exist in the configured time zone because of a daylight-saving change.');
  return instant;
}

function localWallClock(date: Date): string {
  const datePart = [
    String(date.getUTCFullYear()).padStart(4, '0'),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
  ].join('-');
  const timePart = [
    String(date.getUTCHours()).padStart(2, '0'),
    String(date.getUTCMinutes()).padStart(2, '0'),
  ].join(':');
  return datePart + 'T' + timePart;
}

export function buildClinicAppointmentSlot(confirmedDateTime: string, timezone: string, durationMinutes = 30) {
  if (!Number.isInteger(durationMinutes) || durationMinutes < 10 || durationMinutes > 180) {
    throw new Error('Appointment duration must be between 10 and 180 minutes');
  }
  new Intl.DateTimeFormat('en-US', { timeZone: timezone });
  const startEpoch = wallClockToEpoch(confirmedDateTime, timezone);
  if (startEpoch <= Date.now()) throw new Error('Choose a future clinic appointment time');
  const parts = parseWallClock(confirmedDateTime);
  const endWallClock = localWallClock(new Date(Date.UTC(
    parts.year, parts.month - 1, parts.day, parts.hour, parts.minute + durationMinutes,
  )));
  const endEpoch = wallClockToEpoch(endWallClock, timezone);
  if (endEpoch <= startEpoch) throw new Error('Appointment end time must be after its start time');
  return {
    timeZone: timezone,
    startDateTime: confirmedDateTime + ':00',
    endDateTime: endWallClock + ':00',
  };
}

export function clinicCalendarEventId(requestId: string): string {
  // Google Calendar accepts lower-case base32hex-compatible characters for event IDs.
  return 'curiva' + crypto.createHash('sha256').update(requestId).digest('hex').slice(0, 40);
}

function calendarEventUrl(calendarId: string, eventId: string): string {
  return `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}`;
}

async function fetchCalendarEvent(url: string, token: string): Promise<any | null> {
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Google Calendar read failed (HTTP ${response.status})`);
  return response.json();
}

export async function upsertClinicCalendarEvent(
  request: ClinicCalendarRequest,
  confirmedDateTime: string,
  adminResponse: string,
): Promise<{ id: string; htmlLink: string | null; timeZone: string; startDateTime: string; endDateTime: string }> {
  if (!isClinicCalendarConfigured()) {
    throw new Error('Clinic Google Calendar, time zone, and administrator UIDs must be configured before confirming appointments');
  }
  if (!request.userEmail || !request.userEmail.includes('@')) {
    throw new Error('The requester needs an email address before the clinic can send a calendar invitation');
  }
  const calendarId = process.env.CURIVA_CLINIC_CALENDAR_ID!.trim();
  const timezone = process.env.CURIVA_CLINIC_TIMEZONE!.trim();
  const durationMinutes = Number(process.env.CURIVA_APPOINTMENT_DURATION_MINUTES || '30');
  const slot = buildClinicAppointmentSlot(confirmedDateTime, timezone, durationMinutes);
  const token = await getServerAccessToken('https://www.googleapis.com/auth/calendar.events');
  const eventId = clinicCalendarEventId(request.id);
  const labels: Record<string, string> = {
    'initial-consultation': 'Initial consultation',
    'follow-up': 'Follow-up consultation',
    'general-consultation': 'General consultation enquiry',
  };
  const description = [
    'Created from a Curiva appointment request.',
    `Request ID: ${request.id}`,
    `Requester: ${request.displayName || 'Not provided'}`,
    `Email: ${request.userEmail}`,
    `Original preference: ${request.preferredDate} / ${request.preferredTime} (${request.timezone})`,
    adminResponse ? `Clinic message: ${adminResponse}` : '',
    'Do not add clinical notes to this calendar event.',
  ].filter(Boolean).join('\n');
  const eventBody = {
    id: eventId,
    summary: `Curiva: ${labels[request.serviceType] || 'Consultation'}`,
    description,
    start: { dateTime: slot.startDateTime, timeZone: timezone },
    end: { dateTime: slot.endDateTime, timeZone: timezone },
    attendees: [{ email: request.userEmail, displayName: request.displayName || request.userEmail }],
    extendedProperties: { private: { curivaRequestId: request.id } },
  };

  const eventUrl = calendarEventUrl(calendarId, eventId);
  const existing = await fetchCalendarEvent(eventUrl, token);
  if (existing && existing.extendedProperties?.private?.curivaRequestId !== request.id) {
    throw new Error('The calendar event ID is already associated with another request');
  }
  const url = existing ? `${eventUrl}?sendUpdates=all` : `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`;
  const response = await fetch(url, {
    method: existing ? 'PATCH' : 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(existing ? {
      summary: eventBody.summary,
      description: eventBody.description,
      start: eventBody.start,
      end: eventBody.end,
      attendees: eventBody.attendees,
      extendedProperties: eventBody.extendedProperties,
    } : eventBody),
  });
  if (!response.ok) {
    console.error('Google Calendar event write failed:', response.status);
    throw new Error(`Google Calendar could not save the appointment (HTTP ${response.status})`);
  }
  const saved = await response.json();
  return {
    id: saved.id || eventId,
    htmlLink: typeof saved.htmlLink === 'string' ? saved.htmlLink : null,
    timeZone: timezone,
    startDateTime: slot.startDateTime,
    endDateTime: slot.endDateTime,
  };
}

export async function deleteClinicCalendarEvent(requestId: string, eventId: string): Promise<void> {
  if (!isClinicCalendarConfigured()) throw new Error('Clinic Google Calendar is not configured');
  const calendarId = process.env.CURIVA_CLINIC_CALENDAR_ID!.trim();
  const token = await getServerAccessToken('https://www.googleapis.com/auth/calendar.events');
  const url = calendarEventUrl(calendarId, eventId);
  const existing = await fetchCalendarEvent(url, token);
  if (!existing) return;
  if (existing.extendedProperties?.private?.curivaRequestId !== requestId) {
    throw new Error('Refusing to delete a calendar event that does not belong to this request');
  }
  const response = await fetch(`${url}?sendUpdates=all`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok && response.status !== 404 && response.status !== 410) {
    throw new Error(`Google Calendar could not cancel the appointment (HTTP ${response.status})`);
  }
}
