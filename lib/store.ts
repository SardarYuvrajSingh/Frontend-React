import { create } from 'zustand'

type Store = {
  searchTerm: string
  setSearchTerm: (term: string) => void
  language: string
  setLanguage: (lang: string) => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useStore = create<Store>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}))
