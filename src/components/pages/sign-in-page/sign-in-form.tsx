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
  email: "liz.demo@mailinator.com",
  password: "123123",
  staySignedIn: true,
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .max(255)
    .required("The email field is required"),
  password: yup.string().max(255).required("The password field is required"),
  staySignedIn: yup.boolean(),
})

const SignInForm = () => {
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
          isError={Boolean(touchedFields.email && errors.email)}
          label="Email address"
          placeholder="Your email address here..."
          name="email"
          type="email"
          control={control}
          errorMessage={errors.email?.message}
        />
        <ControlledTextField
          isError={Boolean(touchedFields.password && errors.password)}
          label="Password"
          placeholder="Your password here..."
          name="password"
          type="password"
          control={control}
          errorMessage={errors.password?.message}
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

export default SignInForm
