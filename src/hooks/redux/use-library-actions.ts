import { useMemo } from "react"

import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import librarySlice from "redux/slice/library-slice"
import { AppDispatch } from "redux/store"

const useLibraryActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useMemo(
    () =>
      bindActionCreators(
        {
          ...librarySlice.actions,
        },
        dispatch
      ),
    [dispatch]
  )
}

export default useLibraryActions
