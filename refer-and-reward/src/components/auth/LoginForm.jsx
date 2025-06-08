import {
  Paper,
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setMessage, setStatus } from "@/store/slices/UserSlice";
import { fetchUserDetails } from "@/store/thunk/UserDetailsThunk";
import { authService } from "@/service/auth";
import { setToken } from "@/service/authUtils";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));
/**********For theme code*****************/
// const darkTheme = createTheme({ palette: { mode: "dark" } });
// const lightTheme = createTheme({ palette: { mode: "light" } });

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Enter email address is not a valid email address."
    )
    .required("Email field is Required"),
  password: Yup.string().trim().required("Password field is required"),
});

const LoginForm = ({ title, subtitle, subtext }) => {
  const message = useSelector((state) => state.user.message);
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const router = useRouter();
  const dispatch = useDispatch();
  const loginHandler = async (values) => {
    authService
      .login(values)
      .then(async (res) => {
        const data = await res.data;
        if (res.status === 200) {
          setToken(data.token);
          dispatch(setMessage(data.message));
          dispatch(fetchUserDetails(data)).then((res) => {
            if (res.payload.role === "1") {
              setTimeout(() => {
                router.push("/dashboard");
              }, 1000);
            } else {
              setTimeout(() => {
                router.push("/admin/dashboard");
              }, 1000);
            }
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Display error message from the server
          console.error("Error:", error.response.data.error.message);
          setTimeout(() => {
            dispatch(setStatus(error.response.data.error.message));
          }, 300);
        } else {
          // Handle unexpected errors
          console.error("Unexpected Error:", error.message);
          setTimeout(() => {
            dispatch(
              setStatus("An unexpected error occurred. Please try again later.")
            );
          }, 300);
        }
      });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { resetForm }) => {
      loginHandler(values);
      // Then reset the form
      resetForm();
    },
  });
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        {title ? (
          <Typography textAlign="center" fontWeight="700" variant="h2" mb={2}>
            {title}
          </Typography>
        ) : null}
        <Box mb={3}>
          {" "}
          {message !== "" ? <Alert severity="success">{message}</Alert> : null}
        </Box>
        <Box mb={3}>
          {" "}
          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
        </Box>
        <Box method="POST" component="form" onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              id="email-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="pass-basic"
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Stack>
          <br />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
