import { Box, LinearProgress, useTheme } from "@mui/material"
import { useIsFetching } from "@tanstack/react-query"

const FetchingLinearProgress = () => {
  const isFetching = useIsFetching()
  const theme = useTheme()

  return (
    <Box
      sx={{
        mt: theme.header.height,
        height: "6px",
        position: "fixed",
        width: "100%",
        zIndex: 6,
      }}
    >
      {isFetching ? <LinearProgress /> : null}
    </Box>
  )
}

export default FetchingLinearProgress
