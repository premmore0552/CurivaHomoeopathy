import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, onSnapshot, doc, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { userService, UserProfile } from '../services/userService';

export function useUser() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      if (user) {
        // Subscribe to live profile changes
        unsubscribeSnapshot = onSnapshot(
          doc(db, 'users', user.uid),
          (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              setProfile({
                ...data,
                bookmarks: data.bookmarks || [],
                readingHistory: data.readingHistory || [],
                activities: data.activities || [],
                interests: data.interests || [],
                profession: data.profession || 'user',
              } as UserProfile);
            } else {
              setProfile(null);
            }
            setLoading(false);
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, 'users/' + user.uid);
            setLoading(false);
          }
        );
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }
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
