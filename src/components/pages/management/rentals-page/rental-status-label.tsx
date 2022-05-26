import Label, { LabelProps } from "components/label"
import { RentalStatus } from "typings/api-model"

type RentalStatusLabelMap = {
  [key in RentalStatus]: {
    text: string
    color: LabelProps["color"]
  }
}

interface RentalStatusLabelProps {
  status: RentalStatus
}

const RentalStatusLabel = ({ status }: RentalStatusLabelProps) => {
  const map: RentalStatusLabelMap = {
    [RentalStatus.RETURNED]: {
      text: "Returned",
      color: "info",
    },
    [RentalStatus.PROGRESS]: {
      text: "In Progress",
      color: "warning",
    },
    [RentalStatus.PUNISHED]: {
      text: "Punished",
      color: "error",
    },
  }

  const { text, color } = map[status]

  return (
    <Label sx={{ whiteSpace: "nowrap" }} color={color}>
      {text}
    </Label>
  )
}

export default RentalStatusLabel
