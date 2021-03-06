// eslint-disable-next-line import/no-unresolved
import { faker } from "@faker-js/faker" // TODO: why is this not working?
import khmerGenerator from "khmer-name-generator"

import { PageFilterable, User, UserRole } from "typings/api-model"
import { makePageable } from "utils/api-utils"
import { getRandomInt } from "utils/number-utils"

import { mock } from "./_api"

let idCounter = 1
const getUserId = () => idCounter++

const roles = [UserRole.ADMIN, UserRole.LIBRARIAN, UserRole.CUSTOMER]
const getRandomRoles = () => {
  return roles[getRandomInt(0, roles.length - 1)]
}

export const users: User[] = new Array(100).fill(0).map(() => {
  const avatarNumber = getRandomInt(1, 5)
  const user: User = {
    avatar: `/mock-assets/user-avatars/${avatarNumber}.jpg`,
    description: faker.lorem.sentence(),
    id: getUserId(),
    name: khmerGenerator.name.getRandomName(),
    email: faker.internet.email(),
    role: getRandomRoles(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetAddress(),
    jobTitle: faker.name.jobType(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
  return user
})

mock.onGet("/api/v1/users").reply((config) => {
  const role = config.params.role as UserRole | "all"
  const pageFilter = config.params.pageFilter as PageFilterable
  const search = config.params.search as string

  let userResult: User[] = users
  if (role && role !== "all") {
    userResult = users.filter((user) => user.role === role)
  }

  if (search) {
    const searchStr = search.toLowerCase()
    userResult = userResult.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchStr) ||
        user.email.toLowerCase().includes(searchStr) ||
        user.jobTitle?.toLowerCase().includes(searchStr) ||
        user.address.toLowerCase().includes(searchStr) ||
        user.description.toLowerCase().includes(searchStr)
      )
    })
  }

  const userPageable = makePageable<User>(
    userResult,
    pageFilter.perPage,
    pageFilter.page
  )

  return [200, userPageable]
})

mock.onGet("/api/v1/users/:id").reply((config) => {
  const { id } = config.params
  const user = users.find((user) => user.id === +id)
  return [200, user]
})
