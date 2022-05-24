import { useQuery } from "react-query"
import { useDebounce } from "use-debounce"

import userApi from "api/users-api"
import useActions from "hooks/redux/use-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"

const useUsersQuery = () => {
  const { selectedRole, pageFilter, search } = useTypedSelector(
    (state) => state.user
  )
  const { setTotalUsers } = useActions()

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
      suspense: false,
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
