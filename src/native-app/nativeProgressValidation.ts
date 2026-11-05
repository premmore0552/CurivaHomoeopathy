export type StoredStudyPlan = {
  date: string;
  goal: number;
  completed: string[];
};

const VALID_TASK_IDS = new Set(['topic', 'mcq', 'cards', 'materia']);

function safeStrings(value: unknown, limit: number): string[] {
  return Array.isArray(value)
    ? Array.from(new Set(value.filter((item): item is string =>
        typeof item === 'string' && item.length > 0 && item.length <= 220
      ))).slice(-limit)
    : [];
}

/**
 * Validates and normalizes a study plan restored from local storage or Firestore.
 * Dates are date-only ISO values (YYYY-MM-DD), validated in UTC to avoid
 * timezone-dependent parsing and to reject impossible calendar dates.
 */
export function safeStudyPlan(value: unknown): StoredStudyPlan | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;

  const item = value as Record<string, unknown>;
  if (typeof item.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
    return null;
  }

  const parsedDate = new Date(`${item.date}T00:00:00.000Z`);
  if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== item.date) {
    return null;
  }

  const requestedGoal = Number(item.goal);
  const goal = [15, 30, 45, 60].includes(requestedGoal) ? requestedGoal : 30;
  const completed = safeStrings(item.completed, 4).filter((id) => VALID_TASK_IDS.has(id));

  return { date: item.date, goal, completed };
}
