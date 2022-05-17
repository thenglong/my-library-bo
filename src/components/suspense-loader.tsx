import { useEffect } from "react"

import { Box, CircularProgress, useTheme } from "@mui/material"
import NProgress from "nprogress"

NProgress.settings.showSpinner = false

const SuspenseLoader = () => {
  const theme = useTheme()

  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  }, [])

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={`calc(100vh - ${theme.header.height})`}
      width="100%"
    >
      <CircularProgress size={64} disableShrink thickness={3} />
    </Box>
  )
}

export default SuspenseLoader
