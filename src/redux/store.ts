import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"

import bookSlice from "redux/slice/book-slice"
import userSlice from "redux/slice/user-slice"

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    book: bookSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
