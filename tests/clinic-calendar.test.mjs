import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildClinicAppointmentSlot, clinicCalendarEventId } from '../.netlify-build/server/clinicCalendar.mjs';

test('clinic appointment slots include clinic timezone and requested duration', () => {
  const slot = buildClinicAppointmentSlot('2035-01-15T10:30', 'Asia/Kolkata', 45);
  assert.equal(slot.timeZone, 'Asia/Kolkata');
  assert.equal(slot.startDateTime, '2035-01-15T10:30:00');
  assert.equal(slot.endDateTime, '2035-01-15T11:15:00');
});

test('calendar rejects malformed, past, and nonexistent daylight-saving wall-clock times', () => {
  assert.throws(() => buildClinicAppointmentSlot('2035-99-15T10:30', 'Asia/Kolkata', 30), /valid/i);
  assert.throws(() => buildClinicAppointmentSlot('2000-01-01T10:30', 'Asia/Kolkata', 30), /future/i);
  assert.throws(() => buildClinicAppointmentSlot('2035-03-11T02:30', 'America/New_York', 30), /daylight-saving/i);
});

test('calendar event IDs are stable lowercase IDs accepted by Google Calendar', () => {
  const id = clinicCalendarEventId('request-123');
  assert.equal(id, clinicCalendarEventId('request-123'));
  assert.match(id, /^[a-v0-9]+$/);
});
