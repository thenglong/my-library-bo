import { Box, Theme, Tooltip, Typography, useTheme } from "@mui/material"

import {
  CardImage,
  TypographyH1,
} from "components/pages/sign-in-page/sign-in-page-styled"
import { getInitialImage } from "utils/ui-utils"

const getItems = (theme: Theme) => {
  return [
    {
      quote: "Life is what happens when you’re busy making other plans.",
      imageUrl: getInitialImage("l", theme.palette.primary.main),
      width: "20%",
    },
    {
      quote: "You only live once, but if you do it right, once is enough.",
      imageUrl: getInitialImage("i", theme.palette.error.main),
      width: "25%",
    },
    {
      quote: "Get busy living or get busy dying.",
      imageUrl: getInitialImage("f", theme.palette.warning.main),
      width: "20%",
    },

    {
      quote: "The purpose of our lives is to be happy.",
      imageUrl: getInitialImage("e", theme.palette.success.main),
      width: "35%",
    },
  ]
}

const LifeQuote = () => {
  const theme = useTheme()

  return (
    <>
      <TypographyH1
        variant="h1"
        sx={{
          mb: 7,
        }}
      >
        Join us today or nowhere
      </TypographyH1>
      <Box
        sx={{
          width: "100%",
          gap: ".5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {getItems(theme).map((item, index) => (
          <Tooltip key={index} arrow placement="top" title={item.quote}>
            <CardImage sx={{ width: item.width }}>
              <img alt="" width="100%" src={item.imageUrl} />
            </CardImage>
          </Tooltip>
        ))}
      </Box>
      <Typography
        variant="subtitle1"
        sx={{
          my: 3,
        }}
      >
        There are no wrong turnings. Only paths we had not known we were meant
        to walk.
      </Typography>
      <Typography variant="subtitle1" color="text.primary" fontWeight="bold">
        Finding Your Path
      </Typography>
      <Typography variant="subtitle1">
        A reader lives a thousand lives before he dies, said Jojen
      </Typography>
    </>
  )
}

export default LifeQuote
