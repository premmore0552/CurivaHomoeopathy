(() => {
  let saved = null;
  try {
    saved = window.localStorage.getItem('theme');
  } catch {
    // Theme persistence is optional when browser storage is restricted.
  }
  const hour = new Date().getHours();
  const theme = saved === 'light' || saved === 'dark'
    ? saved
    : (hour >= 6 && hour < 18 ? 'light' : 'dark');
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.setAttribute('data-theme', theme);
})();
