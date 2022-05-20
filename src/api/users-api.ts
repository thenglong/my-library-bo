import api from "api/_api"
import "./mock-users"
import { User } from "typings/api-model"

const getUsers = async () => {
  const res = await api.get<User[]>("/api/v1/users")
  return res.data
}

const getUserById = async (id: string | number) => {
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
