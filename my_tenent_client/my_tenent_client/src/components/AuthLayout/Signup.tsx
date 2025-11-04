import React from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { EXPORTED_THEME } from "../../theme";
import { initialValues, validationSchema } from "../../constants/constants";
import "./AuthForm.css";

interface SignupProps {
  onSignup?: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => void;
  onSwitchToLogin?: () => void;
}

export const Signup: React.FC<SignupProps> = ({
  onSignup,
  onSwitchToLogin,
}) => {
  const theme = EXPORTED_THEME;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate API
        onSignup?.(values.name, values.email, values.password, values.role);
        console.log("Signup successful:", values);
      } catch (error) {
        console.error("Signup failed:", error);
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
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: theme.fonts.primary,
          color: theme.colors.text,
          fontWeight: 600,
          mb: 1,
        }}
      >
        Create Account
      </Typography>

      {/* Full Name */}
      <TextField
        fullWidth
        id="name"
        name="name"
        size="small"
        label="Full Name"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      {/* Email */}
      <TextField
        fullWidth
        id="email"
        name="email"
        size="small"
        label="Email"
        type="email"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "transparent", // 👈 removes white bg
          },
        }}
      />

      {/* Password */}
      <TextField
        fullWidth
        id="password"
        name="password"
        size="small"
        label="Password"
        type="password"
        variant="outlined"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      {/* Confirm Password */}
      <TextField
        fullWidth
        id="confirmPassword"
        size="small"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        variant="outlined"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
      />

      {/* Register As Dropdown */}
      <FormControl
        fullWidth
        variant="outlined"
        error={formik.touched.role && Boolean(formik.errors.role)}
      >
        <InputLabel id="role-label">Register As</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          size="small"
          name="role"
          label="Register As"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <MenuItem value="">Select Role</MenuItem>
          <MenuItem value="Tenant">Tenant</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Super Admin">Super Admin</MenuItem>
        </Select>
        {formik.touched.role && formik.errors.role && (
          <Typography
            variant="caption"
            sx={{ color: theme.colors.error, mt: 0.5 }}
          >
            {formik.errors.role}
          </Typography>
        )}
      </FormControl>

      {/* Submit Button */}
      <Button
        type="submit"
        size="small"
        variant="contained"
        disabled={formik.isSubmitting}
        sx={{
          mt: 2,
          backgroundColor: theme.colors.primary,
          color: theme.colors.surface,
          fontFamily: theme.fonts.primary,
          borderRadius: theme.borderRadius.md,
          "&:hover": {
            backgroundColor: theme.colors.primaryHover || theme.colors.primary,
          },
        }}
      >
        {formik.isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Create Account"
        )}
      </Button>

      {onSwitchToLogin && (
        <Typography
          sx={{
            textAlign: "center",
            mt: 2,
            color: theme.colors.textSecondary,
          }}
        >
          Already have an account?{" "}
          <Button
            onClick={onSwitchToLogin}
            sx={{
              color: theme.colors.primary,
              textTransform: "none",
              fontFamily: theme.fonts.primary,
            }}
          >
            Sign in
          </Button>
        </Typography>
      )}
    </Box>
  );
};
