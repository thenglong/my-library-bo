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

export interface User {
  id: Id
  email: string
}
