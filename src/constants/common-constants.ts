import { PageFilterable } from "typings/api-model"

export const DEFAULT_FILTER: PageFilterable = {
  perPage: 10,
  page: 1,
}

export enum VIEW_ORIENTATION {
  TABLE = "table",
  GRID = "grid",
}
