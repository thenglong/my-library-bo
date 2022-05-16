import { useState, useEffect, useCallback } from "react"

import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import PageHeader from "components/pages/management/books/PageHeader"
import Results from "components/pages/management/books/Results"
import useRefMounted from "hooks/use-ref-mounted"
import axios from "utils/axios"

function ManagementProjects() {
  const isMountedRef = useRefMounted()
  const [projects, setProjects] = useState([])

  const getProjects = useCallback(async () => {
    try {
      const response = await axios.get("/api/projects")

      if (isMountedRef.current) {
        setProjects(response.data.projects)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }, [isMountedRef])

  useEffect(() => {
    getProjects()
  }, [getProjects])

  return (
    <>
      <Helmet>
        <title>Projects - Management</title>
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
          <Results projects={projects} />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementProjects
