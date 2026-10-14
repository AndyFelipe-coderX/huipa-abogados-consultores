import { useEffect, useState } from 'react';

// El tema inicial lo fija un script en index.html (evita el parpadeo al cargar).
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#131210' : '#f5f1ea');
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* almacenamiento no disponible */
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return [theme, toggle];
}
