import { useQuery } from "react-query"

import libraryApi from "api/libraries-api"
import { Member } from "typings/api-model"

const useMemberQuery = (id: Member["id"]) => {
  return useQuery(["library", id], () => libraryApi.getLibraryById(id))
}

export default useMemberQuery
