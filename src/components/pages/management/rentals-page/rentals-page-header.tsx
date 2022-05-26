import { useState } from "react"

import { AddTwoTone as AddTwoToneIcon } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import CreateRentalDialog from "components/pages/management/rentals-page/create-rental-dialog"

const RentalsPageHeader = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const handleOpenCreateLibrary = () => {
    setOpen(true)
  }

  const handleOpenCloseRental = () => {
    setOpen(false)
  }

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Rental")}
          </Typography>
          <Typography variant="subtitle2">
            {t(
              "All aspects related to the app rental can be managed from this page"
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
            {t("Create a new Rental")}
          </Button>
        </Grid>
      </Grid>
      <CreateRentalDialog open={open} onClose={handleOpenCloseRental} />
    </>
  )
}

export default RentalsPageHeader
