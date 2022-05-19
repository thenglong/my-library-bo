import { useCallback, useEffect, useState } from "react"

import { Delete as DeleteIcon } from "@mui/icons-material"
import { Button, useTheme } from "@mui/material"
import MuiImage from "mui-image"
import { useDropzone } from "react-dropzone"
import { useTranslation } from "react-i18next"

import { ReactComponent as ImageUploadImage } from "assets/svgs/image-upload.svg"
import { ImageLabel } from "components/controlled-image-field/controlled-image-field-styled"

interface ControlledImageFieldProps {
  onFileAdded?: (imageFileState?: ImageFileState) => void
  onFileRemoved?: (imageFileState: ImageFileState) => void
}

interface ImageFileState {
  file: File | null
  imagePreviewUrl: string | null
}

const EMPTY_IMAGE_FILE_STATE: ImageFileState = {
  file: null,
  imagePreviewUrl: null,
}

const ControlledImageField = ({
  onFileAdded,
  onFileRemoved,
}: ControlledImageFieldProps) => {
  const [imageFileState, setImageFileState] = useState<ImageFileState>()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles?.[0] || null
    if (!file) return
    setImageFileState((oldImage) => {
      if (oldImage?.imagePreviewUrl) {
        URL.revokeObjectURL(oldImage.imagePreviewUrl)
      }
      return {
        file,
        imagePreviewUrl: URL.createObjectURL(file),
      }
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop,
    accept: {
      image: ["*"],
    },
    maxFiles: 1,
    multiple: false,
  })

  useEffect(() => {
    onFileAdded?.(imageFileState)
  }, [imageFileState, onFileAdded])

  const handleDeleteImage = useCallback(() => {
    if (inputRef.current?.value) inputRef.current.value = ""

    if (imageFileState?.file) {
      onFileRemoved?.(imageFileState)
      setImageFileState(EMPTY_IMAGE_FILE_STATE)
    }
  }, [imageFileState, inputRef, onFileRemoved])

  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <div>
      {!imageFileState?.imagePreviewUrl && (
        <ImageLabel
          /* eslint-disable @typescript-eslint/no-explicit-any */
          {...(getRootProps() as any)}
          sx={{
            ...(isDragActive && {
              outline: `2px solid ${theme.palette.primary.main}`,
            }),
          }}
          animate={{
            scale: isDragActive ? 1.05 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <ImageUploadImage width="100%" />
          <span className="label-text">
            {t("Click here or drag and drop an image")}
          </span>
          <input
            {...getInputProps()}
            type="file"
            name="upload"
            accept="image/*"
            hidden
          />
        </ImageLabel>
      )}

      {imageFileState?.imagePreviewUrl && (
        <ImageLabel sx={{ p: 1 }}>
          <MuiImage
            src={imageFileState?.imagePreviewUrl}
            alt=""
            style={{
              width: "100%",
              borderRadius: theme.shape.borderRadius,
              marginBottom: theme.spacing(1),
            }}
          />
          <Button
            startIcon={<DeleteIcon />}
            size="small"
            onClick={handleDeleteImage}
            color="error"
            variant="outlined"
            sx={{
              alignSelf: "revert",
              height: "max-content",
            }}
          >
            Remove
          </Button>
        </ImageLabel>
      )}
    </div>
  )
}

export default ControlledImageField
