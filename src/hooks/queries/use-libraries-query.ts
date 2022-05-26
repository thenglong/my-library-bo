import { useQuery } from "react-query"
import { useDebounce } from "use-debounce"

import libraryApi from "api/libraries-api"
import useLibraryActions from "hooks/redux/use-library-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"

const useLibrariesQuery = () => {
  const { selectedStatus, pageFilter, search } = useTypedSelector(
    (state) => state.library
  )
  const { setTotalLibraries } = useLibraryActions()

  const [debounceSearch] = useDebounce(search, 500)

  return useQuery(
    ["libraries", selectedStatus, pageFilter, debounceSearch],
    () =>
      libraryApi.getLibraries({
        status: selectedStatus,
        pageFilter,
        search: debounceSearch,
      }),
    {
      suspense: true,
      keepPreviousData: true,
      onSuccess: (data) => {
        if (data) {
          setTotalLibraries(data.totalItems)
        }
      },
    }
  )
}

export default useLibrariesQuery
