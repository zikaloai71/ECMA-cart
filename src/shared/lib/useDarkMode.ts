import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ecma-theme';
const DARK_CLASS = 'dark';

function getInitialDark(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) return stored === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState(getInitialDark);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle(DARK_CLASS, isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return { isDark, toggle };
}
