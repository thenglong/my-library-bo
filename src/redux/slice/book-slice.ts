import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { DEFAULT_FILTER, VIEW_ORIENTATION } from "constants/common-constants"
import { Book, Book_Category, PageFilterable } from "typings/api-model"

export type BookCategoryOptions = Book_Category | ""

export interface BookState {
  search: string
  selectedCategory: BookCategoryOptions
  pageFilter: PageFilterable
  viewOrientation: VIEW_ORIENTATION
  selectedBookIds: Book["id"][]
  totalBooks: number
  isConfirmDeleteModalOpen: boolean
}

const initialState: BookState = {
  search: "",
  pageFilter: DEFAULT_FILTER,
  selectedCategory: "",
  viewOrientation: VIEW_ORIENTATION.TABLE,
  selectedBookIds: [],
  totalBooks: 0,
  isConfirmDeleteModalOpen: false,
}

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    changeViewOrientation: (state, action: PayloadAction<VIEW_ORIENTATION>) => {
      state.viewOrientation = action.payload
    },
    changeCategory: (state, action: PayloadAction<BookCategoryOptions>) => {
      state.selectedCategory = action.payload
      state.selectedBookIds = []
      state.pageFilter = DEFAULT_FILTER
    },
    toggleSelectAllBooks: (state, action: PayloadAction<Book["id"][]>) => {
      state.selectedBookIds = state.selectedBookIds.length ? [] : action.payload
    },
    toggleSelectABook: (state, action: PayloadAction<Book["id"]>) => {
      const { selectedBookIds } = state
      const index = selectedBookIds.indexOf(action.payload)
      if (index > -1) {
        selectedBookIds.splice(index, 1)
      } else {
        selectedBookIds.push(action.payload)
      }
      state.selectedBookIds = selectedBookIds
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
    setTotalBooks: (state, action: PayloadAction<number>) => {
      state.totalBooks = action.payload
    },
    openConfirmDeleteModal: (state) => {
      state.isConfirmDeleteModalOpen = true
    },
    closeConfirmDeleteModal: (state) => {
      state.isConfirmDeleteModalOpen = false
    },
  },
})

export default bookSlice
