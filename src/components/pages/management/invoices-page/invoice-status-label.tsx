import { ComponentProps } from "react"

import Label from "components/label"
import { InvoiceStatus } from "typings/api-model"

type InvoiceStatusMap = {
  [key in InvoiceStatus]: {
    text: string
    color: ComponentProps<typeof Label>["color"]
  }
}

const map: InvoiceStatusMap = {
  pending: {
    text: "Pending Payment",
    color: "warning",
  },
  completed: {
    text: "Completed",
    color: "success",
  },
  draft: {
    text: "Draft",
    color: "info",
  },
  progress: {
    text: "In progress",
    color: "primary",
  },
}

interface BookStatusLabelProps {
  invoiceStatus: InvoiceStatus
}

const InvoiceStatusLabel = ({ invoiceStatus }: BookStatusLabelProps) => {
  const { text, color } = map[invoiceStatus]

  return (
    <Label color={color}>
      <b>{text}</b>
    </Label>
  )
}

export default InvoiceStatusLabel
