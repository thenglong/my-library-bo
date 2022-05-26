export interface PageFilterable {
  page?: number
  perPage?: number
}

export interface Pageable<T> {
  items: T[]
  currentPage: number
  perPage: number
  totalItems: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
  nextPage: number | null
  previousPage: number | null
}

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
  phone?: string
  role: UserRole
  description: string
  jobTitle?: string
  createdAt: string | Date
  updatedAt: string | Date
}

export enum Book_Category {
  FICTION = "Fiction",
  NON_FICTION = "Non-Fiction",
  POETRY = "Poetry",
  SCIENCE = "Science",
}

export interface Book {
  id: Id
  title: string
  author: string
  country: string
  coverImageUrl: string
  language: string
  description?: string
  pages: number
  year: number
  categories?: string[]
  createdAt: string | Date
  updatedAt: string | Date
  lastRentalDate?: string | Date
}

export enum LibraryStatus {
  APPROVED = "approved",
  PENDING = "pending",
  REJECTED = "rejected",
}

export interface Library {
  id: Id
  name: string
  address: string
  description: string
  logoUrl: string
  status: LibraryStatus
  phone: string
  createdAt: string | Date
  updatedAt: string | Date
}

export enum MemberStatus {
  EXPIRED = "expired",
  ACTIVE = "active",
}

export interface Member {
  id: Id
  libraryId: Id
  library: Library
  userId: Id
  user: User
  status: MemberStatus
  startDate: Date | string
  endDate: Date | string
  createdAt: string | Date
  updatedAt: string | Date
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
