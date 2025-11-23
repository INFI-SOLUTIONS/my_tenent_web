import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
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
import axiosInstance from "../../axios/axios";
import { EXPORTED_THEME } from "../../theme";
import { ENDPOINTS } from "../../utils/endPoints";
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
  // onSignup,
  onSwitchToLogin,
}) => {
  const theme = EXPORTED_THEME;

  const formik = useFormik({
    initialValues: {
      role: "",
      password: "",
      name: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(ENDPOINTS.SIGNUP, {
          fullName: values.name.trim(),
          email: values.email.trim(),
          password: values.password.trim(),
          role: values.role.trim(),
        });
        toast.success(response?.data?.message || "Registration successfull");
        console.log(response, "res====");
      } catch (error: any) {
        throw error.response?.data || { message: "Signup failed" };
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
          <MenuItem value="tenant">Tenant</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="super admin">Super Admin</MenuItem>
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
