import { useQuery } from "react-query"

import userApi from "api/users-api"

const useUsersQuery = () => {
  return useQuery("users", userApi.getUsers)
}

export default useUsersQuery
