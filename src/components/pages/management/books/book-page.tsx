import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import BookPageHeader from "components/pages/management/books/book-page-header"
import BookResults from "components/pages/management/books/book-results"
import useBooksQuery from "hooks/queries/use-books-query"

function BookPage() {
  const { data: books } = useBooksQuery()

  if (!books) return null

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
          <BookResults books={books} />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default BookPage
