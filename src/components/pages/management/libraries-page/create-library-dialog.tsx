import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import {
  CheckTwoTone as CheckTwoToneIcon,
  CloseTwoTone as CloseTwoToneIcon,
  CloudUploadTwoTone as CloudUploadTwoToneIcon,
} from "@mui/icons-material"
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as yup from "yup"

import ControlledTextField from "components/controlled-text-field"
import {
  AvatarDanger,
  AvatarSuccess,
  AvatarWrapper,
  BoxUploadWrapper,
} from "components/pages/management/books-page/create-book-dialog-styled"

const defaultValues = {
  name: "",
  address: "",
  description: "",
  phone: "",
  email: "",
}

const validationSchema = yup.object().shape({
  name: yup.string().max(255).required("The name field is required"),
})

interface CreateLibraryDialogProps {
  open: boolean
  onClose: () => void
}

const CreateLibraryDialog = ({ open, onClose }: CreateLibraryDialogProps) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()

  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      image: ["image/jpeg", "image/png"],
    },
  })

  const files = acceptedFiles.map((file, index) => (
    <ListItem disableGutters component="div" key={index}>
      <ListItemText primary={file.name} />
      <b>{file.size} bytes</b>
      <Divider />
    </ListItem>
  ))

  const _handleCreateBookSuccess = () => {
    enqueueSnackbar(t("A new library has been created successfully"), {
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
          {t("Create new library")}
        </Typography>
        <Typography variant="subtitle2">
          {t("Use this dialog window to add a new library")}
        </Typography>
      </DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent
          dividers
          sx={{
            p: 3,
          }}
        >
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              justifyContent="flex-end"
              textAlign={{ sm: "right" }}
            >
              <Box
                pr={3}
                sx={{
                  pt: `${theme.spacing(2)}`,
                  pb: { xs: 1, md: 0 },
                }}
                alignSelf="center"
              >
                <b>{t("Library Name")}:</b>
              </Box>
            </Grid>
            <Grid
              sx={{
                mb: `${theme.spacing(3)}`,
              }}
              item
              xs={12}
              sm={8}
              md={9}
            >
              <ControlledTextField
                isError={Boolean(errors.name)}
                placeholder="Library name title here..."
                name="name"
                control={control}
                errorMessage={errors.name?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              justifyContent="flex-end"
              textAlign={{ sm: "right" }}
            >
              <Box
                pr={3}
                sx={{
                  pt: `${theme.spacing(2)}`,
                  pb: { xs: 1, md: 0 },
                }}
                alignSelf="center"
              >
                <b>{t("Address")}:</b>
              </Box>
            </Grid>
            <Grid
              sx={{
                mb: `${theme.spacing(3)}`,
              }}
              item
              xs={12}
              sm={8}
              md={9}
            >
              <ControlledTextField
                isError={Boolean(errors.address)}
                placeholder="Address here..."
                name="address"
                control={control}
                errorMessage={errors.address?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              justifyContent="flex-end"
              textAlign={{ sm: "right" }}
            >
              <Box
                pr={3}
                sx={{
                  pt: `${theme.spacing(2)}`,
                  pb: { xs: 1, md: 0 },
                }}
                alignSelf="center"
              >
                <b>{t("Description")}:</b>
              </Box>
            </Grid>
            <Grid
              sx={{
                mb: `${theme.spacing(3)}`,
              }}
              item
              xs={12}
              sm={8}
              md={9}
            >
              <ControlledTextField
                isError={Boolean(errors.description)}
                placeholder="Description here..."
                name="description"
                control={control}
                errorMessage={errors.description?.message}
                multiline
                minRows={3}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              justifyContent="flex-end"
              textAlign={{ sm: "right" }}
            >
              <Box
                pr={3}
                sx={{
                  pt: `${theme.spacing(2)}`,
                  pb: { xs: 1, md: 0 },
                }}
                alignSelf="center"
              >
                <b>{t("Phone Number")}:</b>
              </Box>
            </Grid>
            <Grid
              sx={{
                mb: `${theme.spacing(3)}`,
              }}
              item
              xs={12}
              sm={8}
              md={9}
            >
              <ControlledTextField
                isError={Boolean(errors.phone)}
                placeholder="Phone Number here..."
                name="phone"
                control={control}
                errorMessage={errors.phone?.message}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              justifyContent="flex-end"
              textAlign={{ sm: "right" }}
            >
              <Box
                pr={3}
                sx={{
                  pt: `${theme.spacing(2)}`,
                  pb: { xs: 1, md: 0 },
                }}
                alignSelf="center"
              >
                <b>{t("Email")}:</b>
              </Box>
            </Grid>
            <Grid
              sx={{
                mb: `${theme.spacing(3)}`,
              }}
              item
              xs={12}
              sm={8}
              md={9}
            >
              <ControlledTextField
                isError={Boolean(errors.email)}
                placeholder="Email here..."
                name="email"
                control={control}
                errorMessage={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
              <Box
                pr={3}
                sx={{
                  pb: { xs: 1, md: 0 },
                }}
              >
                <b>{t("Logo")}:</b>
              </Box>
            </Grid>
            <Grid
              sx={{
                mb: `${theme.spacing(3)}`,
              }}
              item
              xs={12}
              sm={8}
              md={9}
            >
              <BoxUploadWrapper {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragAccept && (
                  <>
                    <AvatarSuccess variant="rounded">
                      <CheckTwoToneIcon />
                    </AvatarSuccess>
                    <Typography
                      sx={{
                        mt: 2,
                      }}
                    >
                      {t("Drop the files to start uploading")}
                    </Typography>
                  </>
                )}
                {isDragReject && (
                  <>
                    <AvatarDanger variant="rounded">
                      <CloseTwoToneIcon />
                    </AvatarDanger>
                    <Typography
                      sx={{
                        mt: 2,
                      }}
                    >
                      {t("You cannot upload these file types")}
                    </Typography>
                  </>
                )}
                {!isDragActive && (
                  <>
                    <AvatarWrapper variant="rounded">
                      <CloudUploadTwoToneIcon />
                    </AvatarWrapper>
                    <Typography
                      sx={{
                        mt: 2,
                      }}
                    >
                      {t("Drag & drop files here")}
                    </Typography>
                  </>
                )}
              </BoxUploadWrapper>
              {files.length > 0 && (
                <>
                  <Alert
                    sx={{
                      py: 0,
                      mt: 2,
                    }}
                    severity="success"
                  >
                    {t("You have uploaded")} <b>{files.length}</b> {t("files")}!
                  </Alert>
                  <Divider
                    sx={{
                      mt: 2,
                    }}
                  />
                  <List disablePadding component="div">
                    {files}
                  </List>
                </>
              )}
            </Grid>

            <Grid
              sx={{
                mb: `${theme.spacing(3)}`,
                textAlign: "right",
              }}
              item
              xs={12}
            >
              <Button
                sx={{
                  mr: 2,
                }}
                color="secondary"
                size="large"
                variant="outlined"
                onClick={onClose}
              >
                {t("Cancel")}
              </Button>
              <Button
                type="submit"
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                size="large"
              >
                {t("Create Book")}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateLibraryDialog
