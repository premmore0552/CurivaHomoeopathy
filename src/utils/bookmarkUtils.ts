export interface BookmarkedRemedy {
  id: string;
  slug?: string;
  name: string;
  commonName?: string;
  family?: string;
  thermal?: string;
  keynotes?: string[];
  savedAt: string;
}

const BOOKMARKS_KEY = 'curiva_bookmarked_remedies';

export const getBookmarkedRemedies = (): BookmarkedRemedy[] => {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load bookmarks', err);
    return [];
  }
};

export const isRemedyBookmarked = (id: string): boolean => {
  if (!id) return false;
  const bookmarks = getBookmarkedRemedies();
  const normId = id.toLowerCase();
  return bookmarks.some(b => b.id.toLowerCase() === normId || (b.slug && b.slug.toLowerCase() === normId));
};

export const toggleBookmarkRemedy = (remedy: {
  id: string;
  name: string;
  commonName?: string;
  family?: string;
  thermal?: string;
  keynotes?: string[];
}): boolean => {
  const bookmarks = getBookmarkedRemedies();
  const normId = remedy.id.toLowerCase();
  const existingIndex = bookmarks.findIndex(
    b => b.id.toLowerCase() === normId || (b.slug && b.slug.toLowerCase() === normId)
  );

  let isSaved = false;
  if (existingIndex >= 0) {
    bookmarks.splice(existingIndex, 1);
    isSaved = false;
  } else {
    bookmarks.unshift({
      id: remedy.id,
      slug: remedy.id.toLowerCase(),
      name: remedy.name,
      commonName: remedy.commonName || '',
      family: remedy.family || '',
      thermal: remedy.thermal || '',
      keynotes: remedy.keynotes || [],
      savedAt: new Date().toISOString()
    });
    isSaved = true;
  }

  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    window.dispatchEvent(new Event('curiva_bookmarks_updated'));
  } catch (err) {
    console.error('Failed to save bookmark', err);
  }

  return isSaved;
};

export const removeBookmarkRemedy = (id: string): void => {
  const bookmarks = getBookmarkedRemedies();
  const normId = id.toLowerCase();
  const filtered = bookmarks.filter(
    b => b.id.toLowerCase() !== normId && (!b.slug || b.slug.toLowerCase() !== normId)
  );
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('curiva_bookmarks_updated'));
  } catch (err) {
    console.error('Failed to remove bookmark', err);
  }
};
