import { useState } from 'react';
import { AuthLayout, Login, Signup } from './components/AuthLayout';
import { EXPORTED_THEME } from './theme';
import './App.css';

type AuthMode = 'login' | 'signup';

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const theme = EXPORTED_THEME;

  const handleLogin = (email: string, password: string) => {
    console.log('Login successful:', email);
    // Add your login logic here
  };

  const handleSignup = (name: string, email: string, password: string) => {
    console.log('Signup successful:', name, email);
    // Add your signup logic here
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        color: theme.colors.text
      }}
    >
      {authMode === 'login' ? (
        <AuthLayout
          title={`${theme.name} Theme`}
          subtitle="Sign in to your account"
        >
          <Login
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthMode('signup')}
          />
        </AuthLayout>
      ) : (
        <AuthLayout
          title="Create Account"
          subtitle="Join us today"
        >
          <Signup
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        </AuthLayout>
      )}
    </div>
  );
}

export default App;
