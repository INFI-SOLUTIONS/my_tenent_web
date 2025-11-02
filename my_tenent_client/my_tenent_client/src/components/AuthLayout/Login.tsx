import React, { useState } from 'react';
import { EXPORTED_THEME } from '../../theme';
import './AuthForm.css';

interface LoginProps {
  onLogin?: (email: string, password: string) => void;
  onSwitchToSignup?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = EXPORTED_THEME;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin?.(email, password);
      console.log('Login attempt:', { email, password });
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label 
          htmlFor="email" 
          style={{ 
            color: theme.colors.text,
            fontFamily: theme.fonts.primary 
          }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={loading}
          style={{
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.md,
            fontFamily: theme.fonts.primary,
          }}
        />
      </div>

      <div className="form-group">
        <label 
          htmlFor="password" 
          style={{ 
            color: theme.colors.text,
            fontFamily: theme.fonts.primary 
          }}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          disabled={loading}
          style={{
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.md,
            fontFamily: theme.fonts.primary,
          }}
        />
      </div>

      {error && (
        <div 
          className="error-message"
          style={{ 
            color: theme.colors.error,
            backgroundColor: `${theme.colors.error}15`,
            borderRadius: theme.borderRadius.md 
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="auth-button"
        style={{
          backgroundColor: theme.colors.primary,
          color: theme.colors.surface,
          fontFamily: theme.fonts.primary,
          borderRadius: theme.borderRadius.md,
          border: 'none',
        }}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      {onSwitchToSignup && (
        <div className="auth-footer">
          <span style={{ color: theme.colors.textSecondary }}>
            Don't have an account?{' '}
          </span>
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="link-button"
            style={{
              color: theme.colors.primary,
              fontFamily: theme.fonts.primary,
            }}
          >
            Sign up
          </button>
        </div>
      )}
    </form>
  );
};

