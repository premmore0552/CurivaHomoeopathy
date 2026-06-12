/**
 * Safely converts any timestamp flavor (Firestore Timestamp {seconds, nanoseconds}, 
 * ISO strings, date objects, or milliseconds) into a valid Javascript Date object.
 * This completely prevents fatal RangeError (Invalid time value) crashes in React.
 */
export function safeParseDate(dateVal: any): Date {
  if (!dateVal) return new Date();

  // 1. If it's a Firestore-like timestamp object
  if (typeof dateVal === 'object') {
    if (typeof dateVal.seconds === 'number') {
      return new Date(dateVal.seconds * 1000);
    }
    if (typeof dateVal._seconds === 'number') {
      return new Date(dateVal._seconds * 1000);
    }
  }

  // 2. If it's already a Date instance
  if (dateVal instanceof Date) {
    return isNaN(dateVal.getTime()) ? new Date() : dateVal;
  }

  // 3. Otherwise try parsing as standard date string or timestamp number
  const parsed = new Date(dateVal);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }

  // Fallback
  return new Date();
}

/**
 * Parses and formats any timestamp flavor to a localized string safely.
 */
export function safeFormatDate(dateVal: any): string {
  return safeParseDate(dateVal).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
