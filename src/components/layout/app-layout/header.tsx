import { useContext } from "react"

import {
  CloseTwoTone as CloseTwoToneIcon,
  MenuTwoTone as MenuTwoToneIcon,
} from "@mui/icons-material"
import {
  alpha,
  Box,
  IconButton,
  lighten,
  styled,
  Tooltip,
  useTheme,
} from "@mui/material"

import HeaderButtons from "components/layout/app-layout/header-buttons"
import HeaderUserBox from "components/layout/app-layout/header-user-box"
import { SidebarContext } from "contexts/SidebarContext"

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background as string, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
)

const Header = () => {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext)
  const theme = useTheme()

  return (
    <HeaderWrapper
      component="header"
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2
              )}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`,
      }}
    >
      <div />
      <Box display="flex" alignItems="center">
        <HeaderButtons />
        <HeaderUserBox />
        <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: "none", xs: "inline-block" },
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  )
}

export default Header
