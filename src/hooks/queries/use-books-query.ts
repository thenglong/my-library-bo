import { useQuery } from "react-query"

import sampleBooks from "data/books"

const fetchBooks = () => {
  return Promise.resolve(sampleBooks)
}

const useBooksQuery = () => {
  return useQuery("books", fetchBooks, {
    suspense: true,
  })
}

export default useBooksQuery
