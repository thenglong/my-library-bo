import { ChangeEvent } from "react"

import {
  DeleteTwoTone as DeleteTwoToneIcon,
  SearchTwoTone as SearchTwoToneIcon,
} from "@mui/icons-material"
import {
  Box,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import { useTranslation } from "react-i18next"

import LibraryStatusLabel from "components/pages/management/libraries-page/library-status-label"
import UsersBulkActions from "components/pages/management/users/users-bulk-actions"
import useLibraryActions from "hooks/redux/use-library-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"
import { Library } from "typings/api-model"

interface LibrariesTableViewProps {
  libraries: Library[]
}

const LibrariesTableView = ({ libraries }: LibrariesTableViewProps) => {
  const { t } = useTranslation()
  const { selectedLibraryIds, pageFilter, totalLibraries, search } =
    useTypedSelector((state) => state.library)

  const {
    changePage,
    changeSearch,
    changeRowsPerPage,
    toggleSelectALibrary,
    toggleSelectAllLibraries,
    openConfirmDeleteModal,
  } = useLibraryActions()

  const isSelectedBulkActions = selectedLibraryIds.length > 0
  const isSelectedSome =
    selectedLibraryIds.length > 0 &&
    selectedLibraryIds.length < libraries.length
  const isSelectedAll = selectedLibraryIds.length === libraries.length

  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>) => {
    toggleSelectAllLibraries(
      event.target.checked ? libraries.map((library) => library.id) : []
    )
  }

  return (
    <Card>
      <Box p={2}>
        {!isSelectedBulkActions && (
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
            inputProps={{
              autoComplete: "nope",
            }}
            placeholder={t("Search by name, email...")}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        )}
        {isSelectedBulkActions && <UsersBulkActions />}
      </Box>

      <Divider />

      {libraries.length === 0 ? (
        <>
          <Typography
            sx={{
              py: 10,
            }}
            variant="h3"
            fontWeight="normal"
            color="text.secondary"
            align="center"
          >
            {t("We couldn't find any members matching your search criteria")}
          </Typography>
        </>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelectedAll}
                      indeterminate={isSelectedSome}
                      onChange={handleSelectAllUsers}
                    />
                  </TableCell>
                  <TableCell>{t("Logo")}</TableCell>
                  <TableCell>{t("Name")}</TableCell>
                  <TableCell>{t("Address")}</TableCell>
                  <TableCell>{t("Description")}</TableCell>
                  <TableCell>{t("Phone Number")}</TableCell>
                  <TableCell>{t("Status")}</TableCell>
                  <TableCell align="center">{t("Actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {libraries.map((library) => {
                  const isSelected = selectedLibraryIds.includes(library.id)
                  return (
                    <TableRow hover key={library.id} selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(_event) =>
                            toggleSelectALibrary(library.id)
                          }
                          value={isSelected}
                        />
                      </TableCell>
                      <TableCell>
                        <img src={library.logoUrl} width={200} alt="" />
                      </TableCell>
                      <TableCell>{library.name}</TableCell>
                      <TableCell>{library.address}</TableCell>
                      <TableCell>{library.description}</TableCell>
                      <TableCell>{library.phone}</TableCell>
                      <TableCell>
                        <LibraryStatusLabel status={library.status} />
                      </TableCell>

                      <TableCell align="center">
                        <Typography noWrap>
                          <Tooltip title={t("Delete")} arrow>
                            <IconButton
                              onClick={() => openConfirmDeleteModal()}
                              color="primary"
                            >
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={totalLibraries}
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
          </Box>
        </>
      )}
    </Card>
  )
}

export default LibrariesTableView
