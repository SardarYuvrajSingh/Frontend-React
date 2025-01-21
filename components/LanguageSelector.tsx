'use client';

import i18n from '@/lib/i18n'; // Import the i18n instance
import { useStore } from '@/lib/store';

export function LanguageSelector() {
  const { setLanguage } = useStore();

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng); // Use the imported i18n instance
      setLanguage(lng); // Update global state
    } catch (error) {
      console.error('Error changing language:', error); // Log errors
    }
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      value={i18n.language}
      className="p-2 border rounded"
      aria-label="Language selector"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}
