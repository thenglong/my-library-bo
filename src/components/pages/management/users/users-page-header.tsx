import { useState } from "react"

import { AddTwoTone as AddTwoToneIcon } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import CreateUserDialog from "components/pages/management/users/create-user-dialog"

const UsersPageHeader = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const handleOpenCreateUser = () => {
    setOpen(true)
  }

  const handleOpenCloseUser = () => {
    setOpen(false)
  }

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Users")}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              "All aspects related to the app users can be managed from this page"
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
            onClick={handleOpenCreateUser}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t("Create a new user")}
          </Button>
        </Grid>
      </Grid>
      <CreateUserDialog open={open} onClose={handleOpenCloseUser} />
    </>
  )
}

export default UsersPageHeader
