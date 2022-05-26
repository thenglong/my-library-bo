// eslint-disable-next-line import/no-unresolved
import { faker } from "@faker-js/faker" // TODO: why is this not working?

import { Library, LibraryStatus, PageFilterable } from "typings/api-model"
import { makePageable } from "utils/api-utils"
import { getRandomInt } from "utils/number-utils"

import { mock } from "./_api"

let idCounter = 1
const getLibraryId = () => idCounter++

const statuses = [
  LibraryStatus.APPROVED,
  LibraryStatus.REJECTED,
  LibraryStatus.PENDING,
]
const getRandomStatus = () => {
  return statuses[getRandomInt(0, statuses.length - 1)]
}

export const libraries: Library[] = new Array(100).fill(0).map(() => {
  const library: Library = {
    id: getLibraryId(),
    name: "IBC",
    logoUrl: faker.image.imageUrl(),
    address: faker.lorem.sentence(),
    phone: faker.phone.phoneNumber(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    description: faker.lorem.sentence(),
    status: getRandomStatus(),
  }
  return library
})

mock.onGet("/api/v1/libraries").reply((config) => {
  const status = config.params.status as LibraryStatus | "all"
  const pageFilter = config.params.pageFilter as PageFilterable
  const search = config.params.search as string

  let libraryResults: Library[] = libraries
  if (status && status !== "all") {
    libraryResults = libraries.filter((library) => library.status === status)
  }

  if (search) {
    const searchStr = search.toLowerCase()
    libraryResults = libraryResults.filter((library) => {
      return (
        library.name.toLowerCase().includes(searchStr) ||
        library.address.toLowerCase().includes(searchStr) ||
        library.description.toLowerCase().includes(searchStr)
      )
    })
  }

  const userPageable = makePageable<Library>(
    libraryResults,
    pageFilter.perPage,
    pageFilter.page
  )

  return [200, userPageable]
})

mock.onGet("/api/v1/libraries/:id").reply((config) => {
  const { id } = config.params
  const library = libraries.find((library) => +library.id === +id)
  return [200, library]
})
