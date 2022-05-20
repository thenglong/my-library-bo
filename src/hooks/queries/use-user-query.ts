import { useQuery } from "react-query"

import userApi from "api/users-api"

const useUserQuery = (id: string | number) => {
  return useQuery(["user", id], () => userApi.getUserById(id))
}

export default useUserQuery
