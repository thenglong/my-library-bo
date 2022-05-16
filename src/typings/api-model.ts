type Id = number | string

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
