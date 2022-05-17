import { ComponentProps } from "react"

import Label from "components/label"

type BookStatus = "available" | "unavailable"

type BookStatusMap = {
  [key in BookStatus]: {
    text: string
    color: ComponentProps<typeof Label>["color"]
  }
}

const bookStatusMap: BookStatusMap = {
  available: {
    text: "Available",
    color: "info",
  },
  unavailable: {
    text: "Unavailable",
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
