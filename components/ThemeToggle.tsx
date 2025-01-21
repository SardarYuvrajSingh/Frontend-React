// ThemeToggle.tsx
'use client';

import { useTranslation } from 'react-i18next';
import { useStore } from '@/lib/store';

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useStore();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme} className="p-2 border rounded">
      {theme === 'light' ? t('darkMode') : t('lightMode')}
    </button>
  );
}
