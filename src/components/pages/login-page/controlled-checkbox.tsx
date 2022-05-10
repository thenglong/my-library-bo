import { ComponentProps } from "react";

import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";

interface ControlledCheckboxProps {
  name: string;
  control: Control<any>;
  label: ComponentProps<typeof FormControlLabel>["label"];
}

const ControlledCheckbox = ({
  control,
  name,
  label,
}: ControlledCheckboxProps) => {
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              color="primary"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      }
      label={label}
    />
  );
};

export default ControlledCheckbox;
