import { useState } from "react"

import { AddTwoTone as AddTwoToneIcon } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import CreateMemberDialog from "components/pages/management/members/create-member-dialog"

const MembersPageHeader = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const handleOpenCreateMember = () => {
    setOpen(true)
  }

  const handleOpenCloseMember = () => {
    setOpen(false)
  }

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Members")}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              "All aspects related to the app members can be managed from this page"
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
            onClick={handleOpenCreateMember}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t("Create a new member")}
          </Button>
        </Grid>
      </Grid>
      <CreateMemberDialog open={open} onClose={handleOpenCloseMember} />
    </>
  )
}

export default MembersPageHeader
