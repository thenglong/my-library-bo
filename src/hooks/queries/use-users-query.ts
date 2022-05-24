import { useQuery } from "react-query"

import userApi from "api/users-api"
import useActions from "hooks/redux/use-actions"
import { Filterable, UserRole } from "typings/api-model"

const useUsersQuery = (role: UserRole | "all", filter: Filterable) => {
  const { setTotalUsers } = useActions()
  return useQuery(
    ["users", role, filter],
    () => userApi.getUsers({ role, filter }),
    {
      suspense: false,
      staleTime: 60 * 1000, // 1 minute
      onSuccess: (data) => {
        if (data) {
          setTotalUsers(data.totalItems)
        }
      },
    }
  )
}

export default useUsersQuery
