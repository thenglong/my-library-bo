import { useMemo } from "react"

import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import memberSlice from "redux/slice/member-slice"
import { AppDispatch } from "redux/store"

const useMemberActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useMemo(
    () =>
      bindActionCreators(
        {
          ...memberSlice.actions,
        },
        dispatch
      ),
    [dispatch]
  )
}

export default useMemberActions
