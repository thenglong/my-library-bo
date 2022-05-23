import { useCallback, useState } from "react"

import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import UserResults, {
  UserRoleOptions,
} from "components/pages/management/users/user-results"
import UsersPageHeader from "components/pages/management/users/users-page-header"
import useUsersQuery from "hooks/queries/use-users-query"

const ManagementUsers = () => {
  const [role, setRole] = useState<UserRoleOptions>("all")
  const { data } = useUsersQuery(role)

  const handleChangeRole = useCallback((role: UserRoleOptions) => {
    setRole(role)
  }, [])

  return (
    <>
      <Helmet>
        <title>Users - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <UsersPageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <UserResults
            users={data || []}
            selectedRole={role}
            onRoleChange={handleChangeRole}
          />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementUsers
