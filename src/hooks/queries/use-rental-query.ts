import { useQuery } from "react-query"

import rentalsApi from "api/rentals-api"
import { Rental } from "typings/api-model"

const useRenalQuery = (id: Rental["id"]) => {
  return useQuery(["rental", id], () => rentalsApi.getRentalById(id))
}

export default useRenalQuery
