import { MouseEvent, useCallback, useDeferredValue } from "react"

import {
  GridViewTwoTone as GridViewTwoToneIcon,
  SearchTwoTone as SearchTwoToneIcon,
  TableRowsTwoTone as TableRowsTwoToneIcon,
} from "@mui/icons-material"
import {
  Autocomplete,
  Box,
  Card,
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

import BookGridView from "components/pages/management/books-page/book-grid-view"
import BookTableView from "components/pages/management/books-page/book-table-view"
import ConfirmDeleteBookDialog from "components/pages/management/books-page/confirm-delete-book-dialog"
import { VIEW_ORIENTATION } from "constants/common-constants"
import useBooksQuery from "hooks/queries/use-books-query"
import useBookActions from "hooks/redux/use-book-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"
import { BookCategoryOptions } from "redux/slice/book-slice"
import { Book_Category } from "typings/api-model"
import _logger from "utils/logger-utils"

const logger = _logger.withTag("BookResults")

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

const bookCategories = [
  { title: Book_Category.SCIENCE },
  { title: Book_Category.POETRY },
  { title: Book_Category.FICTION },
  { title: Book_Category.NON_FICTION },
]

const BookResults = () => {
  const { data } = useBooksQuery()
  const books = useDeferredValue(data?.items || [])
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const {
    changeViewOrientation,
    closeConfirmDeleteModal,
    changeCategory,
    changeSearch,
  } = useBookActions()
  const { viewOrientation, selectedCategory, search } = useTypedSelector(
    (state) => state.book
  )
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

  const _handleDeleteCompleted = () => {
    closeConfirmDeleteModal()
    enqueueSnackbar(t("The books has been deleted successfully"), {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      TransitionComponent: Zoom,
    })
  }

  const handleViewOrientation = useCallback(
    (_event: MouseEvent<HTMLElement>, newValue: string) => {
      logger.debug(`handleViewOrientation: ${newValue}`)
      if (newValue) changeViewOrientation(newValue as VIEW_ORIENTATION)
    },
    [changeViewOrientation]
  )

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
                value={search}
                onChange={(event) => changeSearch(event.target.value)}
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
                // multiple // TODO: implement multiple
                sx={{
                  m: 0,
                }}
                limitTags={2}
                value={{ title: selectedCategory }}
                onChange={(event, newValue) => {
                  logger.debug(`onChange: ${newValue}`)
                  changeCategory(newValue?.title || ("" as BookCategoryOptions))
                }}
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
                value={viewOrientation}
                exclusive
                onChange={handleViewOrientation}
              >
                <ToggleButton disableRipple value={VIEW_ORIENTATION.TABLE}>
                  <TableRowsTwoToneIcon />
                </ToggleButton>
                <ToggleButton disableRipple value={VIEW_ORIENTATION.GRID}>
                  <GridViewTwoToneIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {viewOrientation === VIEW_ORIENTATION.TABLE && (
        <BookTableView books={books} />
      )}

      {viewOrientation === VIEW_ORIENTATION.GRID && (
        <BookGridView books={books} />
      )}

      {!viewOrientation && (
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

      <ConfirmDeleteBookDialog />
    </>
  )
}

export default BookResults
