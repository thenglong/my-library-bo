import { Box, LinearProgress, useTheme } from "@mui/material"
import { useIsFetching } from "react-query"

const FetchingLinearProgress = () => {
  const isFetching = useIsFetching()
  const theme = useTheme()

  return (
    <Box sx={{ mt: theme.header.height, height: "6px" }}>
      {isFetching ? <LinearProgress /> : null}
    </Box>
  )
}

export default FetchingLinearProgress
