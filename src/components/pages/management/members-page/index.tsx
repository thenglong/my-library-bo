import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import MemberResults from "components/pages/management/members-page/member-results"
import MembersPageHeader from "components/pages/management/members-page/members-page-header"

const ManagementMembersPage = () => {
  return (
    <>
      <Helmet>
        <title>Member - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <MembersPageHeader />
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
          <MemberResults />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementMembersPage
