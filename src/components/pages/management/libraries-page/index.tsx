import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import LibrariesPageHeader from "components/pages/management/libraries-page/libraries-page-header"
import LibraryResults from "components/pages/management/libraries-page/library-results"

const ManagementLibrariesPage = () => {
  return (
    <>
      <Helmet>
        <title>Library - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <LibrariesPageHeader />
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
          <LibraryResults />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementLibrariesPage
