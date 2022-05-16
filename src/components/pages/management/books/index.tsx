import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import BookResults from "components/pages/management/books/book-results"
import PageHeader from "components/pages/management/books/page-header"
import useBooksQuery from "hooks/queries/use-books-query"

function ManagementProjects() {
  const { data: books } = useBooksQuery()

  if (!books) return null

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
          <BookResults books={books} />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementProjects
