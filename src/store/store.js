import { configureStore } from '@reduxjs/toolkit'
import userdetailReducer from "../store/Featureslices/UserDetails/userdetailsSlice"

export const store = configureStore({
  reducer: {
    userdetails : userdetailReducer
  },
})