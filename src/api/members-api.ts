import api from "api/_api"
import "./mock-members"
import {
  Member,
  MemberStatus,
  Pageable,
  PageFilterable,
} from "typings/api-model"

interface GetMembers {
  status?: MemberStatus | "all"
  pageFilter: PageFilterable
  search: string
}

const getMembers = async (params: GetMembers) => {
  const res = await api.get<Pageable<Member>>("/api/v1/members", {
    params: params,
  })
  return res.data
}

const getMemberById = async (id: Member["id"]) => {
  const res = await api.get<Member>(`/api/v1/members/:id`, {
    params: { id },
  })
  return res.data
}

const memberApi = {
  getMembers,
  getMemberById,
}

export default memberApi
