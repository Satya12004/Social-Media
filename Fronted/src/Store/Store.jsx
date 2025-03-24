import { configureStore } from '@reduxjs/toolkit'
import  UserSlice  from './userSlice'
import socketSlice from './SocketSlice'
export const store = configureStore({
  reducer: {
    user:UserSlice,
    socket:socketSlice
    },
})