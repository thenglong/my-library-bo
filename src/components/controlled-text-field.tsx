import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react"

import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { Controller, Control } from "react-hook-form"
import { useTranslation } from "react-i18next"

interface ControlledTextFieldProps {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  control: Control<any>
  name: string
  label?: string
  placeholder?: string
  type?: InputHTMLAttributes<HTMLInputTypeAttribute>["type"]
  isError: boolean
  errorMessage?: string
  multiline?: boolean
  minRows?: number
}

const ControlledTextField = ({
  control,
  placeholder,
  name,
  label,
  type,
  isError,
  errorMessage,
  multiline,
  minRows,
}: ControlledTextFieldProps) => {
  const [inputType, setInputType] = useState(type)

  const togglePasswordVisibility = useCallback(() => {
    setInputType((prevInputType) =>
      prevInputType === "password" ? "text" : "password"
    )
  }, [])

  const { t } = useTranslation()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          error={isError}
          fullWidth
          multiline={multiline}
          helperText={t(errorMessage || "")}
          label={t(label || "")}
          placeholder={t(placeholder || "")}
          margin="normal"
          type={inputType}
          variant="outlined"
          minRows={minRows}
          InputProps={{
            endAdornment:
              type === "password" ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {inputType === "text" ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
        />
      )}
    />
  )
}

export default ControlledTextField
