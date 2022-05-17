import { yupResolver } from "@hookform/resolvers/yup"
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Link,
  styled,
  Typography,
} from "@mui/material"
import { useForm } from "react-hook-form"
import { Link as RouterLink } from "react-router-dom"
import * as yup from "yup"

import { ReactComponent as GoogleLogo } from "assets/svgs/google.svg"
import ControlledCheckbox from "components/controlled-checkbox"
import ControlledTextField from "components/controlled-text-field"
import DemoEmailPassword from "components/pages/sign-in-page/demo-email-password"
import useSignInWithEmailAndPassword from "hooks/firebase/use-sign-in-with-email-and-password"
import useSignInGooglePopup from "hooks/firebase/use-sign-in-with-google-popup"

const GoogleLogoWrapper = styled(GoogleLogo)(
  ({ theme }) => `
    margin-right: ${theme.spacing(1)};
`
)

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
    formState: { errors, touchedFields, isSubmitting },
    control,
  } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const { signInAsync } = useSignInWithEmailAndPassword()
  const onSubmit = handleSubmit((data) => signInAsync(data))

  const { signIn: signInWithGoogle } = useSignInGooglePopup()

  return (
    <>
      <form noValidate onSubmit={onSubmit}>
        <ControlledTextField
          isError={Boolean(touchedFields.libraryName && errors.libraryName)}
          label="Library Name"
          name="libraryName"
          control={control}
          touched={touchedFields.libraryName}
          errorMessage={errors.libraryName?.message}
        />
        <ControlledTextField
          isError={Boolean(
            touchedFields.libraryAddress && errors.libraryAddress
          )}
          label="Library Address"
          name="libraryAddress"
          control={control}
          touched={touchedFields.libraryAddress}
          errorMessage={errors.libraryAddress?.message}
        />

        <ControlledTextField
          isError={Boolean(touchedFields.libraryPhone && errors.libraryPhone)}
          label="Library Phone Number"
          name="libraryPhone"
          control={control}
          touched={touchedFields.libraryPhone}
          errorMessage={errors.libraryPhone?.message}
        />

        <Box alignItems="center" display="flex" justifyContent="space-between">
          <ControlledCheckbox
            control={control}
            name="staySignedIn"
            label={
              <Typography variant="body2" fontWeight={700}>
                Stay signed in
              </Typography>
            }
          />

          <Link<typeof RouterLink>
            component={RouterLink}
            to="/forgot-password" // TODO: forgot password page
          >
            <strong>Forgot password?</strong>
          </Link>
        </Box>

        <Button
          sx={{
            mt: 3,
          }}
          color="primary"
          startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
          disabled={isSubmitting}
          size="large"
          fullWidth
          type="submit"
          variant="contained"
        >
          Sign in
        </Button>
        <DemoEmailPassword />

        <Divider
          sx={{
            mt: 4,
            mb: 2,
          }}
        >
          or
        </Divider>

        <Button
          fullWidth
          onClick={() => signInWithGoogle()}
          size="large"
          variant="outlined"
        >
          <GoogleLogoWrapper />
          Sign in with Google
        </Button>
      </form>
    </>
  )
}

export default SignUpForm
