import Label, { LabelProps } from "components/label"
import { MemberStatus } from "typings/api-model"

type MemberStatusLabelMap = {
  [key in MemberStatus]: {
    text: string
    color: LabelProps["color"]
  }
}

interface MemberStatusLabelProps {
  status: MemberStatus
}

const MemberStatusLabel = ({ status }: MemberStatusLabelProps) => {
  const map: MemberStatusLabelMap = {
    [MemberStatus.ACTIVE]: {
      text: "Active",
      color: "info",
    },
    [MemberStatus.EXPIRED]: {
      text: "Expired",
      color: "warning",
    },
  }

  const { text, color } = map[status]

  return (
    <Label sx={{ whiteSpace: "nowrap" }} color={color}>
      {text}
    </Label>
  )
}

export default MemberStatusLabel
