import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';

export interface UserActivity {
  id: string;
  type: 'login' | 'bookmark_add' | 'bookmark_remove' | 'read_post' | 'change_profession' | 'ask_question' | 'mcq_practice' | 'profile_update' | 'study_tool';
  details: string;
  timestamp: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  profession?: string; // 'doctor' | 'practitioner' | 'student' | 'user'
  bio?: string;
  qualifications?: string;
  clinicAddress?: string;
  interests?: string[];
  bookmarks: string[];
  readingHistory: { postId: string; timestamp: any }[];
  activities?: UserActivity[];
  studyStats?: Record<string, {
    correct: number;
    total: number;
    lastDifficulty: string;
    updatedAt: string;
  }>;
  createdAt: any;
  updatedAt: any;
}

export const userService = {
  async getProfile(uid: string): Promise<UserProfile | null> {
    const docRef = doc(db, 'users', uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          bookmarks: data.bookmarks || [],
          readingHistory: data.readingHistory || [],
          activities: data.activities || [],
          interests: data.interests || [],
          profession: data.profession || 'user',
        } as UserProfile;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${uid}`);
      return null;
    }
  },

  async syncAuthUser(profession?: string) {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid);
    try {
      const docSnap = await getDoc(docRef);
      const isNewUser = !docSnap.exists();
      const loginAct = {
        id: Math.random().toString(36).substring(2, 11),
        type: 'login' as const,
        details: isNewUser 
          ? `Created account under workspace: ${profession || 'user'}`
          : `Authenticated with portal session. Welcome back!`,
        timestamp: new Date().toISOString()
      };

      if (isNewUser) {
        const initialData: any = {
          uid: user.uid,
          email: user.email || user.phoneNumber || '',
          displayName: user.displayName || user.phoneNumber || '',
          photoURL: user.photoURL || '',
          profession: profession || 'user',
          bookmarks: [],
          readingHistory: [],
          activities: [loginAct],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        await setDoc(docRef, initialData);
      } else {
        const updateData: any = {
          displayName: user.displayName || docSnap.data().displayName || '',
          photoURL: user.photoURL || docSnap.data().photoURL || '',
          activities: arrayUnion(loginAct),
          updatedAt: serverTimestamp()
        };
        if (profession) {
          updateData.profession = profession;
        }
        await updateDoc(docRef, updateData);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
    }
  },

  async trackActivity(type: 'login' | 'bookmark_add' | 'bookmark_remove' | 'read_post' | 'change_profession' | 'ask_question' | 'mcq_practice' | 'profile_update' | 'study_tool', details: string) {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid);
    try {
      const act = {
        id: Math.random().toString(36).substring(2, 11),
        type,
        details,
        timestamp: new Date().toISOString()
      };
      await updateDoc(docRef, {
        activities: arrayUnion(act),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Failed to track user activity:", error);
    }
  },

  async updateProfileSettings(data: { displayName?: string; bio?: string; qualifications?: string; profession?: string; photoURL?: string; clinicAddress?: string; interests?: string[] }) {
    const user = auth.currentUser;
    if (!user) throw new Error('Auth required');

    const docRef = doc(db, 'users', user.uid);
    try {
      const details = `Updated fields: ${Object.keys(data).filter(k => data[k as keyof typeof data] !== undefined).join(', ')}`;
      const act = {
        id: Math.random().toString(36).substring(2, 11),
        type: 'profile_update' as const,
        details,
        timestamp: new Date().toISOString()
      };
      const updateData: any = {
        ...data,
        activities: arrayUnion(act),
        updatedAt: serverTimestamp()
      };
      await updateDoc(docRef, updateData);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  },

  async updateProfession(profession: string) {
    const user = auth.currentUser;
    if (!user) throw new Error('Auth required');

    const docRef = doc(db, 'users', user.uid);
    try {
      const act = {
        id: Math.random().toString(36).substring(2, 11),
        type: 'change_profession' as const,
        details: `Workspace role updated to: ${profession}`,
        timestamp: new Date().toISOString()
      };
      await updateDoc(docRef, {
        profession,
        activities: arrayUnion(act),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  },

  async toggleBookmark(postId: string) {
    const user = auth.currentUser;
    if (!user) throw new Error('Auth required');

    const profile = await this.getProfile(user.uid);
    if (!profile) return;

    const isBookmarked = profile.bookmarks.includes(postId);
    const docRef = doc(db, 'users', user.uid);

    try {
      const act = {
        id: Math.random().toString(36).substring(2, 11),
        type: (isBookmarked ? 'bookmark_remove' : 'bookmark_add') as 'bookmark_remove' | 'bookmark_add',
        details: `${isBookmarked ? 'Removed' : 'Added'} bookmark for inquiry/remedy: ${postId}`,
        timestamp: new Date().toISOString()
      };
      await updateDoc(docRef, {
        bookmarks: isBookmarked ? arrayRemove(postId) : arrayUnion(postId),
        activities: arrayUnion(act),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  },

  async addToHistory(postId: string) {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid);
    try {
      const act = {
        id: Math.random().toString(36).substring(2, 11),
        type: 'read_post' as const,
        details: `Reviewed clinical detail / Materia Medica: ${postId}`,
        timestamp: new Date().toISOString()
      };
      await updateDoc(docRef, {
        readingHistory: arrayUnion({
          postId,
          timestamp: new Date().toISOString()
        }),
        activities: arrayUnion(act),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  },

  async updateStudyStats(remedyId: string, correct: boolean, difficulty: string) {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid);
    try {
      const profile = await this.getProfile(user.uid);
      const currentStats = profile?.studyStats?.[remedyId] || { correct: 0, total: 0, lastDifficulty: difficulty, updatedAt: '' };
      
      const newStats = {
        correct: currentStats.correct + (correct ? 1 : 0),
        total: currentStats.total + 1,
        lastDifficulty: difficulty,
        updatedAt: new Date().toISOString()
      };

      const act = {
        id: Math.random().toString(36).substring(2, 11),
        type: 'mcq_practice' as const,
        details: `Practiced COMPETITIVE MCQ for ${remedyId}. Result: ${correct ? 'CORRECT' : 'INCORRECT'} (${difficulty})`,
        timestamp: new Date().toISOString()
      };

      await updateDoc(docRef, {
        [`studyStats.${remedyId}`]: newStats,
        activities: arrayUnion(act),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  }
};
