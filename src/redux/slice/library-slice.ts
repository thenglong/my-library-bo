import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { DEFAULT_FILTER, VIEW_ORIENTATION } from "constants/common-constants"
import { LibraryStatus, Library, PageFilterable } from "typings/api-model"

export type LibraryStatusOptions = LibraryStatus | "all"

export interface LibraryState {
  search: string
  selectedStatus: LibraryStatusOptions
  pageFilter: PageFilterable
  viewOrientation: VIEW_ORIENTATION
  selectedLibraryIds: Library["id"][]
  totalLibraries: number
  isConfirmDeleteModalOpen: boolean
}

const initialState: LibraryState = {
  search: "",
  pageFilter: DEFAULT_FILTER,
  selectedStatus: "all",
  viewOrientation: VIEW_ORIENTATION.TABLE,
  selectedLibraryIds: [],
  totalLibraries: 0,
  isConfirmDeleteModalOpen: false,
}

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    changeViewOrientation: (state, action: PayloadAction<VIEW_ORIENTATION>) => {
      state.viewOrientation = action.payload
    },
    changeRole: (state, action: PayloadAction<LibraryStatusOptions>) => {
      state.selectedStatus = action.payload
      state.selectedLibraryIds = []
      state.pageFilter = DEFAULT_FILTER
    },
    toggleSelectAllLibraries: (
      state,
      action: PayloadAction<Library["id"][]>
    ) => {
      state.selectedLibraryIds = state.selectedLibraryIds.length
        ? []
        : action.payload
    },
    toggleSelectALibrary: (state, action: PayloadAction<Library["id"]>) => {
      const { selectedLibraryIds } = state
      const index = selectedLibraryIds.indexOf(action.payload)
      if (index > -1) {
        selectedLibraryIds.splice(index, 1)
      } else {
        selectedLibraryIds.push(action.payload)
      }
      state.selectedLibraryIds = selectedLibraryIds
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
    setTotalLibraries: (state, action: PayloadAction<number>) => {
      state.totalLibraries = action.payload
    },
    openConfirmDeleteModal: (state) => {
      state.isConfirmDeleteModalOpen = true
    },
    closeConfirmDeleteModal: (state) => {
      state.isConfirmDeleteModalOpen = false
    },
  },
})

export default librarySlice
