type Id = number | string

export enum UserRole {
  ADMIN = "admin",
  LIBRARIAN = "librarian",
  CUSTOMER = "customer",
}

export interface User {
  id: Id
  name: string
  avatar: string
  email: string
  address: string
  role: UserRole
  description: string
}

export interface Book {
  id: Id
  title: string
  author: string
  country: string
  imageLink: string
  language: string
  link: string
  pages: number
  year: number
}

export type InvoiceStatus = "pending" | "completed" | "draft" | "progress"

export interface Invoice {
  id: Id
  number: string
  issuedDate: number // unix timestamp
  dueDate: number // unix timestamp
  clientName: string
  clientAvatar: string
  amount: number
  currency: "$" | "៛"
  status: InvoiceStatus
}
