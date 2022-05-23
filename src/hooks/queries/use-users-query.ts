import { useQuery } from "react-query"

import userApi from "api/users-api"
import { UserRole } from "typings/api-model"

const useUsersQuery = (role: UserRole | "all") => {
  return useQuery(["users", role], () => userApi.getUsers({ role }), {
    suspense: false,
    staleTime: 60 * 1000, // 1 minute
  })
}

export default useUsersQuery
