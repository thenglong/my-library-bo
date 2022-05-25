import api from "api/_api"
import "./mock-books"
import {
  Book,
  Book_Category,
  Pageable,
  PageFilterable,
} from "typings/api-model"

interface GetBooks {
  category?: Book_Category | ""
  pageFilter: PageFilterable
  search: string
}

const getBooks = async (params: GetBooks) => {
  const res = await api.get<Pageable<Book>>("/api/v1/books", {
    params,
  })
  return res.data
}

const getBookById = async (id: Book["id"]) => {
  const res = await api.get<Book>(`/api/v1/books/:id`, {
    params: { id },
  })
  return res.data
}

const bookApi = {
  getBooks,
  getBookById,
}

export default bookApi
