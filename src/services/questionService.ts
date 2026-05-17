import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';

export enum QuestionStatus {
  PENDING = 'pending',
  ANSWERED = 'answered',
  FEATURED = 'featured'
}

export interface Question {
  id: string;
  userId: string;
  userName?: string;
  userEmail: string;
  subject: string;
  content: string;
  status: QuestionStatus;
  answer?: string;
  answeredBy?: string;
  answeredAt?: any;
  isAnonymous: boolean;
  createdAt: any;
  updatedAt?: any;
}

const COLLECTION_NAME = 'questions';

export const questionService = {
  async submitQuestion(subject: string, content: string, isAnonymous: boolean) {
    if (!auth.currentUser) throw new Error('User must be signed in to ask a question');

    const questionData = {
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName || 'Anonymous User',
      userEmail: auth.currentUser.email || '',
      subject,
      content,
      isAnonymous,
      status: QuestionStatus.PENDING,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), questionData);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, COLLECTION_NAME);
    }
  },

  async getMyQuestions() {
    if (!auth.currentUser) return [];
    
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    try {
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  },

  async getFeaturedQuestions() {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', QuestionStatus.FEATURED),
      orderBy('createdAt', 'desc')
    );

    try {
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  },

  async getAllQuestionsForAdmin() {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );

    try {
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  },

  async answerQuestion(questionId: string, answer: string, status: QuestionStatus = QuestionStatus.ANSWERED) {
    if (!auth.currentUser) throw new Error('Auth required');

    const questionRef = doc(db, COLLECTION_NAME, questionId);
    
    try {
      await updateDoc(questionRef, {
        answer,
        status,
        answeredBy: auth.currentUser.displayName || auth.currentUser.email,
        answeredAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${questionId}`);
    }
  },

  subscribeToFeatured(callback: (questions: Question[]) => void) {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', QuestionStatus.FEATURED),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const questions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
      callback(questions);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
    });
  }
};
