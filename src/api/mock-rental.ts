// eslint-disable-next-line import/no-unresolved
import { faker } from "@faker-js/faker" // TODO: why is this not working?

import { books } from "api/mock-books"
import { users } from "api/mock-users"
import {
  Book,
  PageFilterable,
  Rental,
  RentalStatus,
  User,
} from "typings/api-model"
import { makePageable } from "utils/api-utils"
import { getRandomInt } from "utils/number-utils"

import { mock } from "./_api"

let idCounter = 1
const getRentalId = () => idCounter++

const statuses = [
  RentalStatus.PROGRESS,
  RentalStatus.PUNISHED,
  RentalStatus.RETURNED,
]
const getRandomStatus = () => {
  return statuses[getRandomInt(0, statuses.length - 1)]
}

const getRandomUserInfo = () => {
  const userId = getRandomInt(1, users.length)
  return {
    userId,
    user: users.find((u) => u.id === userId) as User,
  }
}

const getRandomBookInfo = () => {
  const bookId = getRandomInt(1, books.length)
  return {
    bookId: bookId,
    book: books.find((b) => b.id === bookId) as Book,
  }
}

const rentals: Rental[] = new Array(100).fill(0).map(() => {
  const rental: Rental = {
    id: getRentalId(),
    ...getRandomUserInfo(),
    ...getRandomBookInfo(),
    price: getRandomInt(1, 100),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    finePerDay: getRandomInt(1, 109),
    status: getRandomStatus(),
    isReturned: faker.datatype.boolean(),
    returnedAt: faker.date.past(),
    startDate: faker.date.past(),
    endDate: faker.date.future(),
  }
  return rental
})

mock.onGet("/api/v1/rentals").reply((config) => {
  const status = config.params.status as RentalStatus | "all"
  const pageFilter = config.params.pageFilter as PageFilterable
  const search = config.params.search as string

  let rentalResults: Rental[] = rentals
  if (status && status !== "all") {
    rentalResults = rentals.filter((member) => member.status === status)
  }

  if (search) {
    const searchStr = search.toLowerCase()
    rentalResults = rentalResults.filter((rental) => {
      return (
        rental.user.name.toLowerCase().includes(searchStr) ||
        rental.user.email.toLowerCase().includes(searchStr) ||
        rental.user.jobTitle?.toLowerCase().includes(searchStr) ||
        rental.user.address.toLowerCase().includes(searchStr) ||
        rental.user.description.toLowerCase().includes(searchStr) ||
        rental.book.title.toLowerCase().includes(searchStr)
      )
    })
  }

  const rentalPageable = makePageable<Rental>(
    rentalResults,
    pageFilter.perPage,
    pageFilter.page
  )

  return [200, rentalPageable]
})

mock.onGet("/api/v1/rentals/:id").reply((config) => {
  const { id } = config.params
  const member = rentals.find((rental) => rental.id === +id)
  return [200, member]
})
