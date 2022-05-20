import { useQuery } from "react-query"

import bookApi from "api/books-api"

const useBookQuery = (id: number | string) => {
  return useQuery(["book", id], () => bookApi.getBookById(id))
}

export default useBookQuery
