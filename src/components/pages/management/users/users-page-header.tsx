import { ChangeEvent, useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import {
  AddTwoTone as AddTwoToneIcon,
  CloudUploadTwoTone as CloudUploadTwoToneIcon,
} from "@mui/icons-material"
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Zoom,
  Typography,
  Divider,
  TextField,
  CircularProgress,
  Switch,
  Avatar,
  Autocomplete,
  IconButton,
  Button,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { useSnackbar } from "notistack"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"

import ControlledTextField from "components/controlled-text-field"
import useFirebaseAuthState from "hooks/firebase/use-firebase-auth-state"

const Input = styled("input")({
  display: "none",
})

const AvatarWrapper = styled(Box)(
  ({ theme }) => `

    position: relative;

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
)

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};
    bottom: -${theme.spacing(2)};
    right: -${theme.spacing(2)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
)

const roles = [
  { label: "Administrator", value: "admin" },
  { label: "Subscriber", value: "subscriber" },
  { label: "Customer", value: "customer" },
]

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

const UsersPageHeader = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useFirebaseAuthState()

  const [publicProfile, setPublicProfile] = useState({
    public: true,
  })

  const handlePublicProfile = (event: ChangeEvent<HTMLInputElement>) => {
    setPublicProfile({
      ...publicProfile,
      [event.target.name]: event.target.checked,
    })
  }

  const handleCreateUserOpen = () => {
    setOpen(true)
  }

  const handleCreateUserClose = () => {
    setOpen(false)
  }

  const _handleCreateUserSuccess = () => {
    enqueueSnackbar(t("The user account was created successfully"), {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      TransitionComponent: Zoom,
    })

    setOpen(false)
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
            onClick={handleCreateUserOpen}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t("Create a new user")}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleCreateUserClose}
      >
        <DialogTitle
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t("Add new user")}
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
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label={t("User role")}
                        />
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
                      {t("Public Profile")}
                    </Typography>
                    <Switch
                      checked={publicProfile.public}
                      onChange={handlePublicProfile}
                      name="public"
                      color="primary"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            sx={{
              p: 3,
            }}
          >
            <Button color="secondary" onClick={handleCreateUserClose}>
              {t("Cancel")}
            </Button>
            <Button
              type="submit"
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              variant="contained"
            >
              {t("Add new user")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default UsersPageHeader
