import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AuthLayout, Login, Signup } from "./components/AuthLayout";
import { Home } from "../src/pages/Home";
import { EXPORTED_THEME } from "./theme";

import "./App.css";
import ForgotPassword from "./pages/ForgotPassword";

type AuthMode = "login" | "signup";

function AuthWrapper() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const theme = EXPORTED_THEME;
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    console.log("Login successful:", email);
    // ✅ After login, navigate to Home page
    navigate("/home");
  };

  const handleSignup = (name: string, email: string, password: string) => {
    console.log("Signup successful:", name, email);
    // For signup, you can also navigate to /home if desired
    navigate("/home");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      {authMode === "login" ? (
        <AuthLayout
          title={`${theme.name} Theme`}
          subtitle="Sign in to your account"
        >
          <Login
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthMode("signup")}
          />
        </AuthLayout>
      ) : (
        <AuthLayout title="MY TENANTS" subtitle="Join us today">
          <Signup
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthMode("login")}
          />
        </AuthLayout>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthWrapper />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
