import { ChangeEvent, MouseEvent, useState } from "react"

import {
  Close as CloseIcon,
  GridViewTwoTone as GridViewTwoToneIcon,
  SearchTwoTone as SearchTwoToneIcon,
  TableRowsTwoTone as TableRowsTwoToneIcon,
} from "@mui/icons-material"
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  lighten,
  MenuItem,
  Select,
  styled,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Zoom,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { useTranslation } from "react-i18next"

import BookGridView from "components/pages/management/books/book-grid-view"
import BookTableView from "components/pages/management/books/book-table-view"
import Transition from "components/transition"
import { Book } from "typings/api-model"

const DialogWrapper = styled(Dialog)(
  () => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
)

const AvatarError = styled(Avatar)(
  ({ theme }) => `
        background-color: ${theme.colors.error.lighter};
        color: ${theme.colors.error.main};
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
  
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
)

const ButtonError = styled(Button)(
  ({ theme }) => `
       background: ${theme.colors.error.main};
       color: ${theme.palette.error.contrastText};
  
       &:hover {
          background: ${theme.colors.error.dark};
       }
      `
)

export const IconButtonError = styled(IconButton)(
  ({ theme }) => `
       background: ${theme.colors.error.lighter};
       color: ${theme.colors.error.main};
       padding: ${theme.spacing(0.75)};
  
       &:hover {
        background: ${lighten(theme.colors.error.lighter, 0.4)};
       }
  `
)

interface BookResults {
  books: Book[]
}

const BookResults = ({ books }: BookResults) => {
  const [selectedBooks, setSelectedBooks] = useState<Book["id"][]>([])
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const bookCategories = [
    { title: "Development" },
    { title: "Design Book" },
    { title: "Marketing Research" },
    { title: "Software" },
  ]

  const statusOptions = [
    {
      id: "available",
      name: t("Available"),
    },
    {
      id: "unavailable",
      name: t("Unavailable"),
    },
  ]

  const handleSelectAllBooks = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedBooks(event.target.checked ? books.map((book) => book.id) : [])
  }

  const handleSelectOneBook = (bookId: Book["id"]) => {
    if (!selectedBooks.includes(bookId)) {
      setSelectedBooks((prevSelected) => [...prevSelected, bookId])
    } else {
      setSelectedBooks((prevSelected) =>
        prevSelected.filter((id) => id !== bookId)
      )
    }
  }

  const isSelectedBulkActions = selectedBooks.length > 0
  const isSelectedSomeBooks =
    selectedBooks.length > 0 && selectedBooks.length < books.length
  const isSelectedAllBooks = selectedBooks.length === books.length

  const [toggleView, setToggleView] = useState("table_view")

  const handleViewOrientation = (
    _event: MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setToggleView(newValue)
  }

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true)
  }

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false)
  }

  const handleDeleteCompleted = () => {
    setOpenConfirmDelete(false)

    enqueueSnackbar(t("The books has been deleted successfully"), {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      TransitionComponent: Zoom,
    })
  }

  return (
    <>
      <Card
        sx={{
          p: 1,
          mb: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box p={1}>
              <TextField
                sx={{
                  m: 0,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder={t("Search by book name...")}
                fullWidth
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box p={1}>
              <Autocomplete
                multiple
                sx={{
                  m: 0,
                }}
                limitTags={2}
                options={bookCategories}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    label={t("Categories")}
                    placeholder={t("Select categories...")}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box p={1}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>{t("Status")}</InputLabel>
                <Select label={t("Status")}>
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            display="flex"
            justifyContent={{ xs: "center", md: "flex-end" }}
          >
            <Box p={1}>
              <ToggleButtonGroup
                value={toggleView}
                exclusive
                onChange={handleViewOrientation}
              >
                <ToggleButton disableRipple value="table_view">
                  <TableRowsTwoToneIcon />
                </ToggleButton>
                <ToggleButton disableRipple value="grid_view">
                  <GridViewTwoToneIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {toggleView === "table_view" && (
        <BookTableView
          books={books}
          onSelectOne={handleSelectOneBook}
          isSelectedAll={isSelectedAllBooks}
          isSelectedBulkActions={isSelectedBulkActions}
          onConfirmDelete={handleConfirmDelete}
          selectedBookIds={selectedBooks}
          isSelectedSome={isSelectedSomeBooks}
          onSelectAll={handleSelectAllBooks}
        />
      )}

      {toggleView === "grid_view" && (
        <BookGridView
          books={books}
          onSelectOne={handleSelectOneBook}
          isSelectedAll={isSelectedAllBooks}
          isSelectedBulkActions={isSelectedBulkActions}
          onConfirmDelete={handleConfirmDelete}
          selectedBookIds={selectedBooks}
          isSelectedSome={isSelectedSomeBooks}
          onSelectAll={handleSelectAllBooks}
        />
      )}

      {!toggleView && (
        <Card
          sx={{
            textAlign: "center",
            p: 3,
          }}
        >
          <Typography
            align="center"
            variant="h4"
            fontWeight="normal"
            color="text.secondary"
            sx={{
              my: 5,
            }}
            gutterBottom
          >
            {t(
              "Choose between table or grid views for displaying the books list."
            )}
          </Typography>
        </Card>
      )}

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>

          <Typography
            align="center"
            sx={{
              pt: 4,
              px: 6,
            }}
            variant="h3"
          >
            {t("Do you really want to delete this book")}?
          </Typography>

          <Typography
            align="center"
            sx={{
              pt: 2,
              pb: 4,
              px: 6,
            }}
            fontWeight="normal"
            color="text.secondary"
            variant="h4"
          >
            {t("You won't be able to revert after deletion")}
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1,
              }}
              onClick={closeConfirmDelete}
            >
              {t("Cancel")}
            </Button>
            <ButtonError
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3,
              }}
              variant="contained"
            >
              {t("Delete")}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  )
}

export default BookResults
