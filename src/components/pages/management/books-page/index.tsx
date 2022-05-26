import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import BookPageHeader from "components/pages/management/books-page/book-page-header"
import BookResults from "components/pages/management/books-page/book-results"

const BookPage = () => {
  return (
    <>
      <Helmet>
        <title>Projects - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <BookPageHeader />
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
          <BookResults />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default BookPage
