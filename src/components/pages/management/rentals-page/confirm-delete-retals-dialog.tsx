import { Close as CloseIcon } from "@mui/icons-material"
import { Box, Button, Typography, Zoom } from "@mui/material"
import { useSnackbar } from "notistack"
import { useTranslation } from "react-i18next"

import {
  DialogWrapper,
  ErrorAvatar,
  ErrorButton,
} from "components/pages/management/users/confirm-delete-user-dialog-styled"
import Transition from "components/transition"
import useRentalActions from "hooks/redux/use-rental-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"

const ConfirmDeleteRetalsDialog = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()

  const { isConfirmDeleteModalOpen } = useTypedSelector((state) => state.rental)

  const { closeConfirmDeleteModal } = useRentalActions()

  const handleDeleteCompleted = () => {
    closeConfirmDeleteModal()
    enqueueSnackbar(t("The rental has been removed"), {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      TransitionComponent: Zoom,
    })
  }

  return (
    <DialogWrapper
      open={isConfirmDeleteModalOpen}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      keepMounted
      onClose={closeConfirmDeleteModal}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p={5}
      >
        <ErrorAvatar>
          <CloseIcon />
        </ErrorAvatar>

        <Typography
          align="center"
          sx={{
            py: 4,
            px: 6,
          }}
          variant="h3"
        >
          {t("Are you sure you want to permanently delete rental")}?
        </Typography>

        <Box>
          <Button
            variant="text"
            size="large"
            sx={{
              mx: 1,
            }}
            onClick={closeConfirmDeleteModal}
          >
            {t("Cancel")}
          </Button>
          <ErrorButton
            onClick={handleDeleteCompleted}
            size="large"
            sx={{
              mx: 1,
              px: 3,
            }}
            variant="contained"
          >
            {t("Delete")}
          </ErrorButton>
        </Box>
      </Box>
    </DialogWrapper>
  )
}

export default ConfirmDeleteRetalsDialog
