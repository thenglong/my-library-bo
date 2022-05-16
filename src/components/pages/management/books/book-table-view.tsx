import { ChangeEvent } from "react"

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone"
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  Checkbox,
  Divider,
  IconButton,
  LinearProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material"
import { addDays, format, formatDistance } from "date-fns"
import { useTranslation } from "react-i18next"

import BulkActions from "components/pages/management/books/bulk-actions"
import { Book } from "typings/api-model"
import { getRandomInt } from "utils/number-utils"

interface BookTableViewProps {
  isSelectedBulkActions: boolean
  books: Book[]
  isSelectedSome: boolean
  isSelectedAll: boolean
  onSelectOne: (id: Book["id"]) => void
  onConfirmDelete: () => void
  onSelectAll: (event: ChangeEvent<HTMLInputElement>) => void
  selectedBookIds: Book["id"][]
}

const BookTableView = ({
  isSelectedBulkActions,
  books,
  onConfirmDelete,
  isSelectedAll,
  isSelectedSome,
  onSelectAll,
  selectedBookIds,
  onSelectOne,
}: BookTableViewProps) => {
  const { t } = useTranslation()

  return (
    <Card>
      {isSelectedBulkActions && (
        <Box p={2}>
          <BulkActions />
        </Box>
      )}
      {!isSelectedBulkActions && (
        <Box
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography component="span" variant="subtitle1">
              {t("Showing")}:
            </Typography>{" "}
            <b>{books.length}</b> <b>{t("books")}</b>
          </Box>
          <TablePagination
            component="div"
            count={books.length}
            onPageChange={() => {
              // TODO
            }}
            onRowsPerPageChange={() => {
              // TODO
            }}
            page={1}
            rowsPerPage={10}
            rowsPerPageOptions={[5, 10, 15]}
          />
        </Box>
      )}
      <Divider />

      {books.length === 0 ? (
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
            {t("We couldn't find any projects matching your search criteria")}
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
                      onChange={onSelectAll}
                    />
                  </TableCell>
                  <TableCell>{t("Name")}</TableCell>
                  <TableCell>{t("Tags")}</TableCell>
                  <TableCell>{t("Time Left")}</TableCell>
                  <TableCell>{t("Members")}</TableCell>
                  <TableCell>{t("Progress")}</TableCell>
                  <TableCell>{t("Status")}</TableCell>
                  <TableCell align="center">{t("Actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => {
                  const isBookSelected = selectedBookIds.includes(book.id)
                  return (
                    <TableRow hover key={book.id} selected={isBookSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isBookSelected}
                          onChange={(_) => onSelectOne(book.id)}
                          value={isBookSelected}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography noWrap variant="h5">
                          {book.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {["Social", "Love", "Tech"].map((value) => {
                          return (
                            <span key={value}>
                              <Link href="#">{value}</Link>,{" "}
                            </span>
                          )
                        })}
                      </TableCell>
                      <TableCell>
                        <Typography
                          noWrap
                          variant="subtitle1"
                          color="text.primary"
                        >
                          {t("Due")}
                          <b>
                            {" "}
                            {formatDistance(
                              new Date(),
                              addDays(new Date(), 1),
                              {
                                addSuffix: true,
                              }
                            )}
                          </b>
                        </Typography>
                        <Typography noWrap color="text.secondary">
                          {t("Started")}: {format(new Date(), "MMMM dd yyyy")}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" justifyContent="flex-start">
                          {/* book author */}
                          <AvatarGroup max={4}>
                            <Tooltip arrow placement="top" title="Author">
                              <Avatar
                                sx={{
                                  width: 30,
                                  height: 30,
                                }}
                                src="https://avatars.dicebear.com/api/initials/:author_melo.svg"
                              />
                            </Tooltip>
                            <Tooltip arrow placement="top" title="Author">
                              <Avatar
                                sx={{
                                  width: 30,
                                  height: 30,
                                }}
                                src="https://avatars.dicebear.com/api/initials/:author_melo.svg"
                              />
                            </Tooltip>
                            <Tooltip arrow placement="top" title="Author">
                              <Avatar
                                sx={{
                                  width: 30,
                                  height: 30,
                                }}
                                src="https://avatars.dicebear.com/api/initials/:author_melo.svg"
                              />
                            </Tooltip>
                          </AvatarGroup>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            minWidth: 175,
                          }}
                          display="flex"
                          alignItems="center"
                        >
                          <LinearProgress
                            sx={{
                              flex: 1,
                              mr: 1,
                            }}
                            value={getRandomInt(1, 100)}
                            color="primary"
                            variant="determinate"
                          />
                          <Typography variant="subtitle1">
                            {getRandomInt(1, 100)}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap>Book Category</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography noWrap>
                          <Tooltip title={t("View")} arrow>
                            <IconButton color="primary">
                              <LaunchTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t("Delete")} arrow>
                            <IconButton
                              onClick={() => onConfirmDelete()}
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
              count={books.length}
              onPageChange={() => {
                //
              }}
              onRowsPerPageChange={() => {
                //
              }}
              page={1} // TODO
              rowsPerPage={10} // TODO
              rowsPerPageOptions={[5, 10, 15]}
            />
          </Box>
        </>
      )}
    </Card>
  )
}

export default BookTableView
