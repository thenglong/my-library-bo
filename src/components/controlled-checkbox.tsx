import { ComponentProps } from "react"

import { Checkbox, FormControlLabel } from "@mui/material"
import { Controller, Control } from "react-hook-form"

interface ControlledCheckboxProps {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  control: Control<any>
  name: string
  label: ComponentProps<typeof FormControlLabel>["label"]
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
  )
}

export default ControlledCheckbox
