'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { fetchPosts } from '@/lib/api'
import { useStore } from '@/lib/store'

export function PostsTable() {
  const { t } = useTranslation()
  const { searchTerm } = useStore()
  const observerTarget = useRef(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', searchTerm],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchTerm),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined
      return pages.length + 1
    },
  })

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries
    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  useEffect(() => {
    const element = observerTarget.current
    if (!element) return

    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver(handleObserver, option)
    observer.observe(element)

    return () => observer.disconnect()
  }, [handleObserver])

  if (status === 'loading') return <div>{t('loading')}</div>
  if (status === 'error') return <div>{t('error')}</div>

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{t('posts')}</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">{t('id')}</th>
            <th className="border border-gray-300 p-2">{t('title')}</th>
            <th className="border border-gray-300 p-2">{t('body')}</th>
          </tr>
        </thead>
        <tbody>
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.map(post => (
                <tr key={post.id}>
                  <td className="border border-gray-300 p-2">{post.id}</td>
                  <td className="border border-gray-300 p-2">{post.title}</td>
                  <td className="border border-gray-300 p-2">{post.body.substring(0, 50)}...</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {isFetchingNextPage && <div className="mt-4">{t('loading')}</div>}
      <div ref={observerTarget} style={{ height: '20px' }}></div>
    </div>
  )
}
