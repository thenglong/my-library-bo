import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"

import bookSlice from "redux/slice/book-slice"
import librarySlice from "redux/slice/library-slice"
import memberSlice from "redux/slice/member-slice"
import rentalSlice from "redux/slice/rental-slice"
import userSlice from "redux/slice/user-slice"

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    book: bookSlice.reducer,
    member: memberSlice.reducer,
    library: librarySlice.reducer,
    rental: rentalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
