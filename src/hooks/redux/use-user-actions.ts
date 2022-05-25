import { useMemo } from "react"

import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import userSlice from "redux/slice/user-slice"
import { AppDispatch } from "redux/store"

const useUserActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useMemo(
    () =>
      bindActionCreators(
        {
          ...userSlice.actions,
        },
        dispatch
      ),
    [dispatch]
  )
}

export default useUserActions
