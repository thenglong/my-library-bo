import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import {
  CheckTwoTone as CheckTwoToneIcon,
  CloseTwoTone as CloseTwoToneIcon,
  CloudUploadTwoTone as CloudUploadTwoToneIcon,
} from "@mui/icons-material"
import {
  Alert,
  Autocomplete,
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
  TextField,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import ReactQuill from "react-quill"
import * as yup from "yup"

import ControlledTextField from "components/controlled-text-field"
import {
  AvatarDanger,
  AvatarSuccess,
  AvatarWrapper,
  BoxUploadWrapper,
  EditorWrapper,
} from "components/pages/management/books-page/create-book-dialog-styled"

const bookCategories = [
  { title: "Development" },
  { title: "Design Book" },
  { title: "Marketing Research" },
  { title: "Software" },
]

interface CreateBookDialogProps {
  isOpen: boolean
  onClose: () => void
}

const defaultValues = {
  title: "",
  author: "",
  edition: "",
  publisher: "",
}

const validationSchema = yup.object().shape({
  title: yup.string().max(255).required("The title field is required"),
})

const CreateBookDialog = ({ isOpen, onClose }: CreateBookDialogProps) => {
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
    enqueueSnackbar(t("A new book has been created successfully"), {
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
    <Dialog fullWidth maxWidth="md" open={isOpen} onClose={onClose}>
      <DialogTitle
        sx={{
          p: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t("Create new book")}
        </Typography>
        <Typography variant="subtitle2">
          {t("Use this dialog window to add a new book")}
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
                <b>{t("Book title")}:</b>
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
                isError={Boolean(errors.title)}
                placeholder="Book title here..."
                name="title"
                control={control}
                errorMessage={errors.title?.message}
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
                <b>{t("Author")}:</b>
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
                isError={Boolean(errors.author)}
                placeholder="Author here..."
                name="author"
                control={control}
                errorMessage={errors.author?.message}
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
                <b>{t("Edition")}:</b>
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
                isError={Boolean(errors.edition)}
                placeholder="Edition here..."
                name="edition"
                control={control}
                errorMessage={errors.edition?.message}
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
                <b>{t("Publisher")}:</b>
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
                isError={Boolean(errors.publisher)}
                placeholder="Publisher here..."
                name="publisher"
                control={control}
                errorMessage={errors.publisher?.message}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
              <Box
                pr={3}
                sx={{
                  pb: { xs: 1, md: 0 },
                }}
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
              <EditorWrapper>
                <ReactQuill />
              </EditorWrapper>
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
                <b>{t("Categories")}:</b>
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
              <Autocomplete
                multiple
                sx={{
                  m: 0,
                }}
                limitTags={2}
                options={bookCategories}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    placeholder={t("Select book tags...")}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: "right" }}>
              <Box
                pr={3}
                sx={{
                  pb: { xs: 1, md: 0 },
                }}
              >
                <b>{t("Cover")}:</b>
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
                color="secondary"
                size="large"
                variant="outlined"
                onClick={onClose}
              >
                {t("Cancel")}
              </Button>
              <Button
                sx={{
                  mr: 2,
                }}
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

export default CreateBookDialog
