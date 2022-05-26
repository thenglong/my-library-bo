// eslint-disable-next-line import/no-unresolved
import { faker } from "@faker-js/faker" // TODO: why is this not working?

import { libraries } from "api/mock-libraries"
import { users } from "api/mock-users"
import {
  Library,
  Member,
  MemberStatus,
  PageFilterable,
  User,
} from "typings/api-model"
import { makePageable } from "utils/api-utils"
import { getRandomInt } from "utils/number-utils"

import { mock } from "./_api"

let idCounter = 1
const getMemberId = () => idCounter++

const statuses = [MemberStatus.ACTIVE, MemberStatus.EXPIRED]
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

const getRandomLibraryInfo = () => {
  const libraryId = getRandomInt(1, users.length)
  return {
    libraryId,
    library: libraries.find((l) => l.id === libraryId) as Library,
  }
}

const members: Member[] = new Array(100).fill(0).map(() => {
  const member: Member = {
    id: getMemberId(),
    status: getRandomStatus(),
    endDate: faker.date.future(),
    startDate: faker.date.past(),
    ...getRandomLibraryInfo(),
    ...getRandomUserInfo(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  }
  return member
})

mock.onGet("/api/v1/members").reply((config) => {
  const status = config.params.status as MemberStatus | "all"
  const pageFilter = config.params.pageFilter as PageFilterable
  const search = config.params.search as string

  let memberResults: Member[] = members
  if (status && status !== "all") {
    memberResults = members.filter((member) => member.status === status)
  }

  if (search) {
    const searchStr = search.toLowerCase()
    memberResults = memberResults.filter((member) => {
      return (
        member.user.name.toLowerCase().includes(searchStr) ||
        member.user.email.toLowerCase().includes(searchStr) ||
        member.user.jobTitle?.toLowerCase().includes(searchStr) ||
        member.user.address.toLowerCase().includes(searchStr) ||
        member.user.description.toLowerCase().includes(searchStr) ||
        member.library.name.toLowerCase().includes(searchStr)
      )
    })
  }

  const userPageable = makePageable<Member>(
    memberResults,
    pageFilter.perPage,
    pageFilter.page
  )

  return [200, userPageable]
})

mock.onGet("/api/v1/members/:id").reply((config) => {
  const { id } = config.params
  const member = members.find((member) => member.id === +id)
  return [200, member]
})
