import { Box, Tooltip, Typography } from "@mui/material"

import {
  CardImage,
  TypographyH1,
} from "components/pages/login-page/login-page-styled"

const items = [
  {
    quote: "Life is what happens when you’re busy making other plans.",
    imageUrl:
      "https://avatars.dicebear.com/api/initials/:l.svg?background=%237F58AF",
    width: "20%",
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    imageUrl:
      "https://avatars.dicebear.com/api/initials/:i.svg?background=%23E84D8A",
    width: "25%",
  },
  {
    quote: "Get busy living or get busy dying.",
    imageUrl:
      "https://avatars.dicebear.com/api/initials/:f.svg?background=%2364C5EB",
    width: "20%",
  },

  {
    quote: "The purpose of our lives is to be happy.",
    imageUrl:
      "https://avatars.dicebear.com/api/initials/:e.svg?background=%23FEB326",
    width: "35%",
  },
]

const LifeQuote = () => {
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
        {items.map((item, index) => (
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
