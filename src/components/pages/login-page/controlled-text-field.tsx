import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";

interface ControlledTextFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  type?: InputHTMLAttributes<HTMLInputTypeAttribute>["type"];
  touched?: boolean;
  isError: boolean;
  errorMessage?: string;
}

const ControlledTextField = ({
  control,
  placeholder,
  name,
  label,
  type,
  touched = false,
  isError,
  errorMessage,
}: ControlledTextFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          error={isError}
          fullWidth
          helperText={touched && errorMessage}
          label={label}
          placeholder={placeholder}
          margin="normal"
          type={type}
          variant="outlined"
        />
      )}
    />
  );
};

export default ControlledTextField;
