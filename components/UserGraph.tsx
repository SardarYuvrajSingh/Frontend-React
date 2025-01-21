'use client'

import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { fetchUsers } from '@/lib/api'
import { useTranslation } from 'react-i18next'

// Define the shape of user data
type User = {
  id: number
  name: string
}

type UserGraphProps = {
  type?: 'bar' | 'pie'
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C', '#D0ED57', '#FFA07A', '#20B2AA']

export function UserGraph({ type = 'bar' }: UserGraphProps) {
  const { t } = useTranslation()
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  if (isLoading) return <div>{t('loading')}</div>
  if (error) return <div>{t('error')}</div>

  const data = users?.map((user) => ({
    name: user.name,
    value: user.id,
  }))

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{t('userDistribution')}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
