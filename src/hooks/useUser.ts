import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, onSnapshot, doc, db } from '../lib/firebase';
import { userService, UserProfile } from '../services/userService';

export function useUser() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activeUid: string | null = null;
    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, user => {
      unsubscribeSnapshot?.();
      unsubscribeSnapshot = null;
      activeUid = user?.uid || null;
      setProfile(null);

      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      unsubscribeSnapshot = onSnapshot(
        doc(db, 'users', user.uid),
        () => {
          void userService.getProfile(user.uid).then(nextProfile => {
            if (auth.currentUser?.uid !== user.uid || activeUid !== user.uid) return;
            setProfile(nextProfile);
            setLoading(false);
          });
        },
        () => {
          if (auth.currentUser?.uid !== user.uid || activeUid !== user.uid) return;
          setProfile(null);
          setLoading(false);
        }
      );
    });

    return () => {
      activeUid = null;
      unsubscribeAuth();
      unsubscribeSnapshot?.();
    };
  }, []);

  const toggleBookmark = async (postId: string) => {
    if (!profile) return;
    await userService.toggleBookmark(postId);
    const updatedProfile = await userService.getProfile(profile.uid);
    setProfile(updatedProfile);
  };

  const addToHistory = async (postId: string) => {
    if (!profile) return;
    await userService.addToHistory(postId);
    const updatedProfile = await userService.getProfile(profile.uid);
    setProfile(updatedProfile);
  };

  return { profile, loading, toggleBookmark, addToHistory };
}
