import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { CloudUploadTwoTone as CloudUploadTwoToneIcon } from "@mui/icons-material"
import { DatePicker } from "@mui/lab"
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
  Switch,
  TextField,
  Typography,
  Zoom,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"

import ControlledTextField from "components/controlled-text-field"
import {
  AvatarWrapper,
  ButtonUploadWrapper,
  Input,
} from "components/pages/management/members/create-member-dialog-styled"
import { UserRole } from "typings/api-model"

const roles = [UserRole.ADMIN, UserRole.LIBRARIAN, UserRole.CUSTOMER]

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  description: "",
  dob: new Date() as Date | null,
  pob: "",
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().max(255).required("The first name field is required"),
  lastName: Yup.string().max(255).required("The last name field is required"),
  address: Yup.string(),
  description: Yup.string(),
  phone: Yup.string(),
  dob: Yup.mixed(),
  pob: Yup.mixed(),
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

const CreateMemberDialog = ({ open, onClose }: CreateUserDialogProps) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

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
    watch,
    setValue,
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
                </Grid>{" "}
                <Grid item xs={12}>
                  <ControlledTextField
                    isError={Boolean(errors.password)}
                    type="password"
                    label={t("Password")}
                    name="password"
                    control={control}
                    errorMessage={errors.password?.message}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    value={watch("dob")}
                    onChange={(newValue) => {
                      setValue("dob", newValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={t("Select date...")}
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    disablePortal
                    options={roles}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        label={t("User role")}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledTextField
                    isError={Boolean(errors.phone)}
                    label={t("Phone Number")}
                    name="phone"
                    control={control}
                    errorMessage={errors.phone?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledTextField
                    isError={Boolean(errors.address)}
                    label={t("Address")}
                    name="address"
                    control={control}
                    errorMessage={errors.address?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ControlledTextField
                    isError={Boolean(errors.description)}
                    label={t("Description")}
                    name="description"
                    control={control}
                    errorMessage={errors.description?.message}
                    multiline
                    minRows={3}
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
                  <Avatar variant="rounded" src="" />
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
              <Divider
                flexItem
                sx={{
                  m: 4,
                }}
              />
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Typography
                  variant="h4"
                  sx={{
                    pb: 1,
                  }}
                >
                  {t("Active")}
                </Typography>
                <Switch name="public" color="primary" />
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

export default CreateMemberDialog
