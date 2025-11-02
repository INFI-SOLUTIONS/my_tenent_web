import React, { useState } from 'react';
import { EXPORTED_THEME } from '../../theme';
import './AuthForm.css';

interface SignupProps {
  onSignup?: (name: string, email: string, password: string) => void;
  onSwitchToLogin?: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSignup, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = EXPORTED_THEME;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSignup?.(name, email, password);
      console.log('Signup attempt:', { name, email, password });
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label 
          htmlFor="name" 
          style={{ 
            color: theme.colors.text,
            fontFamily: theme.fonts.primary 
          }}
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
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
          placeholder="Create a password"
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
          htmlFor="confirmPassword" 
          style={{ 
            color: theme.colors.text,
            fontFamily: theme.fonts.primary 
          }}
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
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
        {loading ? 'Creating account...' : 'Create Account'}
      </button>

      {onSwitchToLogin && (
        <div className="auth-footer">
          <span style={{ color: theme.colors.textSecondary }}>
            Already have an account?{' '}
          </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="link-button"
            style={{
              color: theme.colors.primary,
              fontFamily: theme.fonts.primary,
            }}
          >
            Sign in
          </button>
        </div>
      )}
    </form>
  );
};

