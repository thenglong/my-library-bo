import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"

import rentalsApi from "api/rentals-api"
import useRentalActions from "hooks/redux/use-rental-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"

const useRentalsQuery = () => {
  const { selectedStatus, pageFilter, search } = useTypedSelector(
    (state) => state.rental
  )
  const { setTotalRentals } = useRentalActions()

  const [debounceSearch] = useDebounce(search, 500)

  return useQuery(
    ["rentals", selectedStatus, pageFilter, debounceSearch],
    () =>
      rentalsApi.getRentals({
        status: selectedStatus,
        pageFilter,
        search: debounceSearch,
      }),
    {
      suspense: true,
      keepPreviousData: true,
      onSuccess: (data) => {
        if (data) {
          setTotalRentals(data.totalItems)
        }
      },
    }
  )
}

export default useRentalsQuery
