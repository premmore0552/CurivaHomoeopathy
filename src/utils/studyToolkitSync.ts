export type SyncItem = {
  id: string;
  updatedAt?: string;
  createdAt?: string;
  date?: string;
};

export type SyncableWorkspace = {
  tasks: SyncItem[];
  notes: SyncItem[];
  cards: SyncItem[];
  sessions: SyncItem[];
  readingLogs: SyncItem[];
  reflections: SyncItem[];
  dailyGoal: number;
  weeklyGoal: number;
  examDate: string;
  focusMode: boolean;
  timer: unknown;
};

const COLLECTION_LIMITS = {
  tasks: 300,
  notes: 40,
  cards: 150,
  sessions: 500,
  readingLogs: 150,
  reflections: 50,
} as const;

function equalValue(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function itemTimestamp(item: SyncItem): number {
  const candidate = item.updatedAt || item.createdAt || item.date || '';
  if (!candidate) return 0;
  const parsed = Date.parse(candidate.length === 10 ? `${candidate}T00:00:00.000Z` : candidate);
  return Number.isFinite(parsed) ? parsed : 0;
}

function mergeItems<T extends SyncItem>(base: T[], local: T[], remote: T[], limit: number): T[] {
  const baseById = new Map(base.map(item => [item.id, item]));
  const localById = new Map(local.map(item => [item.id, item]));
  const remoteById = new Map(remote.map(item => [item.id, item]));
  const orderedIds = [...new Set([...local, ...remote, ...base].map(item => item.id))];
  const result: T[] = [];

  for (const itemId of orderedIds) {
    const before = baseById.get(itemId);
    const localItem = localById.get(itemId);
    const remoteItem = remoteById.get(itemId);
    const localChanged = !equalValue(localItem, before);
    const remoteChanged = !equalValue(remoteItem, before);

    let selected: T | undefined;
    if (!localChanged) {
      selected = remoteItem;
    } else if (!remoteChanged) {
      selected = localItem;
    } else if (!localItem || !remoteItem) {
      // A deletion wins a concurrent edit. This prevents a stale offline copy
      // from silently resurrecting a task or note deleted on another device.
      selected = undefined;
    } else if (equalValue(localItem, remoteItem)) {
      selected = localItem;
    } else {
      // Mutable items carry updatedAt. In a timestamp tie, prefer the server
      // snapshot to make all clients converge on the same value.
      selected = itemTimestamp(localItem) > itemTimestamp(remoteItem) ? localItem : remoteItem;
    }

    if (selected) result.push(selected);
  }

  return result
    .sort((left, right) => itemTimestamp(right) - itemTimestamp(left))
    .slice(0, limit);
}

function mergeScalar<T>(base: T, local: T, remote: T, preferLocalConflict: boolean): T {
  const localChanged = !equalValue(local, base);
  const remoteChanged = !equalValue(remote, base);
  if (!localChanged) return remote;
  if (!remoteChanged || equalValue(local, remote)) return local;
  return preferLocalConflict ? local : remote;
}

/**
 * Three-way workspace reconciliation.
 *
 * - Independent additions/edits from both clients are retained.
 * - A change on one client does not replace untouched remote fields.
 * - Conflicting edits use updatedAt for mutable items and last-transaction-wins
 *   for scalar settings.
 * - Deletions win conflicts so older offline copies cannot resurrect deleted data.
 */
export function mergeStudyToolkitStates<T extends SyncableWorkspace>(
  base: T,
  local: T,
  remote: T,
  preferLocalScalarConflicts = true
): T {
  return {
    ...remote,
    tasks: mergeItems(base.tasks, local.tasks, remote.tasks, COLLECTION_LIMITS.tasks),
    notes: mergeItems(base.notes, local.notes, remote.notes, COLLECTION_LIMITS.notes),
    cards: mergeItems(base.cards, local.cards, remote.cards, COLLECTION_LIMITS.cards),
    sessions: mergeItems(base.sessions, local.sessions, remote.sessions, COLLECTION_LIMITS.sessions),
    readingLogs: mergeItems(base.readingLogs, local.readingLogs, remote.readingLogs, COLLECTION_LIMITS.readingLogs),
    reflections: mergeItems(base.reflections, local.reflections, remote.reflections, COLLECTION_LIMITS.reflections),
    dailyGoal: mergeScalar(base.dailyGoal, local.dailyGoal, remote.dailyGoal, preferLocalScalarConflicts),
    weeklyGoal: mergeScalar(base.weeklyGoal, local.weeklyGoal, remote.weeklyGoal, preferLocalScalarConflicts),
    examDate: mergeScalar(base.examDate, local.examDate, remote.examDate, preferLocalScalarConflicts),
    focusMode: mergeScalar(base.focusMode, local.focusMode, remote.focusMode, preferLocalScalarConflicts),
    timer: mergeScalar(base.timer, local.timer, remote.timer, preferLocalScalarConflicts),
  };
}
