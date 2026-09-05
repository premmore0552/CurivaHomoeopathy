
export const trackView = (id: string, title: string, category: string, to: string) => {
  const history = JSON.parse(localStorage.getItem('curiva_history') || '[]');
  
  // Remove if already exists to move to top
  const filtered = history.filter((item: any) => item.to !== to);
  
  const updated = [
    { id, title, category, to, timestamp: Date.now() },
    ...filtered
  ].slice(0, 10); // Keep last 10
  
  localStorage.setItem('curiva_history', JSON.stringify(updated));
};

export const getRecommendations = () => {
  return JSON.parse(localStorage.getItem('curiva_history') || '[]');
};
