import { useState, useEffect, useCallback } from "react"

import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import PageHeader from "components/pages/management/Users/PageHeader"
import Results from "components/pages/management/Users/Results"
import useRefMounted from "hooks/use-ref-mounted"
import axios from "utils/axios"

function ManagementUsers() {
  const isMountedRef = useRefMounted()
  const [users, setUsers] = useState([])

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get("/api/users")

      if (isMountedRef.current) {
        setUsers(response.data.users)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }, [isMountedRef])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <>
      <Helmet>
        <title>Users - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
          <Results users={users} />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementUsers
