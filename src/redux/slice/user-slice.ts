import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { DEFAULT_FILTER, VIEW_ORIENTATION } from "constants/common-constants"
import { PageFilterable, User, UserRole } from "typings/api-model"

export type UserRoleOptions = UserRole | "all"

export interface UserState {
  search: string
  selectedRole: UserRoleOptions
  pageFilter: PageFilterable
  viewOrientation: VIEW_ORIENTATION
  selectedUserIds: User["id"][]
  totalUsers: number
  isConfirmDeleteModalOpen: boolean
}

const initialState: UserState = {
  search: "",
  pageFilter: DEFAULT_FILTER,
  selectedRole: "all",
  viewOrientation: VIEW_ORIENTATION.TABLE,
  selectedUserIds: [],
  totalUsers: 0,
  isConfirmDeleteModalOpen: false,
}

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeViewOrientation: (state, action: PayloadAction<VIEW_ORIENTATION>) => {
      state.viewOrientation = action.payload
    },
    changeRole: (state, action: PayloadAction<UserRoleOptions>) => {
      state.selectedRole = action.payload
      state.selectedUserIds = []
      state.pageFilter = DEFAULT_FILTER
    },
    toggleSelectAllUsers: (state, action: PayloadAction<User["id"][]>) => {
      state.selectedUserIds = state.selectedUserIds.length ? [] : action.payload
    },
    toggleSelectAUser: (state, action: PayloadAction<User["id"]>) => {
      const { selectedUserIds } = state
      const index = selectedUserIds.indexOf(action.payload)
      if (index > -1) {
        selectedUserIds.splice(index, 1)
      } else {
        selectedUserIds.push(action.payload)
      }
      state.selectedUserIds = selectedUserIds
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
    setTotalUsers: (state, action: PayloadAction<number>) => {
      state.totalUsers = action.payload
    },
    openConfirmDeleteModal: (state) => {
      state.isConfirmDeleteModalOpen = true
    },
    closeConfirmDeleteModal: (state) => {
      state.isConfirmDeleteModalOpen = false
    },
  },
})

export default userSlice
