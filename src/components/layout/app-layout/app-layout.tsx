import { Suspense } from "react"

import { Box, useTheme } from "@mui/material"
import { Outlet } from "react-router-dom"

import Header from "components/layout/app-layout/header"
import Sidebar from "components/layout/app-layout/sidebar"

const AppLayout = () => {
  const theme = useTheme()

  return (
    <>
      <Header />
      <Sidebar />
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          display: "flex",
          pt: `${theme.header.height}`,
          [theme.breakpoints.up("lg")]: {
            pl: `${theme.sidebar.width}`,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box flexGrow={1}>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AppLayout
