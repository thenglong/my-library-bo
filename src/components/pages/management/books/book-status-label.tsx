import { ComponentProps } from "react"

import Label from "components/label"

type BookStatus = "inStock" | "outOfStock"

type BookStatusMap = {
  [key in BookStatus]: {
    text: string
    color: ComponentProps<typeof Label>["color"]
  }
}

const bookStatusMap: BookStatusMap = {
  inStock: {
    text: "In Stock",
    color: "info",
  },
  outOfStock: {
    text: "Out of Stock",
    color: "error",
  },
}

interface BookStatusLabelProps {
  bookStatus: BookStatus
}

const BookStatusLabel = ({ bookStatus }: BookStatusLabelProps) => {
  const { text, color } = bookStatusMap[bookStatus]

  return <Label color={color}>{text}</Label>
}

export default BookStatusLabel
