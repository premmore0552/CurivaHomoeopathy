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

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  bookmarks: string[];
  readingHistory: { postId: string; timestamp: any }[];
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
        } as UserProfile;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${uid}`);
      return null;
    }
  },

  async syncAuthUser() {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, 'users', user.uid);
    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        const initialData: any = {
          uid: user.uid,
          email: user.email || user.phoneNumber || '',
          displayName: user.displayName || user.phoneNumber || '',
          photoURL: user.photoURL || '',
          bookmarks: [],
          readingHistory: [],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        await setDoc(docRef, initialData);
      } else {
        await updateDoc(docRef, {
          displayName: user.displayName || docSnap.data().displayName || '',
          photoURL: user.photoURL || docSnap.data().photoURL || '',
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
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
      await updateDoc(docRef, {
        bookmarks: isBookmarked ? arrayRemove(postId) : arrayUnion(postId),
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
      await updateDoc(docRef, {
        readingHistory: arrayUnion({
          postId,
          timestamp: new Date().toISOString()
        }),
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

      await updateDoc(docRef, {
        [`studyStats.${remedyId}`]: newStats,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}`);
    }
  }
};
