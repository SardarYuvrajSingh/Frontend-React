'use client'

import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, LineChart, Line, ResponsiveContainer, YAxis, XAxis } from 'recharts'
import { useTranslation } from 'react-i18next'

type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    city: string
  }
  company: {
    name: string
  }
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C', '#D0ED57', '#FFA07A', '#20B2AA']

// Function to fetch users from API
async function fetchUsersFromAPI(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }
  return response.json()
}

export function UserGraph() {
  const { t } = useTranslation()
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsersFromAPI
  })

  // Handle loading or error states
  if (isLoading) return <div>{t('loading')}</div>
  if (error instanceof Error) return <div>{t('error')}: {error.message}</div>

  // Check if users are defined
  if (!users || users.length === 0) {
    return <div>{t('noDataAvailable')}</div>
  }

  // Data for Bar Chart (users by city)
  const cities = users.map(user => user.address.city)
  const cityCount = Array.from(new Set(cities)).map(city => ({
    name: city,
    value: cities.filter(c => c === city).length,
  }))

  // Data for Pie Chart (by cities)
  const companyCount = Array.from(new Set(users.map(user => user.company.name))).map(company => ({
    name: company,
    value: users.filter(user => user.company.name === company).length,
  }))

  // Data for Radar Chart (example: by city)
  const radarData = cities.map(city => ({
    city: city,
    value: cities.filter(c => c === city).length,
  }))

  // Data for Line Chart (example: by user id)
  const lineData = users.map(user => ({
    name: user.name,
    value: user.id,
  }))

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{t('userStatistics')}</h2>

      {/* Bar Chart (Users by City) */}
      <div className="mb-8">
        <h3 className="font-semibold mb-2">{t('usersByCity')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cityCount}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart (City Distribution) */}
      <div className="mb-8">
        <h3 className="font-semibold mb-2">{t('cityDistribution')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={400} height={300}>
            <Pie data={cityCount} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
              {cityCount.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>


      {/* Line Chart */}
      <div className="mb-8">
        <h3 className="font-semibold mb-2">{t('userIdTrend')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={400} height={300} data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
