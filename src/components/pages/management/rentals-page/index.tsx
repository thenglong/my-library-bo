import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import RentalResults from "components/pages/management/rentals-page/rental-results"
import RentalsPageHeader from "components/pages/management/rentals-page/rentals-page-header"

const ManagementRentalsPage = () => {
  return (
    <>
      <Helmet>
        <title>Rental - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <RentalsPageHeader />
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
          <RentalResults />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementRentalsPage
