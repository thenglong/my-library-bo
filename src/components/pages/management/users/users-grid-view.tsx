import { ChangeEvent } from "react"

import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone"
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone"
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  styled,
  TablePagination,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { Link as RouterLink } from "react-router-dom"

import { getUserRoleLabel } from "components/pages/management/users/user-results"
import UsersBulkActions from "components/pages/management/users/users-bulk-actions"
import { Book, User } from "typings/api-model"

const CardWrapper = styled(Card)(
  ({ theme }) => `
  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
    z-index: 1;
    transition: ${theme.transitions.create(["box-shadow"])};
  }
      
    &.Mui-selected::after {
      box-shadow: 0 0 0 3px ${theme.colors.primary.main};
    }
  `
)

interface UsersGridViewProps {
  users: User[]
  isSelectedBulkActions: boolean
  isSelectedSome: boolean
  isSelectedAll: boolean
  onSelectOne: (id: Book["id"]) => void
  onConfirmDelete: () => void
  onSelectAll: (event: ChangeEvent<HTMLInputElement>) => void
  selectedUserIds: Book["id"][]
}

const UsersGridView = ({
  users,
  selectedUserIds,
  isSelectedAll,
  isSelectedSome,
  onSelectAll,
  onSelectOne,
  isSelectedBulkActions,
  onConfirmDelete: _,
}: UsersGridViewProps) => {
  const { t } = useTranslation()

  return (
    <>
      <Card
        sx={{
          p: 2,
          mb: 3,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {users.length !== 0 && (
            <>
              <Box display="flex" alignItems="center">
                <Tooltip arrow placement="top" title={t("Select all users")}>
                  <Checkbox
                    checked={isSelectedAll}
                    indeterminate={isSelectedSome}
                    onChange={onSelectAll}
                  />
                </Tooltip>
              </Box>
              {isSelectedBulkActions && (
                <Box flex={1} pl={2}>
                  <UsersBulkActions />
                </Box>
              )}
            </>
          )}
          {!isSelectedBulkActions && (
            <TextField
              sx={{
                my: 0,
                ml: users.length !== 0 ? 2 : 0,
              }}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                ),
              }}
              placeholder={t("Search by name, email or username...")}
              size="small"
              margin="normal"
              variant="outlined"
            />
          )}
        </Box>
      </Card>
      {users.length === 0 ? (
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
      ) : (
        <>
          <Grid container spacing={3}>
            {users.map((user) => {
              const isUserSelected = selectedUserIds.includes(user.id)
              return (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <CardWrapper
                    className={clsx({
                      "Mui-selected": isUserSelected,
                    })}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: "2",
                      }}
                    >
                      <Box
                        px={2}
                        pt={2}
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="space-between"
                      >
                        {getUserRoleLabel(user.role)}
                        <IconButton
                          color="primary"
                          sx={{
                            p: 0.5,
                          }}
                        >
                          <MoreVertTwoToneIcon />
                        </IconButton>
                      </Box>
                      <Box p={2} display="flex" alignItems="flex-start">
                        <Avatar
                          sx={{
                            width: 50,
                            height: 50,
                            mr: 2,
                          }}
                          src={user.avatar}
                        />
                        <Box>
                          <Box>
                            <Link
                              variant="h5"
                              component={RouterLink}
                              to={`/${
                                location.pathname.split("/")[1]
                              }/management/users/single/${user.id}`}
                            >
                              {user.name}
                            </Link>{" "}
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              (user.username)
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              pt: 0.3,
                            }}
                            variant="subtitle2"
                          >
                            user.jobtitle
                          </Typography>
                          <Typography
                            sx={{
                              pt: 1,
                            }}
                            variant="h6"
                          >
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider />
                      <Box
                        pl={2}
                        py={1}
                        pr={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography>
                          <b>user.posts</b> {t("posts")}
                        </Typography>
                        <Checkbox
                          checked={isUserSelected}
                          onChange={(_event) => onSelectOne(user.id)}
                          value={isUserSelected}
                        />
                      </Box>
                    </Box>
                  </CardWrapper>
                </Grid>
              )
            })}
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
              <b>{10}</b> {t("of")}{" "}
              <b>
                {
                  10
                  // TODO
                }
              </b>{" "}
              <b>{t("users")}</b>
            </Box>
            <TablePagination
              component="div"
              count={
                10
                // TODO
              }
              onPageChange={() => {
                // TODO
              }}
              onRowsPerPageChange={() => {
                // TODO
              }}
              page={1}
              rowsPerPage={10}
              labelRowsPerPage=""
              rowsPerPageOptions={[5, 10, 15]}
            />
          </Card>
        </>
      )}
    </>
  )
}

export default UsersGridView
