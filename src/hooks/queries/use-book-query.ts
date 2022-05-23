import { useQuery } from "react-query"

import bookApi from "api/books-api"
import { Book } from "typings/api-model"

const useBookQuery = (id: Book["id"]) => {
  return useQuery(["book", id], () => bookApi.getBookById(id))
}

export default useBookQuery
