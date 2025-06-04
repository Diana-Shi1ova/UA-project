import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import likesReducer from '../features/likes/likesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    likes: likesReducer,
  },
})