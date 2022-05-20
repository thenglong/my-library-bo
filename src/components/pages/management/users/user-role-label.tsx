import Label, { LabelProps } from "components/label"
import { UserRole } from "typings/api-model"

type UserRoleLabelMap = {
  [key in UserRole]: {
    text: string
    color: LabelProps["color"]
  }
}

interface UserRoleLabelProps {
  role: UserRole
}

const UserRoleLabel = ({ role }: UserRoleLabelProps) => {
  const map: UserRoleLabelMap = {
    [UserRole.ADMIN]: {
      text: "Administrator",
      color: "error",
    },
    [UserRole.LIBRARIAN]: {
      text: "Library Manager",
      color: "warning",
    },
    [UserRole.CUSTOMER]: {
      text: "Customer",
      color: "info",
    },
  }

  const { text, color } = map[role]

  return (
    <Label sx={{ whiteSpace: "nowrap" }} color={color}>
      {text}
    </Label>
  )
}

export default UserRoleLabel
