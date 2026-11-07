(() => {
  try {
    const saved = window.localStorage.getItem('theme');
    let theme = 'light';
    if (saved === 'light' || saved === 'dark') {
      theme = saved;
    } else {
      const hour = new Date().getHours();
      theme = hour >= 6 && hour < 18 ? 'light' : 'dark';
    }
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
