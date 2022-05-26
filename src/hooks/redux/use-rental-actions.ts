import { useMemo } from "react"

import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import rentalSlice from "redux/slice/rental-slice"
import { AppDispatch } from "redux/store"

const useRentalActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useMemo(
    () =>
      bindActionCreators(
        {
          ...rentalSlice.actions,
        },
        dispatch
      ),
    [dispatch]
  )
}

export default useRentalActions
