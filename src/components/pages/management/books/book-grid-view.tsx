import { ChangeEvent } from "react"

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  Divider,
  Grid,
  LinearProgress,
  Link,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material"
import clsx from "clsx"
import { addDays, format, formatDistance } from "date-fns"
import { useTranslation } from "react-i18next"

import {
  CardWrapper,
  IconButtonError,
} from "components/pages/management/books/book-results"
import BulkActions from "components/pages/management/books/bulk-actions"
import Text from "components/text"
import { Book } from "typings/api-model"
import { getRandomInt } from "utils/number-utils"

interface BookGridViewProps {
  isSelectedBulkActions: boolean
  books: Book[]
  isSelectedSome: boolean
  isSelectedAll: boolean
  onSelectOne: (id: Book["id"]) => void
  onConfirmDelete: () => void
  onSelectAll: (event: ChangeEvent<HTMLInputElement>) => void
  selectedBookIds: Book["id"][]
}

const BookGridView = ({
  books,
  selectedBookIds,
  isSelectedAll,
  isSelectedSome,
  onSelectAll,
  onSelectOne,
  isSelectedBulkActions,
  onConfirmDelete,
}: BookGridViewProps) => {
  const { t } = useTranslation()
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
                    onChange={onSelectAll}
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
                  count={books.length}
                  onPageChange={() => {
                    // handlePageChange
                  }}
                  onRowsPerPageChange={() => {
                    //handleLimitChange
                  }}
                  page={1} // TODO
                  rowsPerPage={10} // TODO
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
            {books.map((book) => {
              const isProjectSelected = selectedBookIds.includes(book.id)

              return (
                <Grid item xs={12} sm={6} md={4} key={book.id}>
                  <CardWrapper
                    className={clsx({
                      "Mui-selected": isProjectSelected,
                    })}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: "2",
                      }}
                    >
                      <Box
                        pl={2}
                        py={1}
                        pr={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography component="span">
                            <b>{t("Tags")}:</b>{" "}
                          </Typography>
                          {["ABC", "DEF"].map((value) => {
                            return (
                              <span key={value}>
                                <Link href="#">{value}</Link>,{" "}
                              </span>
                            )
                          })}
                        </Box>
                        <Checkbox
                          checked={isProjectSelected}
                          onChange={(_event) => {
                            onSelectOne(book.id)
                          }}
                          value={isProjectSelected}
                        />
                      </Box>
                      <Divider />
                      <CardMedia
                        sx={{
                          minHeight: 180,
                        }}
                        image={`${process.env.PUBLIC_URL}/${book.imageLink}`}
                      />
                      <Divider />
                      <Box p={2}>
                        Category
                        <Typography
                          sx={{
                            mt: 2,
                          }}
                          variant="h4"
                          gutterBottom
                        >
                          {book.title}
                        </Typography>
                        <Typography noWrap variant="subtitle2">
                          Lorem ipsum dolor sit amet.
                        </Typography>
                      </Box>
                      <Box
                        px={2}
                        display="flex"
                        alignItems="flex-end"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography variant="subtitle2">
                            {t("Started")}:{" "}
                          </Typography>
                          <Typography variant="h5">
                            {format(new Date(), "MMMM dd yyyy")}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle2">
                            {t("Due in")}:{" "}
                            <Text color="black">
                              {formatDistance(
                                new Date(),
                                addDays(new Date(), 1),
                                {
                                  addSuffix: true,
                                }
                              )}{" "}
                              days
                            </Text>
                          </Typography>
                        </Box>
                      </Box>

                      <Box px={2} pb={2} display="flex" alignItems="center">
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
                      <Divider />
                      <Box
                        p={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
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
                        <Box>
                          <Button
                            sx={{
                              mr: 1,
                            }}
                            size="small"
                            variant="contained"
                            color="primary"
                          >
                            {t("Edit")}
                          </Button>
                          <Tooltip title={t("Delete")} arrow>
                            <IconButtonError
                              onClick={onConfirmDelete}
                              color="primary"
                            >
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButtonError>
                          </Tooltip>
                        </Box>
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
              <b>{10}</b> {t("of")} <b>{books.length}</b> <b>{t("books")}</b>
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
              labelRowsPerPage=""
              rowsPerPageOptions={[5, 10, 15]}
            />
          </Card>
        </>
      )}
    </>
  )
}

export default BookGridView
