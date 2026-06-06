import { useState, useEffect } from 'react';
import { 
  auth, 
  db, 
  handleFirestoreError, 
  OperationType,
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp,
  onAuthStateChanged
} from '../lib/firebase';

export interface UserSubscription {
  uid: string;
  email: string;
  isPro: boolean;
  trialUsageCount: number;
  proExpiry?: any;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<UserSubscription | null>({
    uid: '',
    email: '',
    isPro: true,
    trialUsageCount: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        
        const unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setSubscription({
              ...(docSnap.data() as UserSubscription),
              isPro: true
            });
          } else {
            // Create user profile if doesn't exist
            const newSub: UserSubscription = {
              uid: user.uid,
              email: user.email || user.phoneNumber || '',
              isPro: true,
              trialUsageCount: 0
            };
            setDoc(userDocRef, {
              ...newSub,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            }).catch(err => handleFirestoreError(err, OperationType.CREATE, 'users/' + user.uid));
            setSubscription(newSub);
          }
          setLoading(false);
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, 'users/' + user.uid);
          setLoading(false);
        });

        return () => unsubscribeDoc();
      } else {
        setSubscription({
          uid: 'guest',
          email: 'guest@scholar.org',
          isPro: true,
          trialUsageCount: 0
        });
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const incrementUsage = async () => {
    return true; // Grant access during free preview
  };

  const checkAccess = (feature: string) => {
    return true; // All features free during preview
  };

  return { subscription, loading, incrementUsage, checkAccess };
}
