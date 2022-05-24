import { useCallback, useDeferredValue, useState } from "react"

import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import UserResults, {
  UserRoleOptions,
} from "components/pages/management/users/user-results"
import UsersPageHeader from "components/pages/management/users/users-page-header"
import useUsersQuery from "hooks/queries/use-users-query"
import { Filterable } from "typings/api-model"

const DEFAULT_FILTER: Filterable = {
  perPage: 10,
  page: 1,
  search: "",
}

const ManagementUsers = () => {
  const [filter, setFilter] = useState<Filterable>(DEFAULT_FILTER)
  const [role, setRole] = useState<UserRoleOptions>("all")
  const { data } = useUsersQuery(role, filter)
  const users = useDeferredValue(data?.items || [])

  const handleChangeRole = useCallback((role: UserRoleOptions) => {
    setRole(role)
    setFilter(DEFAULT_FILTER)
  }, [])

  const handlePageChange = useCallback(
    (page: number) => {
      setFilter({ ...filter, page })
    },
    [filter]
  )

  const handleChangeRolePerPage = useCallback(
    (perPage: number) => {
      setFilter({ ...filter, perPage })
    },
    [filter]
  )

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
            users={users}
            selectedRole={role}
            onRoleChange={handleChangeRole}
            onPageChange={handlePageChange}
            perPage={filter.perPage || 10}
            page={filter.page || 1}
            onRowsPerPageChange={handleChangeRolePerPage}
            totalUsers={data?.totalItems || 0}
          />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementUsers
