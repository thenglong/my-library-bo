import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"
import {
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  Divider,
  Grid,
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
    <Grid item xs={12} sm={6} md={3} key={book.id}>
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
                <b>{t("Categories")}:</b>{" "}
              </Typography>
              {["Fiction", "Tech"].map((value) => {
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
              bookStatus={
                getRandomInt(1, 2) === 1 ? "available" : "unavailable"
              }
            />
            <Typography
              noWrap
              sx={{
                mt: 2,
              }}
              variant="h4"
              gutterBottom
            >
              {book.title}
            </Typography>
            <Typography noWrap variant="subtitle2">
              Book description goes here
            </Typography>
          </Box>
          <Box
            px={2}
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="subtitle2">{t("Created At")}: </Typography>
              <Typography variant="h5">
                {format(new Date(), "MMMM dd yyyy")}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">
                {t("Last Rent")}:{" "}
                <Text color="black">
                  {formatDistance(
                    new Date(),
                    addDays(new Date(), getRandomInt(1, 10)),
                    {
                      addSuffix: true,
                    }
                  )}{" "}
                </Text>
              </Typography>
            </Box>
          </Box>

          <Box px={2} pb={2} display="flex" alignItems="center" />

          <Divider />
          <Box
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" justifyContent="flex-start">
              <Typography variant="subtitle2">
                {t("Written by")} <Text color="black">{book.author}</Text>
              </Typography>
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