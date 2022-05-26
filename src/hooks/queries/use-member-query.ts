import { useQuery } from "react-query"

import memberApi from "api/members-api"
import { Member } from "typings/api-model"

const useMemberQuery = (id: Member["id"]) => {
  return useQuery(["member", id], () => memberApi.getMemberById(id))
}

export default useMemberQuery
