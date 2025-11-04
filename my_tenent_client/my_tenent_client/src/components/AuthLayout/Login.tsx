import React from "react";
import { useFormik } from "formik";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { EXPORTED_THEME } from "../../theme";
import { Link as RouterLink } from "react-router-dom";
import {
  loginInitialValues,
  loginValidationSchema,
} from "../../constants/constants";
import "./AuthForm.css";

interface LoginProps {
  onLogin?: (email: string, password: string) => void;
  onSwitchToSignup?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToSignup }) => {
  const theme = EXPORTED_THEME;

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate API
        onLogin?.(values.email, values.password);
        console.log("Login attempt:", values);
      } catch (err) {
        console.error("Login failed");
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
          backgroundColor: "transparent", // no white bg
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
        Sign In
      </Typography>

      {/* Email */}
      <TextField
        fullWidth
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
      />

      {/* Password */}
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        size="small"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={formik.isSubmitting}
        sx={{
          mt: 2,
          backgroundColor: theme.colors.primary,
          color: theme.colors.surface,
          fontFamily: theme.fonts.primary,
          borderRadius: theme.borderRadius.md,
          "&:hover": { backgroundColor: theme.colors.primaryDark },
        }}
      >
        {formik.isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
      <Link
        component={RouterLink}
        to="/forgot-password"
        underline="hover"
        sx={{
          color: theme.colors.primary,
          fontFamily: theme.fonts.primary,
          fontSize: "0.9rem",
        }}
        // onClick={(e) => {
        //   e.preventDefault();
        //   console.log("Forgot password clicked");
        // }}
      >
        Forgot Password?
      </Link>

      {onSwitchToSignup && (
        <Box textAlign="center" mt={2}>
          <Typography
            sx={{
              color: theme.colors.textSecondary,
              fontFamily: theme.fonts.primary,
            }}
          >
            Don’t have an account?{" "}
            <Button
              variant="text"
              onClick={onSwitchToSignup}
              sx={{
                color: theme.colors.primary,
                fontFamily: theme.fonts.primary,
                textTransform: "none",
              }}
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      )}
    </Box>
  );
};
