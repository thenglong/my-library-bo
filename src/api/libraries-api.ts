import api from "api/_api"
import "./mock-libraries"
import {
  Library,
  LibraryStatus,
  Pageable,
  PageFilterable,
} from "typings/api-model"

interface GetLibraries {
  status?: LibraryStatus | "all"
  pageFilter: PageFilterable
  search: string
}

const getLibraries = async (params: GetLibraries) => {
  const res = await api.get<Pageable<Library>>("/api/v1/libraries", {
    params: params,
  })
  return res.data
}

const getLibraryById = async (id: Library["id"]) => {
  const res = await api.get<Library>(`/api/v1/libraries/:id`, {
    params: { id },
  })
  return res.data
}

const libraryApi = {
  getLibraries,
  getLibraryById,
}

export default libraryApi
