'use client'

import { useTranslation } from 'react-i18next'
import { UserGraph } from '@/components/UserGraph'
import { PostsTable } from '@/components/PostsTable'
import { LanguageSelector } from '@/components/LanguageSelector'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Dashboard() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
        <div className="flex space-x-4">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <UserGraph />
        <UserGraph type="pie" />
      </div>
      <PostsTable />
    </div>
  )
}