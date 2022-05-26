import { ChangeEvent } from "react"

import {
  DeleteTwoTone as DeleteTwoToneIcon,
  SearchTwoTone as SearchTwoToneIcon,
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Link,
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
import { format } from "date-fns"
import { useTranslation } from "react-i18next"
import { Link as RouterLink } from "react-router-dom"

import RentalStatusLabel from "components/pages/management/rentals-page/rental-status-label"
import UsersBulkActions from "components/pages/management/users/users-bulk-actions"
import useRentalActions from "hooks/redux/use-rental-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"
import { Rental } from "typings/api-model"

interface RentalTableViewProps {
  rentals: Rental[]
}

const RentalTableView = ({ rentals }: RentalTableViewProps) => {
  const { t } = useTranslation()
  const { selectedRentalIds, pageFilter, totalRentals, search } =
    useTypedSelector((state) => state.rental)

  const {
    changePage,
    changeSearch,
    changeRowsPerPage,
    toggleSelectARental,
    toggleSelectAllRentals,
    openConfirmDeleteModal,
  } = useRentalActions()

  const isSelectedBulkActions = selectedRentalIds.length > 0
  const isSelectedSome =
    selectedRentalIds.length > 0 && selectedRentalIds.length < rentals.length
  const isSelectedAll = selectedRentalIds.length === rentals.length

  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>) => {
    toggleSelectAllRentals(
      event.target.checked ? rentals.map((rental) => rental.id) : []
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

      {rentals.length === 0 ? (
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
            {t(
              "We couldn't find rentals any members matching your search criteria"
            )}
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
                  <TableCell>{t("User")}</TableCell>
                  <TableCell>{t("Start Date")}</TableCell>
                  <TableCell>{t("End date")}</TableCell>
                  <TableCell>{t("Price")}</TableCell>
                  <TableCell>{t("Status")}</TableCell>
                  <TableCell align="center">{t("Actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rentals.map((rental) => {
                  const isSelected = selectedRentalIds.includes(rental.id)
                  return (
                    <TableRow hover key={rental.id} selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(_event) => toggleSelectARental(rental.id)}
                          value={isSelected}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            sx={{
                              mr: 1,
                            }}
                            src={rental.user.avatar}
                          />
                          <Box>
                            <Link
                              variant="h5"
                              component={RouterLink}
                              to={`/${
                                location.pathname.split("/")[1]
                              }/management/users/single/${rental.user.id}`}
                            >
                              {rental.user.name}
                            </Link>
                            <Typography noWrap variant="subtitle2">
                              {rental.user.jobTitle}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {format(new Date(rental.startDate), "MMMM dd yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(rental.endDate), "MMMM dd yyyy")}
                      </TableCell>
                      <TableCell>{rental.price} $</TableCell>
                      <TableCell>
                        <RentalStatusLabel status={rental.status} />
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
              count={totalRentals}
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

export default RentalTableView
