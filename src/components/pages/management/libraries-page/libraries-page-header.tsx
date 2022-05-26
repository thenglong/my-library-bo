import { useState } from "react"

import { AddTwoTone as AddTwoToneIcon } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import CreateLibraryDialog from "components/pages/management/libraries-page/create-library-dialog"

const LibrariesPageHeader = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const handleOpenCreateLibrary = () => {
    setOpen(true)
  }

  const handleOpenCloseLibrary = () => {
    setOpen(false)
  }

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Libraries")}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              "All aspects related to the app library can be managed from this page"
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
            onClick={handleOpenCreateLibrary}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t("Create a new library")}
          </Button>
        </Grid>
      </Grid>
      <CreateLibraryDialog open={open} onClose={handleOpenCloseLibrary} />
    </>
  )
}

export default LibrariesPageHeader
