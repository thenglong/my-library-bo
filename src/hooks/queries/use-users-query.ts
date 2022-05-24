import { useQuery } from "react-query"

import userApi from "api/users-api"
import { Filterable, UserRole } from "typings/api-model"

const useUsersQuery = (role: UserRole | "all", filter: Filterable) => {
  return useQuery(
    ["users", role, filter],
    () => userApi.getUsers({ role, filter }),
    {
      suspense: false,
      staleTime: 60 * 1000, // 1 minute
    }
  )
}

export default useUsersQuery
