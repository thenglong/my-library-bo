import { useDeferredValue } from "react"

import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import UserResults from "components/pages/management/users/user-results"
import UsersPageHeader from "components/pages/management/users/users-page-header"
import useUsersQuery from "hooks/queries/use-users-query"
import { useTypedSelector } from "hooks/redux/use-typed-selector"

const ManagementUsers = () => {
  const { selectedRole, filter } = useTypedSelector((state) => state.user)
  const { data } = useUsersQuery(selectedRole, filter)
  const users = useDeferredValue(data?.items || [])

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
          <UserResults users={users} />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementUsers
