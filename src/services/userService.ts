import {
  db,
  auth,
  handleFirestoreError,
  OperationType,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from '../lib/firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  profession?: string;
  bio?: string;
  qualifications?: string;
  interests?: string[];
  // Bookmarks, reading history and performance data are session-local only.
  bookmarks: string[];
  readingHistory: { postId: string; timestamp: string }[];
  studyStats?: Record<string, {
    correct: number;
    total: number;
    lastDifficulty: string;
    updatedAt: string;
  }>;
  createdAt: any;
  updatedAt: any;
}

type LocalProfileData = {
  bookmarks: string[];
  readingHistory: { postId: string; timestamp: string }[];
  studyStats: Record<string, { correct: number; total: number; lastDifficulty: string; updatedAt: string }>;
};

const LOCAL_PROFILE_PREFIX = 'curiva-profile-session-v1:';
const allowedProfessions = new Set([
  'Guest', 'Public', 'General Public', 'BHMS Student', '1st BHMS',
  '2nd BHMS', '3rd BHMS', '4th BHMS', '1st Year Student',
  '2nd Year Student', '3rd Year Student', '4th Year Student',
  'Internship Student', 'Intern', 'Practitioner', 'Faculty', 'Researcher', 'user'
]);

function safeProfileProfession(value?: string): string {
  const clean = (value || 'user').trim().slice(0, 80);
  return allowedProfessions.has(clean) ? clean : 'user';
}

function emptyLocalProfile(): LocalProfileData {
  return { bookmarks: [], readingHistory: [], studyStats: {} };
}

function localProfileKey(uid: string): string {
  return LOCAL_PROFILE_PREFIX + uid;
}

function readLocalProfile(uid: string, legacy?: Record<string, any>): LocalProfileData {
  try {
    if (typeof sessionStorage !== 'undefined') {
      const raw = sessionStorage.getItem(localProfileKey(uid));
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<LocalProfileData>;
        return {
          bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks.filter((v): v is string => typeof v === 'string').slice(0, 500) : [],
          readingHistory: Array.isArray(parsed.readingHistory)
            ? parsed.readingHistory.filter((v: any) => v && typeof v.postId === 'string').slice(0, 100)
            : [],
          studyStats: parsed.studyStats && typeof parsed.studyStats === 'object' ? parsed.studyStats : {}
        };
      }
    }
  } catch {
    // Corrupt local data is ignored; the academic workspace remains usable.
  }

  // Migrate only the owner's legacy reading metadata into the current tab.
  const migrated: LocalProfileData = {
    bookmarks: Array.isArray(legacy?.bookmarks) ? legacy.bookmarks.filter((v: unknown) => typeof v === 'string').slice(0, 500) : [],
    readingHistory: Array.isArray(legacy?.readingHistory)
      ? legacy.readingHistory.filter((v: any) => v && typeof v.postId === 'string').slice(-100)
      : [],
    studyStats: legacy?.studyStats && typeof legacy.studyStats === 'object' ? legacy.studyStats : {}
  };
  writeLocalProfile(uid, migrated);
  return migrated;
}

function writeLocalProfile(uid: string, data: LocalProfileData): void {
  try {
    if (typeof sessionStorage === 'undefined') return;
    sessionStorage.setItem(localProfileKey(uid), JSON.stringify({
      bookmarks: data.bookmarks.slice(0, 500),
      readingHistory: data.readingHistory.slice(-100),
      studyStats: data.studyStats
    }));
  } catch {
    // Privacy-first local features may be unavailable if browser storage is blocked.
  }
}

export const userService = {
  async getProfile(uid: string): Promise<UserProfile | null> {
    try {
      const snapshot = await getDoc(doc(db, 'users', uid));
      if (!snapshot.exists()) return null;
      const data = snapshot.data() || {};
      const local = readLocalProfile(uid, data);
      return {
        uid,
        email: typeof data.email === 'string' ? data.email : '',
        displayName: typeof data.displayName === 'string' ? data.displayName : '',
        photoURL: typeof data.photoURL === 'string' ? data.photoURL : '',
        profession: safeProfileProfession(data.profession),
        bio: typeof data.bio === 'string' ? data.bio : '',
        qualifications: typeof data.qualifications === 'string' ? data.qualifications : '',
        interests: Array.isArray(data.interests) ? data.interests.filter((v: unknown) => typeof v === 'string').slice(0, 20) : [],
        ...local,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${uid}`);
      return null;
    }
  },

  async syncAuthUser(profession?: string) {
    const user = auth.currentUser;
    if (!user) return;
    const safeProfession = safeProfileProfession(profession);

    try {
      const reference = doc(db, 'users', user.uid);
      const snapshot = await getDoc(reference);
      if (!snapshot.exists()) {
        await setDoc(reference, {
          uid: user.uid,
          email: user.email || '',
          displayName: (user.displayName || user.email?.split('@')[0] || 'Curiva learner').slice(0, 80),
          photoURL: user.photoURL?.startsWith('https://') ? user.photoURL : '',
          profession: safeProfession,
          interests: [],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        return safeProfession;
      }

      const current = snapshot.data() || {};
      const update: Record<string, unknown> = {
        displayName: (user.displayName || current.displayName || '').toString().slice(0, 80),
        photoURL: user.photoURL?.startsWith('https://') ? user.photoURL : (current.photoURL || ''),
        updatedAt: serverTimestamp()
      };
      if (profession) update.profession = safeProfession;
      await updateDoc(reference, update);
      return profession ? safeProfession : safeProfileProfession(current.profession);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
      // handleFirestoreError deliberately returns for transient offline errors;
      // profile sync must still reject so callers can distinguish partial login.
      throw new Error('Curiva could not synchronize your profile because the cloud service is unavailable. Please retry.');
    }
  },

  // Activity streams are intentionally not persisted. Do not send free text,
  // clinical context, search queries or study details to an analytics timeline.
  async trackActivity(_type: string, _details: string) {
    return;
  },

  async updateProfileSettings(data: {
    displayName?: string;
    bio?: string;
    qualifications?: string;
    profession?: string;
    photoURL?: string;
    interests?: string[];
  }) {
    const user = auth.currentUser;
    if (!user) throw new Error('Auth required');
    const update: Record<string, unknown> = { updatedAt: serverTimestamp() };

    if (data.displayName !== undefined) update.displayName = data.displayName.trim().slice(0, 80);
    if (data.bio !== undefined) update.bio = data.bio.trim().slice(0, 500);
    if (data.qualifications !== undefined) update.qualifications = data.qualifications.trim().slice(0, 160);
    if (data.photoURL !== undefined) {
      const value = data.photoURL.trim().slice(0, 2048);
      if (value && !value.startsWith('https://')) throw new Error('Profile images must use HTTPS.');
      update.photoURL = value;
    }
    if (data.profession !== undefined) update.profession = safeProfileProfession(data.profession);
    if (data.interests !== undefined) update.interests = data.interests.filter(value => typeof value === 'string').slice(0, 20).map(value => value.slice(0, 80));
    try {
      await updateDoc(doc(db, 'users', user.uid), update);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      throw error;
    }
  },

  async updateProfession(profession: string) {
    const user = auth.currentUser;
    if (!user) throw new Error('Auth required');
    if (profession === 'Administrator' || !allowedProfessions.has(profession)) {
      throw new Error('This workspace role is not permitted.');
    }
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        profession,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
      throw error;
    }
  },

  async toggleBookmark(postId: string) {
    const user = auth.currentUser;
    if (!user) throw new Error('Auth required');
    if (typeof postId !== 'string' || !/^[a-zA-Z0-9_-]{1,120}$/.test(postId)) {
      throw new Error('Invalid bookmark identifier.');
    }
    const local = readLocalProfile(user.uid);
    const exists = local.bookmarks.includes(postId);
    local.bookmarks = exists
      ? local.bookmarks.filter(value => value !== postId)
      : [postId, ...local.bookmarks].slice(0, 500);
    writeLocalProfile(user.uid, local);
  },

  async addToHistory(postId: string) {
    const user = auth.currentUser;
    if (!user || typeof postId !== 'string' || !/^[a-zA-Z0-9_-]{1,120}$/.test(postId)) return;
    const local = readLocalProfile(user.uid);
    local.readingHistory = [
      { postId, timestamp: new Date().toISOString() },
      ...local.readingHistory.filter(item => item.postId !== postId)
    ].slice(0, 100);
    writeLocalProfile(user.uid, local);
  },

  async updateStudyStats(remedyId: string, correct: boolean, difficulty: string) {
    const user = auth.currentUser;
    if (!user || typeof remedyId !== 'string' || !/^[a-zA-Z0-9_-]{1,120}$/.test(remedyId)) return;
    const local = readLocalProfile(user.uid);
    const previous = local.studyStats[remedyId] || { correct: 0, total: 0, lastDifficulty: 'normal', updatedAt: '' };
    local.studyStats = {
      ...local.studyStats,
      [remedyId]: {
        correct: previous.correct + (correct ? 1 : 0),
        total: previous.total + 1,
        lastDifficulty: difficulty.slice(0, 40),
        updatedAt: new Date().toISOString()
      }
    };
    writeLocalProfile(user.uid, local);
  }
};
