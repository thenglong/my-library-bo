import { Alert, Tooltip } from "@mui/material"

const DemoEmailPassword = () => {
  return (
    <Tooltip title="Used only for testing!">
      <Alert severity="warning" sx={{ mt: 1, justifyContent: "center" }}>
        Use <b>liz.demo@mailinator.com</b> and password <b>123123</b>
      </Alert>
    </Tooltip>
  )
}

export default DemoEmailPassword
