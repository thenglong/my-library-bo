// eslint-disable-next-line import/no-unresolved
import { faker } from "@faker-js/faker" // TODO: why is this not working?

import { mock } from "api/_api"
import { Book, Book_Category, PageFilterable } from "typings/api-model"
import { makePageable } from "utils/api-utils"
import { getRandomInt } from "utils/number-utils"

let idCounter = 1
const getBookId = () => idCounter++

const languages = ["English", "French", "Khmer", "Spanish"]
const allCategories = [
  Book_Category.NON_FICTION,
  Book_Category.FICTION,
  Book_Category.POETRY,
  Book_Category.SCIENCE,
]

const getRandomLanguage = () => languages[getRandomInt(0, languages.length - 1)]
const getRandomCategory = () => {
  const categories: string[] = new Array(getRandomInt(1, 3))
    .fill(null)
    .map(() => allCategories[getRandomInt(0, allCategories.length - 1)])

  // this is a hack to make sure we don't get duplicates
  return Array.from(new Set(categories))
}

export const books: Book[] = new Array(100).fill(0).map(() => {
  const coverNumber = getRandomInt(1, 15)
  const titleWordCount = getRandomInt(3, 10)
  const book: Book = {
    id: getBookId(),
    title: faker.lorem.sentence(titleWordCount),
    categories: getRandomCategory(),
    year: getRandomInt(1874, 1877),
    author: faker.name.findName(),
    country: faker.address.country(),
    inStock: getRandomInt(0, 10),
    coverImageUrl: `mock-assets/book-covers/${coverNumber}.jpg`,
    language: getRandomLanguage(),
    pages: getRandomInt(100, 1000),
    description: faker.lorem.paragraph(),
    lastRentalDate: faker.date.recent(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
  return book
})

mock.onGet("/api/v1/books").reply((config) => {
  const category = config.params.category as Book_Category | "all"
  const pageFilter = config.params.pageFilter as PageFilterable
  const search = config.params.search as string

  let bookResult: Book[] = books
  if (category && category.toLowerCase() !== "all") {
    bookResult = books.filter((book) => book.categories?.includes(category))
  }

  if (search) {
    const searchStr = search.toLowerCase()
    bookResult = bookResult.filter((user) => {
      return (
        user.title.toLowerCase().includes(searchStr) ||
        user.author.toLowerCase().includes(searchStr) ||
        user.country?.toLowerCase().includes(searchStr)
      )
    })
  }

  const bookPageable = makePageable<Book>(
    bookResult,
    pageFilter.perPage,
    pageFilter.page
  )

  return [200, bookPageable]
})

mock.onGet("/api/v1/books/:id").reply((config) => {
  const { id } = config.params
  const book = books.find((book) => book.id === +id)
  return [200, book]
})
