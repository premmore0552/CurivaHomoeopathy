import { 
  db, 
  auth, 
  handleFirestoreError, 
  OperationType,
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  serverTimestamp,
  onSnapshot
} from '../lib/firebase';

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

function sortCreatedDesc(questions: Question[]): Question[] {
  return [...questions].sort((a, b) => {
    const getMs = (val: any) => {
      if (!val) return 0;
      if (val.seconds !== undefined) return val.seconds * 1000 + (val.nanoseconds ? val.nanoseconds / 1000000 : 0);
      if (typeof val.toDate === 'function') return val.toDate().getTime();
      if (val instanceof Date) return val.getTime();
      const dateVal = new Date(val);
      return isNaN(dateVal.getTime()) ? 0 : dateVal.getTime();
    };
    return getMs(b.createdAt) - getMs(a.createdAt);
  });
}

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
      where('userId', '==', auth.currentUser.uid)
    );

    try {
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
      return sortCreatedDesc(docs);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  },

  async getFeaturedQuestions() {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', QuestionStatus.FEATURED)
    );

    try {
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
      return sortCreatedDesc(docs);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  },

  async getAllQuestionsForAdmin() {
    const q = query(
      collection(db, COLLECTION_NAME)
    );

    try {
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
      return sortCreatedDesc(docs);
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
      where('status', '==', QuestionStatus.FEATURED)
    );

    return onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
      callback(sortCreatedDesc(docs));
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
    });
  }
};
