import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { CloudUploadTwoTone as CloudUploadTwoToneIcon } from "@mui/icons-material"
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  Zoom,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"

import ControlledTextField from "components/controlled-text-field"
import useFirebaseAuthState from "hooks/firebase/use-firebase-auth-state"
import { UserRole } from "typings/api-model"

import {
  AvatarWrapper,
  ButtonUploadWrapper,
  Input,
} from "./create-user-dialog-styled"

const roles = [UserRole.ADMIN, UserRole.LIBRARIAN, UserRole.CUSTOMER]

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().max(255).required("The first name field is required"),
  lastName: Yup.string().max(255).required("The last name field is required"),
  email: Yup.string()
    .email("The email provided should be a valid email address")
    .max(255)
    .required("The email field is required"),
  password: Yup.string().max(255).required("The password field is required"),
})

interface CreateUserDialogProps {
  open: boolean
  onClose: () => void
}

const CreateUserDialog = ({ open, onClose }: CreateUserDialogProps) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useFirebaseAuthState()

  const _handleCreateUserSuccess = () => {
    enqueueSnackbar(t("The user account was created successfully"), {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      TransitionComponent: Zoom,
    })

    onClose()
  }

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = handleSubmit((_data) => {
    //
  })

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          p: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t("Create a new user")}
        </Typography>
        <Typography variant="subtitle2">
          {t(
            "Fill in the fields below to create and add a new user to the site"
          )}
        </Typography>
      </DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent
          dividers
          sx={{
            p: 3,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ControlledTextField
                    isError={Boolean(errors.firstName)}
                    label={t("First name")}
                    name="firstName"
                    control={control}
                    errorMessage={errors.firstName?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ControlledTextField
                    isError={Boolean(errors.lastName)}
                    label={t("Last name")}
                    name="lastName"
                    control={control}
                    errorMessage={errors.lastName?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledTextField
                    isError={Boolean(errors.email)}
                    label={t("Email address")}
                    name="email"
                    control={control}
                    errorMessage={errors.email?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledTextField
                    isError={Boolean(errors.password)}
                    label={t("Password")}
                    name="password"
                    control={control}
                    errorMessage={errors.password?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    disablePortal
                    options={roles}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth label={t("User role")} />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={5} justifyContent="center">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                mt={3}
              >
                <AvatarWrapper>
                  <Avatar
                    variant="rounded"
                    alt={user?.displayName || ""}
                    src={user?.photoURL || ""}
                  />
                  <ButtonUploadWrapper>
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      name="icon-button-file"
                      type="file"
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span" color="primary">
                        <CloudUploadTwoToneIcon />
                      </IconButton>
                    </label>
                  </ButtonUploadWrapper>
                </AvatarWrapper>
                <Divider
                  flexItem
                  sx={{
                    m: 4,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
          }}
        >
          <Button color="secondary" onClick={onClose}>
            {t("Cancel")}
          </Button>
          <Button
            type="submit"
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            disabled={isSubmitting}
            variant="contained"
          >
            {t("Create")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateUserDialog
