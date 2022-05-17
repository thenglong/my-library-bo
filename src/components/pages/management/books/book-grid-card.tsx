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
  styled,
  Tooltip,
  Typography,
} from "@mui/material"
import clsx from "clsx"
import { addDays, format, formatDistance } from "date-fns"
import { useTranslation } from "react-i18next"

import { IconButtonError } from "components/pages/management/books/book-results"
import BookStatusLabel from "components/pages/management/books/book-status-label"
import Text from "components/text"
import { Book } from "typings/api-model"
import { getRandomInt } from "utils/number-utils"

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

interface BookGridCardProps {
  book: Book
  isSelected: boolean
  onConfirmDelete: () => void
  onSelect: (id: Book["id"]) => void
}

const BookGridCard = ({
  book,
  isSelected,
  onConfirmDelete,
  onSelect,
}: BookGridCardProps) => {
  const { t } = useTranslation()

  return (
    <Grid item xs={12} sm={6} md={3} lg={2} key={book.id}>
      <CardWrapper
        className={clsx({
          "Mui-selected": isSelected,
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
              checked={isSelected}
              onChange={(_event) => {
                onSelect(book.id)
              }}
              value={isSelected}
            />
          </Box>
          <Divider />
          <CardMedia
            sx={{
              minHeight: 400,
              maxWidth: "100%",
              aspectRatio: "3/5",
            }}
            image={`${process.env.PUBLIC_URL}/${book.imageLink}`}
          />
          <Divider />
          <Box p={2}>
            <BookStatusLabel
              bookStatus={getRandomInt(1, 2) === 1 ? "inStock" : "outOfStock"}
            />
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
              <Typography variant="subtitle2">{t("Started")}: </Typography>
              <Typography variant="h5">
                {format(new Date(), "MMMM dd yyyy")}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">
                {t("Due in")}:{" "}
                <Text color="black">
                  {formatDistance(new Date(), addDays(new Date(), 1), {
                    addSuffix: true,
                  })}{" "}
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
            <Typography variant="subtitle1">{getRandomInt(1, 100)}%</Typography>
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
                <IconButtonError onClick={onConfirmDelete} color="primary">
                  <DeleteTwoToneIcon fontSize="small" />
                </IconButtonError>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </CardWrapper>
    </Grid>
  )
}

export default BookGridCard
