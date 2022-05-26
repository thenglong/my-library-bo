import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { DEFAULT_FILTER, VIEW_ORIENTATION } from "constants/common-constants"
import { PageFilterable, Rental, RentalStatus } from "typings/api-model"

export type RentalStatusOptions = RentalStatus | "all"

export interface RentalState {
  search: string
  selectedStatus: RentalStatusOptions
  pageFilter: PageFilterable
  viewOrientation: VIEW_ORIENTATION
  selectedRentalIds: Rental["id"][]
  totalRentals: number
  isConfirmDeleteModalOpen: boolean
}

const initialState: RentalState = {
  search: "",
  pageFilter: DEFAULT_FILTER,
  selectedStatus: "all",
  viewOrientation: VIEW_ORIENTATION.TABLE,
  selectedRentalIds: [],
  totalRentals: 0,
  isConfirmDeleteModalOpen: false,
}

const rentalSlice = createSlice({
  name: "rental",
  initialState,
  reducers: {
    changeViewOrientation: (state, action: PayloadAction<VIEW_ORIENTATION>) => {
      state.viewOrientation = action.payload
    },
    changeRole: (state, action: PayloadAction<RentalStatusOptions>) => {
      state.selectedStatus = action.payload
      state.selectedRentalIds = []
      state.pageFilter = DEFAULT_FILTER
    },
    toggleSelectAllRentals: (state, action: PayloadAction<Rental["id"][]>) => {
      state.selectedRentalIds = state.selectedRentalIds.length
        ? []
        : action.payload
    },
    toggleSelectARental: (state, action: PayloadAction<Rental["id"]>) => {
      const { selectedRentalIds } = state
      const index = selectedRentalIds.indexOf(action.payload)
      if (index > -1) {
        selectedRentalIds.splice(index, 1)
      } else {
        selectedRentalIds.push(action.payload)
      }
      state.selectedRentalIds = selectedRentalIds
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.pageFilter.page = action.payload
    },
    changeRowsPerPage: (state, action: PayloadAction<number>) => {
      state.pageFilter.perPage = action.payload
    },
    changeSearch: (state, action: PayloadAction<string>) => {
      state.pageFilter.page = 1
      state.search = action.payload
    },
    setTotalRentals: (state, action: PayloadAction<number>) => {
      state.totalRentals = action.payload
    },
    openConfirmDeleteModal: (state) => {
      state.isConfirmDeleteModalOpen = true
    },
    closeConfirmDeleteModal: (state) => {
      state.isConfirmDeleteModalOpen = false
    },
  },
})

export default rentalSlice
