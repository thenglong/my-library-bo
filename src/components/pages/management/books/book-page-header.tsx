import { useCallback, useState } from "react"

import { AddTwoTone as AddTwoToneIcon } from "@mui/icons-material"
import { Button, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

import CreateBookDialog from "components/pages/management/books/create-book-dialog"

function BookPageHeader() {
  const { t } = useTranslation()
  const [isCreateBookDialogOpen, setIsCreateBookDialogOpen] = useState(false)

  const handleOpenCreateBookDialog = useCallback(
    () => setIsCreateBookDialogOpen(true),
    []
  )
  const handleCloseCreateBookDialog = useCallback(
    () => setIsCreateBookDialogOpen(false),
    []
  )

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Books")}
          </Typography>
          <Typography variant="subtitle2">
            {t("These are the active books")}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
            onClick={handleOpenCreateBookDialog}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t("Create a new book")}
          </Button>
        </Grid>
      </Grid>

      <CreateBookDialog
        isOpen={isCreateBookDialogOpen}
        onClose={handleCloseCreateBookDialog}
      />
    </>
  )
}

export default BookPageHeader
