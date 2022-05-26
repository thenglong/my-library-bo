import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { DEFAULT_FILTER, VIEW_ORIENTATION } from "constants/common-constants"
import { Member, MemberStatus, PageFilterable } from "typings/api-model"

export type MemberStatusOptions = MemberStatus | "all"

export interface MemberState {
  search: string
  selectedStatus: MemberStatusOptions
  pageFilter: PageFilterable
  viewOrientation: VIEW_ORIENTATION
  selectedMemberIds: Member["id"][]
  totalMembers: number
  isConfirmDeleteModalOpen: boolean
}

const initialState: MemberState = {
  search: "",
  pageFilter: DEFAULT_FILTER,
  selectedStatus: "all",
  viewOrientation: VIEW_ORIENTATION.TABLE,
  selectedMemberIds: [],
  totalMembers: 0,
  isConfirmDeleteModalOpen: false,
}

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    changeViewOrientation: (state, action: PayloadAction<VIEW_ORIENTATION>) => {
      state.viewOrientation = action.payload
    },
    changeRole: (state, action: PayloadAction<MemberStatusOptions>) => {
      state.selectedStatus = action.payload
      state.selectedMemberIds = []
      state.pageFilter = DEFAULT_FILTER
    },
    toggleSelectAllMembers: (state, action: PayloadAction<Member["id"][]>) => {
      state.selectedMemberIds = state.selectedMemberIds.length
        ? []
        : action.payload
    },
    toggleSelectAMember: (state, action: PayloadAction<Member["id"]>) => {
      const { selectedMemberIds } = state
      const index = selectedMemberIds.indexOf(action.payload)
      if (index > -1) {
        selectedMemberIds.splice(index, 1)
      } else {
        selectedMemberIds.push(action.payload)
      }
      state.selectedMemberIds = selectedMemberIds
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
    setTotalMembers: (state, action: PayloadAction<number>) => {
      state.totalMembers = action.payload
    },
    openConfirmDeleteModal: (state) => {
      state.isConfirmDeleteModalOpen = true
    },
    closeConfirmDeleteModal: (state) => {
      state.isConfirmDeleteModalOpen = false
    },
  },
})

export default memberSlice
