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
import { format } from "date-fns"
import { useTranslation } from "react-i18next"
import { Link as RouterLink } from "react-router-dom"

import MemberStatusLabel from "components/pages/management/members/member-status-label"
import UsersBulkActions from "components/pages/management/users/users-bulk-actions"
import useMemberActions from "hooks/redux/use-member-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"
import { Member } from "typings/api-model"

interface MembersTableViewProps {
  members: Member[]
}

const MembersTableView = ({ members }: MembersTableViewProps) => {
  const { t } = useTranslation()
  const { selectedMemberIds, pageFilter, totalMembers, search } =
    useTypedSelector((state) => state.member)

  const {
    changePage,
    changeSearch,
    changeRowsPerPage,
    toggleSelectAMember,
    toggleSelectAllMembers,
    openConfirmDeleteModal,
  } = useMemberActions()

  const isSelectedBulkActions = selectedMemberIds.length > 0
  const isSelectedSome =
    selectedMemberIds.length > 0 && selectedMemberIds.length < members.length
  const isSelectedAll = selectedMemberIds.length === members.length

  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>) => {
    toggleSelectAllMembers(
      event.target.checked ? members.map((user) => user.id) : []
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

      {members.length === 0 ? (
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
                  <TableCell>{t("Name")}</TableCell>
                  <TableCell>{t("Start Date")}</TableCell>
                  <TableCell>{t("End Date")}</TableCell>
                  <TableCell>{t("Status")}</TableCell>
                  <TableCell>{t("Library")}</TableCell>
                  <TableCell>{t("Email")}</TableCell>
                  <TableCell>{t("Phone")}</TableCell>
                  <TableCell>{t("Address")}</TableCell>
                  <TableCell align="center">{t("Actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => {
                  const isMemberSelected = selectedMemberIds.includes(member.id)
                  return (
                    <TableRow hover key={member.id} selected={isMemberSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isMemberSelected}
                          onChange={(_event) => toggleSelectAMember(member.id)}
                          value={isMemberSelected}
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            sx={{
                              mr: 1,
                            }}
                            src={member.user.avatar}
                          />
                          <Box>
                            <Link
                              variant="h5"
                              component={RouterLink}
                              to={`/${
                                location.pathname.split("/")[1]
                              }/management/members/single/${member.id}`}
                            >
                              {member.user.name}
                            </Link>
                            <Typography noWrap variant="subtitle2">
                              {member.user.jobTitle}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {format(new Date(member.startDate), "MMMM dd yyyy")}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {format(new Date(member.endDate), "MMMM dd yyyy")}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <MemberStatusLabel status={member.status} />
                      </TableCell>

                      <TableCell>{member.library.name}</TableCell>

                      <TableCell>
                        <Typography>{member.user.email}</Typography>
                      </TableCell>

                      <TableCell>{member.user.phone}</TableCell>

                      <TableCell>
                        <Typography>{member.user.address}</Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Typography noWrap>
                          <Tooltip title={t("View")} arrow>
                            <IconButton
                              component={RouterLink}
                              to={`/${
                                location.pathname.split("/")[1]
                              }/management/members/single/${member.id}`}
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
              count={totalMembers}
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

export default MembersTableView
