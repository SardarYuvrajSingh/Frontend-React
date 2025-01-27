import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export const fetchUsers = async () => {
  const response = await api.get('/users')
  return response.data
}

export const fetchPosts = async (page: number, searchTerm: string) => {
  const response = await api.get('/posts', {
    params: {
      _page: page,
      _limit: 10,
      q: searchTerm,
    },
  })
  return response.data
}