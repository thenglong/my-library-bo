import { useDeferredValue } from "react"

import { Box } from "@mui/material"

import MembersTableView from "components/pages/management/members-page/members-table-view"
import ConfirmDeleteUserDialog from "components/pages/management/users/confirm-delete-user-dialog"
import useMembersQuery from "hooks/queries/use-members-query"

const MemberResults = () => {
  const { data } = useMembersQuery()
  const members = useDeferredValue(data?.items || [])

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent={{ xs: "center", sm: "space-between" }}
        pb={3}
      />

      <MembersTableView members={members} />
      <ConfirmDeleteUserDialog />
    </>
  )
}

export default MemberResults
