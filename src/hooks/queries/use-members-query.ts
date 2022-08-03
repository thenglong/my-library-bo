import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"

import memberApi from "api/members-api"
import useMemberActions from "hooks/redux/use-member-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"

const useMembersQuery = () => {
  const { selectedStatus, pageFilter, search } = useTypedSelector(
    (state) => state.member
  )
  const { setTotalMembers } = useMemberActions()

  const [debounceSearch] = useDebounce(search, 500)

  return useQuery(
    ["members", selectedStatus, pageFilter, debounceSearch],
    () =>
      memberApi.getMembers({
        status: selectedStatus,
        pageFilter,
        search: debounceSearch,
      }),
    {
      suspense: true,
      keepPreviousData: true,
      onSuccess: (data) => {
        if (data) {
          setTotalMembers(data.totalItems)
        }
      },
    }
  )
}

export default useMembersQuery
