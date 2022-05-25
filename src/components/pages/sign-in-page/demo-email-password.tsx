import { Alert, Tooltip } from "@mui/material"

const DemoEmailPassword = () => {
  return (
    <Tooltip title="Used only for testing!">
      <Alert severity="warning" sx={{ mt: 1, justifyContent: "center" }}>
        For demo purposes please sign in with <strong>google</strong> account
        below
      </Alert>
    </Tooltip>
  )
}

export default DemoEmailPassword
