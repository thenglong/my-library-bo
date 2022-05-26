import { ChangeEvent } from "react"

import {
  DeleteTwoTone as DeleteTwoToneIcon,
  LaunchTwoTone as LaunchTwoToneIcon,
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
import { useTranslation } from "react-i18next"
import { Link as RouterLink } from "react-router-dom"

import UserRoleLabel from "components/pages/management/users/user-role-label"
import UsersBulkActions from "components/pages/management/users/users-bulk-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"
import useUserActions from "hooks/redux/use-user-actions"
import { User } from "typings/api-model"

interface UsersTableViewProps {
  users: User[]
}

const UsersTableView = ({ users }: UsersTableViewProps) => {
  const { t } = useTranslation()
  const { selectedUserIds, pageFilter, totalUsers, search } = useTypedSelector(
    (state) => state.user
  )

  const {
    changePage,
    changeSearch,
    changeRowsPerPage,
    toggleSelectAUser,
    toggleSelectAllUsers,
    openConfirmDeleteModal,
  } = useUserActions()

  const isSelectedBulkActions = selectedUserIds.length > 0
  const isSelectedSome =
    selectedUserIds.length > 0 && selectedUserIds.length < users.length
  const isSelectedAll = selectedUserIds.length === users.length

  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>) => {
    toggleSelectAllUsers(
      event.target.checked ? users.map((user) => user.id) : []
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

      {users.length === 0 ? (
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
            {t("We couldn't find any users matching your search criteria")}
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
                  <TableCell>{t("Name")}</TableCell>
                  <TableCell>{t("Email")}</TableCell>
                  <TableCell align="center">{t("Phone")}</TableCell>
                  <TableCell>{t("Address")}</TableCell>
                  <TableCell>{t("Role")}</TableCell>
                  <TableCell align="center">{t("Actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => {
                  const isUserSelected = selectedUserIds.includes(user.id)
                  return (
                    <TableRow hover key={user.id} selected={isUserSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isUserSelected}
                          onChange={(_event) => toggleSelectAUser(user.id)}
                          value={isUserSelected}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            sx={{
                              mr: 1,
                            }}
                            src={user.avatar}
                          />
                          <Box>
                            <Link
                              variant="h5"
                              component={RouterLink}
                              to={`/${
                                location.pathname.split("/")[1]
                              }/management/users/single/${user.id}`}
                            >
                              {user.name}
                            </Link>
                            <Typography noWrap variant="subtitle2">
                              {user.jobTitle}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography>{user.email}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontWeight="bold">{user.phone}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{user.address}</Typography>
                      </TableCell>
                      <TableCell>
                        <UserRoleLabel role={user.role} />
                      </TableCell>
                      <TableCell align="center">
                        <Typography noWrap>
                          <Tooltip title={t("View")} arrow>
                            <IconButton
                              component={RouterLink}
                              to={`/${
                                location.pathname.split("/")[1]
                              }/management/users/single/${user.id}`}
                              color="primary"
                            >
                              <LaunchTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
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
              count={totalUsers}
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

export default UsersTableView
