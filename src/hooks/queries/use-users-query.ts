import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"

import userApi from "api/users-api"
import { useTypedSelector } from "hooks/redux/use-typed-selector"
import useUserActions from "hooks/redux/use-user-actions"

const useUsersQuery = () => {
  const { selectedRole, pageFilter, search } = useTypedSelector(
    (state) => state.user
  )
  const { setTotalUsers } = useUserActions()

  const [debounceSearch] = useDebounce(search, 500)

  return useQuery(
    ["users", selectedRole, pageFilter, debounceSearch],
    () =>
      userApi.getUsers({
        role: selectedRole,
        pageFilter,
        search: debounceSearch,
      }),
    {
      suspense: true,
      keepPreviousData: true,
      onSuccess: (data) => {
        if (data) {
          setTotalUsers(data.totalItems)
        }
      },
    }
  )
}

export default useUsersQuery
