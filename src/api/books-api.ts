import api from "api/_api"
import "./mock-books"
import { Book } from "typings/api-model"

const getBooks = async () => {
  const res = await api.get<Book[]>("/api/v1/books")
  return res.data
}

const getBookById = async (id: string | number) => {
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
