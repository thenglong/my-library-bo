import api from "api/_api"
import "./mock-rental"
import {
  Pageable,
  PageFilterable,
  Rental,
  RentalStatus,
} from "typings/api-model"

interface GetRentals {
  status?: RentalStatus | "all"
  pageFilter: PageFilterable
  search: string
}

const getRentals = async (params: GetRentals) => {
  const res = await api.get<Pageable<Rental>>("/api/v1/rentals", {
    params: params,
  })
  return res.data
}

const getRentalById = async (id: Rental["id"]) => {
  const res = await api.get<Rental>(`/api/v1/rentals/:id`, {
    params: { id },
  })
  return res.data
}

const memberApi = {
  getRentals,
  getRentalById,
}

export default memberApi
