import { useMemo } from "react"

import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import bookSlice from "redux/slice/book-slice"
import { AppDispatch } from "redux/store"

const useBookActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useMemo(
    () =>
      bindActionCreators(
        {
          ...bookSlice.actions,
        },
        dispatch
      ),
    [dispatch]
  )
}

export default useBookActions
