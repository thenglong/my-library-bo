import api from "api/_api"
import "./mock-users"
import { PageFilterable, Pageable, User, UserRole } from "typings/api-model"

interface GetUsers {
  role?: UserRole | "all"
  pageFilter: PageFilterable
  search: string
}

const getUsers = async (params: GetUsers) => {
  const res = await api.get<Pageable<User>>("/api/v1/users", {
    params: params,
  })
  return res.data
}

const getUserById = async (id: User["id"]) => {
  const res = await api.get<User>(`/api/v1/users/:id`, {
    params: { id },
  })
  return res.data
}

const userApi = {
  getUsers,
  getUserById,
}

export default userApi
