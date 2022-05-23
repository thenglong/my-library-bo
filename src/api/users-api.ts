import api from "api/_api"
import "./mock-users"
import { User, UserRole } from "typings/api-model"

interface GetUserParams {
  role: UserRole | "all"
}

const getUsers = async ({ role }: GetUserParams) => {
  const res = await api.get<User[]>("/api/v1/users", {
    params: { role },
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
