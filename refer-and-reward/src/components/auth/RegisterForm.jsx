import React from "react";
import { Box, Typography, Button, TextField, Alert } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import theme from "../../../utils/theme";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "@/store/slices/UserSlice";
import { authService } from "@/service/auth";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()

    .min(2, "Too Short!")

    .max(50, "The first name must not be more than 50 characters")

    .required("The First Name is required"),
  lastName: Yup.string()
    .trim()

    .min(2, "Too Short!")

    .max(50, "The Last name must not be more than 50 characters")

    .required("The Last Name is required"),

  phone: Yup.string()
    .required("required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "The phone number is not valid"
    )
    .min(10, "to short")
    .max(10, "to long"),

  email: Yup.string()
    .trim()
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Enter email address is not a valid email address."
    )
    .required("An Email is Required"),
  password: Yup.string()
    .trim()
    .min(6, "The password must be at least 6 characters")
    .required("The password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$#!%*?&.])[A-Za-z\d$@$#!%*?&.]{6,20}$/,
      "Must have atleast one uppercase, one lowercase letter, one number and At least one special character "
    ),

  address: Yup.string().trim().required("Address is required"),
});

const AuthRegister = ({ title }) => {
  const message = useSelector((state) => state.user.message);
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const dispatch = useDispatch();
  const router = useRouter();
  const signupHandle = async (values) => {
    authService
      .register(values)
      .then(async (res) => {
        const data = await res.data;
        if (data.statusCode === 200) {
          dispatch(setMessage(`${data.message}, Please Login Again.`));
          setTimeout(() => {
            router.push("/");
          }, 1000);
          return { ...data };
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Display error message from the server
          console.error("Error:", error.response.data.error.message);

          // Set a user-friendly error message
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm }) => {
      signupHandle({ ...values, promocode: router.query.code });
      resetForm();
    },
  });
  return (
    <>
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
        <Stack spacing={3} mb={3}>
          <Stack spacing={3} direction="row">
            <TextField
              label="First Name"
              type="text"
              id="firstName"
              variant="outlined"
              fullWidth
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              label="Last Name"
              id="lastName"
              type="text"
              variant="outlined"
              fullWidth
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Stack>
          <TextField
            label="Email Address"
            id="email"
            type="text"
            variant="outlined"
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            label="Phone Number"
            type="text"
            id="phone"
            variant="outlined"
            fullWidth
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            label="Address"
            id="address"
            variant="outlined"
            type="text"
            fullWidth
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
        </Stack>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          fullWidth
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
};

export default AuthRegister;
