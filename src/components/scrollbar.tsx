import { ComponentProps, ReactNode } from "react"

import { Box, useTheme } from "@mui/material"
import { Scrollbars as CustomerScrollbar } from "react-custom-scrollbars-2"

interface ScrollbarProps extends ComponentProps<typeof CustomerScrollbar> {
  children: ReactNode
}

const Scrollbar = ({ children, ...rest }: ScrollbarProps) => {
  const theme = useTheme()

  return (
    <CustomerScrollbar
      autoHide
      renderThumbVertical={() => {
        return (
          <Box
            sx={{
              width: 5,
              background: `${theme.colors.alpha.black[10]}`,
              borderRadius: `${theme.general.borderRadiusLg}`,
              transition: `${theme.transitions.create(["background"])}`,

              "&:hover": {
                background: `${theme.colors.alpha.black[30]}`,
              },
            }}
          />
        )
      }}
      {...rest}
    >
      {children}
    </CustomerScrollbar>
  )
}

export default Scrollbar
