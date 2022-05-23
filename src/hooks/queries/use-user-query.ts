import { useQuery } from "react-query"

import userApi from "api/users-api"
import { Book } from "typings/api-model"

const useUserQuery = (id: Book["id"]) => {
  return useQuery(["user", id], () => userApi.getUserById(id))
}

export default useUserQuery
