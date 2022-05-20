import { useQuery } from "react-query"

import bookApi from "api/books-api"

const useBooksQuery = () => {
  return useQuery("books", bookApi.getBooks)
}

export default useBooksQuery
