import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react"

import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import { Control } from "react-hook-form/dist/types/form"
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
}

const ControlledTextField = ({
  control,
  placeholder,
  name,
  label,
  type,
  isError,
  errorMessage,
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
          helperText={t(errorMessage || "")}
          label={t(label || "")}
          placeholder={t(placeholder || "")}
          margin="normal"
          type={inputType}
          variant="outlined"
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
