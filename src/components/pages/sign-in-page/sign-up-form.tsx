import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as yup from "yup"

import ControlledImageField from "components/controlled-image-field/controlled-image-field"
import ControlledTextField from "components/controlled-text-field"

const defaultValues = {
  libraryName: "",
  libraryAddress: "",
  libraryPhone: "",
  libraryEmail: "",
  libraryLogo: "",
  adminUserEmail: "",
  adminUserPassword: "",
  adminUserPasswordConfirm: "",
  adminUserFirstName: "",
  adminUserLastName: "",
}

const validationSchema = yup.object().shape({
  libraryName: yup.string().required("The library name is required"),
  libraryAddress: yup.string().required("The address is required"),
  libraryPhone: yup.string().required("The phone number is required"),
  libraryEmail: yup
    .string()
    .email("Please enter a valid email")
    .max(255)
    .required("The email field is required"),
  libraryLogo: yup.mixed().required("The logo is required"),
  adminUserEmail: yup
    .string()
    .email("Please enter a valid email")
    .max(255)
    .required("The email field is required"),
  adminUserPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255, "Password must be less than 255 characters")
    .required("The password is required"),
  adminUserFirstName: yup.string().required("The first name is required"),
  adminUserLastName: yup.string().required("The last name is required"),
})

const SignUpForm = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })
  const { t } = useTranslation()

  const onSubmit = handleSubmit((_data) => {
    // TODO
  })

  return (
    <>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={onSubmit}
        noValidate
        mt={1}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h4" mb={1}>
            {t("Library Info.")}
          </Typography>

          <ControlledTextField
            isError={Boolean(errors.libraryName)}
            label="Library Name"
            name="libraryName"
            control={control}
            errorMessage={errors.libraryName?.message}
          />
          <ControlledTextField
            isError={Boolean(errors.libraryAddress)}
            label="Library Address"
            name="libraryAddress"
            control={control}
            errorMessage={errors.libraryAddress?.message}
          />

          <ControlledTextField
            isError={Boolean(errors.libraryPhone)}
            label="Library Phone Number"
            name="libraryPhone"
            control={control}
            errorMessage={errors.libraryPhone?.message}
          />

          <ControlledTextField
            isError={Boolean(errors.libraryEmail)}
            label="Library Email Address"
            name="libraryEmail"
            type="email"
            control={control}
            errorMessage={errors.libraryEmail?.message}
          />

          <ControlledImageField />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" mb={1}>
            {t("Admin User Credential.")}
          </Typography>
          <ControlledTextField
            isError={Boolean(errors.adminUserEmail)}
            label="Admin User Email Address"
            name="adminUserEmail"
            type="email"
            control={control}
            errorMessage={errors.adminUserEmail?.message}
          />

          <ControlledTextField
            isError={Boolean(errors.adminUserPassword)}
            label="Admin User Password"
            name="adminUserPassword"
            type="password"
            control={control}
            errorMessage={errors.adminUserPassword?.message}
          />

          <ControlledTextField
            isError={Boolean(errors.adminUserFirstName)}
            label="Admin User First Name"
            name="adminUserFirstName"
            control={control}
            errorMessage={errors.adminUserFirstName?.message}
          />

          <ControlledTextField
            isError={Boolean(errors.adminUserLastName)}
            label="Admin User Last Name"
            name="adminUserLastName"
            control={control}
            errorMessage={errors.adminUserLastName?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <Box width="100%" textAlign="right">
            <Button
              sx={{
                mt: 3,
                width: "max-content",
                display: "inline-flex",
                ml: "auto",
              }}
              color="primary"
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              size="large"
              fullWidth
              type="submit"
              variant="contained"
            >
              {t("Request Access and create library")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default SignUpForm
