import { ChangeEvent } from "react"

import {
  Box,
  Card,
  Checkbox,
  Grid,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material"
import { useTranslation } from "react-i18next"

import BookGridCard from "components/pages/management/books/book-grid-card"
import BulkActions from "components/pages/management/books/bulk-actions"
import useBookActions from "hooks/redux/use-book-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"
import { Book } from "typings/api-model"

interface BookGridViewProps {
  books: Book[]
}

const BookGridView = ({ books }: BookGridViewProps) => {
  const { t } = useTranslation()

  const { selectedBookIds, pageFilter, totalBooks } = useTypedSelector(
    (state) => state.book
  )
  const { changePage, changeRowsPerPage, toggleSelectAllBooks } =
    useBookActions()

  const isSelectedBulkActions = selectedBookIds.length > 0
  const isSelectedSome =
    selectedBookIds.length > 0 && selectedBookIds.length < books.length
  const isSelectedAll = selectedBookIds.length === books.length

  const handleSelectAllBooks = (event: ChangeEvent<HTMLInputElement>) => {
    toggleSelectAllBooks(
      event.target.checked ? books.map((book) => book.id) : []
    )
  }

  return (
    <>
      {books.length !== 0 && (
        <Card
          sx={{
            p: 2,
            mb: 3,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <>
              <Box display="flex" alignItems="center">
                <Tooltip arrow placement="top" title={t("Select all projects")}>
                  <Checkbox
                    checked={isSelectedAll}
                    indeterminate={isSelectedSome}
                    onChange={handleSelectAllBooks}
                  />
                </Tooltip>
              </Box>
              {isSelectedBulkActions && (
                <Box flex={1} pl={2}>
                  <BulkActions />
                </Box>
              )}
              {!isSelectedBulkActions && (
                <TablePagination
                  component="div"
                  count={totalBooks}
                  onPageChange={(_event, page) => {
                    changePage(page + 1) // plus one bcuz it is indexed from 0
                  }}
                  onRowsPerPageChange={(event) => {
                    changeRowsPerPage(+event.target.value)
                  }}
                  page={(pageFilter.page as number) - 1} // base on mui doc, this start from 0
                  rowsPerPage={pageFilter.perPage as number}
                  rowsPerPageOptions={[5, 10, 15]}
                />
              )}
            </>
          </Box>
        </Card>
      )}
      {books.length === 0 ? (
        <Typography
          sx={{
            py: 10,
          }}
          variant="h3"
          fontWeight="normal"
          color="text.secondary"
          align="center"
        >
          {t("We couldn't find any projects matching your search criteria")}
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {books.map((book) => (
              <BookGridCard key={book.id} book={book} />
            ))}
          </Grid>
          <Card
            sx={{
              p: 2,
              mt: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography component="span" variant="subtitle1">
                {t("Showing")}
              </Typography>{" "}
              <b>{10}</b> {t("of")} <b>{books.length}</b> <b>{t("books")}</b>
            </Box>
            <TablePagination
              component="div"
              count={totalBooks}
              onPageChange={(_event, page) => {
                changePage(page + 1) // plus one bcuz it is indexed from 0
              }}
              onRowsPerPageChange={(event) => {
                changeRowsPerPage(+event.target.value)
              }}
              page={(pageFilter.page as number) - 1} // base on mui doc, this start from 0
              rowsPerPage={pageFilter.perPage as number}
              rowsPerPageOptions={[5, 10, 15]}
            />
          </Card>
        </>
      )}
    </>
  )
}

export default BookGridView
