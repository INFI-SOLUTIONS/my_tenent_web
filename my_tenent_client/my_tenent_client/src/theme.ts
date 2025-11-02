// Theme configuration file
// Change the EXPORTED_THEME variable to switch between themes in code

export type Theme = {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
};

// Apple Theme - Clean, minimalist, modern
export const appleTheme: Theme = {
  name: 'Apple',
  colors: {
    primary: '#0071E3',
    secondary: '#00C7BE',
    accent: '#5AC8FA',
    background: '#F5F5F7',
    surface: '#FFFFFF',
    text: '#1D1D1F',
    textSecondary: '#86868B',
    border: '#D2D2D7',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
  },
  fonts: {
    primary: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
    secondary: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
};

// Microsoft Theme - Fluent Design, professional
export const microsoftTheme: Theme = {
  name: 'Microsoft',
  colors: {
    primary: '#0078D4',
    secondary: '#106EBE',
    accent: '#00BCF2',
    background: '#F3F2F1',
    surface: '#FFFFFF',
    text: '#323130',
    textSecondary: '#605E5C',
    border: '#EDEBE9',
    error: '#D13438',
    success: '#107C10',
    warning: '#FFB900',
  },
  fonts: {
    primary: '"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", sans-serif',
    secondary: '"Segoe UI", sans-serif',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '2px',
    md: '4px',
    lg: '8px',
  },
};

// Wells Fargo Theme - Banking, trustworthy
export const wellsFargoTheme: Theme = {
  name: 'Wells Fargo',
  colors: {
    primary: '#E31837',
    secondary: '#F7680A',
    accent: '#FFA500',
    background: '#F8F8F8',
    surface: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    border: '#E0E0E0',
    error: '#C41E3A',
    success: '#2D5016',
    warning: '#FF8C00',
  },
  fonts: {
    primary: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    secondary: '"Helvetica Neue", sans-serif',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '2px',
    md: '6px',
    lg: '10px',
  },
};

// Light Theme - Clean, neutral, modern
export const lightTheme: Theme = {
  name: 'Light',
  colors: {
    primary: '#646CFF',
    secondary: '#535BF2',
    accent: '#747BFF',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#213547',
    textSecondary: '#666666',
    border: '#D1D5DB',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },
  fonts: {
    primary: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    secondary: 'system-ui, sans-serif',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
};

// ============================================
// CHANGE THIS VARIABLE TO SWITCH THEMES
// ============================================
export const EXPORTED_THEME: Theme = wellsFargoTheme; // Change to: appleTheme, microsoftTheme, wellsFargoTheme, or lightTheme

