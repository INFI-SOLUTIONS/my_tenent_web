import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button, Typography } from "@mui/material";
import { EXPORTED_THEME } from "../theme";

export const ForgotPassword: React.FC = () => {
  const theme = EXPORTED_THEME;

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert(`Password reset link sent to ${values.email}`);
        resetForm();
      } catch (error) {
        console.error("Error sending reset link:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      className="auth-form"
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "transparent",
          color: theme.colors.text,
        },
        "& .MuiInputLabel-root": {
          color: theme.colors.textSecondary,
          fontFamily: theme.fonts.primary,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.colors.border,
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: theme.colors.text,
          fontFamily: theme.fonts.primary,
          textAlign: "center",
          mb: 2,
        }}
      >
        Forgot Password
      </Typography>

      <Typography
        sx={{
          color: theme.colors.textSecondary,
          textAlign: "center",
          mb: 3,
          fontFamily: theme.fonts.primary,
        }}
      >
        Enter your registered email to receive a reset link.
      </Typography>

      {/* Email Field */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          mt: 3,
        }}
      >
        <TextField
          id="email"
          name="email"
          label="Email"
          size="small"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
          sx={{ width: "300px" }} // 👈 smaller width
        />

        <Button
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting}
          sx={{
            mt: 2,
            width: "300px", // 👈 match width
            backgroundColor: theme.colors.primary,
            color: theme.colors.surface,
            fontFamily: theme.fonts.primary,
            borderRadius: theme.borderRadius.md,
            "&:hover": { backgroundColor: theme.colors.primaryDark },
          }}
        >
          {formik.isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
