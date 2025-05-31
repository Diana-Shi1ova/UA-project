import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  console.log(userData)
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// Update user
const updateUser = async (userData) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }

  const response = await axios.put(`/api/users/${user._id}`, userData, config)
  const updatedUser = {
    ...user,
    ...response.data,
  }

  localStorage.setItem('user', JSON.stringify(updatedUser))

  return updatedUser
}


const authService = {
  register,
  logout,
  login,
  updateUser,
}

export default authService