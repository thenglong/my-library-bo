import { Pageable } from "typings/api-model"

export const makePageable = <T>(
  totalResult: T[],
  perPage = 10,
  currentPage = 1
): Pageable<T> => {
  const hasNext = totalResult.length > perPage * currentPage
  const nextPage = hasNext ? currentPage + 1 : null
  const hasPrevious =
    currentPage > 1 && totalResult.length > perPage * (currentPage - 1)
  const previousPage = hasPrevious ? currentPage - 1 : null

  return {
    items: totalResult.slice(
      perPage * (currentPage - 1),
      perPage * currentPage
    ),
    currentPage: currentPage,
    hasNext,
    hasPrevious,
    perPage,
    totalItems: totalResult.length,
    totalPages: Math.ceil(totalResult.length / perPage),
    nextPage,
    previousPage,
  }
}
