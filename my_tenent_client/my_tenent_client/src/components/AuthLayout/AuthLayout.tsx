import React, { ReactNode } from 'react';
import { EXPORTED_THEME } from '../../theme';
import './AuthLayout.css';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title = 'Welcome',
  subtitle 
}) => {
  const theme = EXPORTED_THEME;

  return (
    <div className="auth-layout" style={{ 
      backgroundColor: theme.colors.background,
      fontFamily: theme.fonts.primary 
    }}>
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-header">
            <h1 style={{ 
              color: theme.colors.text,
              fontFamily: theme.fonts.primary,
              marginBottom: theme.spacing.sm
            }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ 
                color: theme.colors.textSecondary,
                fontFamily: theme.fonts.secondary
              }}>
                {subtitle}
              </p>
            )}
          </div>
          <div className="auth-form-container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

