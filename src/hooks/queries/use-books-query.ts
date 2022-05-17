import { useQuery } from "react-query"

import sampleBooks from "data/sample-books"
import wait from "utils/wait"

const fetchBooks = async () => {
  await wait(800) // simulate api call
  return Promise.resolve(sampleBooks.slice(0, 10))
}

const useBooksQuery = () => {
  return useQuery("books", fetchBooks, {
    suspense: true,
  })
}

export default useBooksQuery
