import { auth, db } from '../lib/firebase';
import { doc, getDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';

const FREE_LIMIT = 5;
const PREMIUM_REMEDY_LIMIT = 10;
const FREE_REMEDY_LIMIT = 5;
const LOCAL_STORAGE_KEY = 'curiva_comparison_count';

export interface UsageStatus {
  count: number;
  limitReached: boolean;
  isPremium: boolean;
  maxRemedies: number;
  lastResetDate: string | null;
}

export async function setPremiumStatus(isPremium: boolean): Promise<UsageStatus> {
  const user = auth.currentUser;
  
  if (user) {
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      isPremium: isPremium,
      updatedAt: serverTimestamp()
    });
    return getComparisonUsage();
  }

  // For non-logged in users, we can store it in local storage for demo purposes
  localStorage.setItem('curiva_is_premium', isPremium.toString());
  return getComparisonUsage();
}

export async function getComparisonUsage(): Promise<UsageStatus> {
  const user = auth.currentUser;
  
  const localIsPremium = localStorage.getItem('curiva_is_premium') === 'true';

  if (user) {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      const isPremium = data.isPremium || localIsPremium || false;
      const lastResetDate = data.lastResetDate || null;
      let count = data.comparisonCount || 0;

      // Check for daily reset
      const today = new Date().toISOString().split('T')[0];
      if (!isPremium && lastResetDate !== today) {
        count = 0;
        await updateDoc(userRef, {
          comparisonCount: 0,
          lastResetDate: today,
          updatedAt: serverTimestamp()
        });
      }

      return {
        count,
        isPremium,
        limitReached: !isPremium && count >= FREE_LIMIT,
        maxRemedies: isPremium ? PREMIUM_REMEDY_LIMIT : FREE_REMEDY_LIMIT,
        lastResetDate: today
      };
    }
  }

  // Fallback to local storage for guests
  let localCount = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY) || '0', 10);
  const lastResetDateLocal = localStorage.getItem('curiva_last_reset_date');
  const today = new Date().toISOString().split('T')[0];

  if (!localIsPremium && lastResetDateLocal !== today) {
    localCount = 0;
    localStorage.setItem(LOCAL_STORAGE_KEY, '0');
    localStorage.setItem('curiva_last_reset_date', today);
  }

  return {
    count: localCount,
    isPremium: localIsPremium,
    limitReached: !localIsPremium && localCount >= FREE_LIMIT,
    maxRemedies: localIsPremium ? PREMIUM_REMEDY_LIMIT : FREE_REMEDY_LIMIT,
    lastResetDate: today
  };
}

export async function incrementComparisonCount(): Promise<UsageStatus> {
  const user = auth.currentUser;
  const today = new Date().toISOString().split('T')[0];
  
  if (user) {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    const data = userDoc.data() || {};
    
    if (data.lastResetDate !== today && !data.isPremium) {
      await updateDoc(userRef, {
        comparisonCount: 1,
        lastResetDate: today,
        updatedAt: serverTimestamp()
      });
    } else {
      await updateDoc(userRef, {
        comparisonCount: increment(1),
        updatedAt: serverTimestamp()
      });
    }
    return getComparisonUsage();
  }

  let localCount = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY) || '0', 10);
  const lastResetDateLocal = localStorage.getItem('curiva_last_reset_date');
  
  if (lastResetDateLocal !== today) {
    localCount = 1;
    localStorage.setItem('curiva_last_reset_date', today);
  } else {
    localCount += 1;
  }
  
  localStorage.setItem(LOCAL_STORAGE_KEY, localCount.toString());
  const localIsPremium = localStorage.getItem('curiva_is_premium') === 'true';
  return {
    count: localCount,
    isPremium: localIsPremium,
    limitReached: !localIsPremium && localCount >= FREE_LIMIT,
    maxRemedies: localIsPremium ? PREMIUM_REMEDY_LIMIT : FREE_REMEDY_LIMIT,
    lastResetDate: today
  };
}
