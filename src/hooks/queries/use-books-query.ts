import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"

import bookApi from "api/books-api"
import useBookActions from "hooks/redux/use-book-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"

const useBooksQuery = () => {
  const { selectedCategory, pageFilter, search } = useTypedSelector(
    (state) => state.book
  )
  const { setTotalBooks } = useBookActions()
  const [debounceSearch] = useDebounce(search, 500)
  return useQuery(
    ["books", selectedCategory, pageFilter, debounceSearch],
    () =>
      bookApi.getBooks({
        category: selectedCategory,
        pageFilter,
        search: debounceSearch,
      }),
    {
      suspense: true,
      keepPreviousData: true,
      onSuccess: (data) => {
        if (data) {
          setTotalBooks(data.totalItems)
        }
      },
    }
  )
}

export default useBooksQuery
