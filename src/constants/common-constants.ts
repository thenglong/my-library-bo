import { Filterable } from "typings/api-model"

export const DEFAULT_FILTER: Filterable = {
  perPage: 10,
  page: 1,
  search: "",
}

export enum VIEW_ORIENTATION {
  TABLE = "table",
  GRID = "grid",
}
