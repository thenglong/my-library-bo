import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormHelperText,
  Link,
  styled,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import * as yup from "yup";

import ControlledCheckbox from "components/pages/login-page/controlled-checkbox";
import ControlledTextField from "components/pages/login-page/controlled-text-field";

const ImgWrapper = styled("img")(
  ({ theme }) => `
    margin-right: ${theme.spacing(1)};
`
);

const defaultValues = {
  email: "",
  password: "",
  terms: false,
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("The email provided should be a valid email address")
    .max(255)
    .required("The email field is required"),
  password: yup.string().max(255).required("The password field is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must agree to our terms and conditions"),
});

const LoginFirebaseAuth = () => {
  const {
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    control,
  } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  const handleGoogleClick = () => {
    //
  };

  return (
    <>
      <Button
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        variant="outlined"
      >
        <ImgWrapper alt="Google" src="/static/images/logo/google.svg" />
        Sign in with Google
      </Button>
      <Divider
        sx={{
          mt: 4,
          mb: 2,
        }}
      >
        or
      </Divider>
      <form noValidate onSubmit={onSubmit}>
        <ControlledTextField
          isError={Boolean(touchedFields.email && errors.email)}
          label="Email address"
          placeholder="Your email address here..."
          name="email"
          type="email"
          control={control}
          touched={touchedFields.email}
          errorMessage={errors.email?.message}
        />
        <ControlledTextField
          isError={Boolean(touchedFields.password && errors.password)}
          label="Password"
          placeholder="Your password here..."
          name="password"
          type="password"
          control={control}
          touched={touchedFields.password}
          errorMessage={errors.password?.message}
        />

        <Box alignItems="center" display="flex" justifyContent="space-between">
          <ControlledCheckbox
            control={control}
            name="terms"
            label={
              <Typography variant="body2">
                {"I accept the"}{" "}
                <Link component="a" href="#">
                  terms and conditions
                </Link>
                .
              </Typography>
            }
          />

          <Link<typeof RouterLink>
            component={RouterLink}
            to="/account/recover-password"
          >
            <b>Forgot password?</b>
          </Link>
        </Box>

        {Boolean(touchedFields.terms && errors.terms) && (
          <FormHelperText error>{errors.terms?.message}</FormHelperText>
        )}

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
      </form>
    </>
  );
};

export default LoginFirebaseAuth;
