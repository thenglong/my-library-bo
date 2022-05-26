import Label, { LabelProps } from "components/label"
import { LibraryStatus } from "typings/api-model"

type LibraryStatusLabelMap = {
  [key in LibraryStatus]: {
    text: string
    color: LabelProps["color"]
  }
}

interface LibraryStatusLabelProps {
  status: LibraryStatus
}

const LibraryStatusLabel = ({ status }: LibraryStatusLabelProps) => {
  const map: LibraryStatusLabelMap = {
    [LibraryStatus.APPROVED]: {
      text: "Approve",
      color: "info",
    },
    [LibraryStatus.PENDING]: {
      text: "Pending",
      color: "warning",
    },
    [LibraryStatus.REJECTED]: {
      text: "Rejected",
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

export default LibraryStatusLabel
