# Theme Guide

## Overview
This application includes a complete authentication flow with multiple theme options. You can switch between different brand themes by simply changing one line of code.

## Available Themes

### 1. Light Theme (Default)
Clean, neutral, modern design
- Primary Color: #646CFF
- Background: #FFFFFF
- Best for: General purpose applications

### 2. Apple Theme
Clean, minimalist, modern design inspired by Apple's design language
- Primary Color: #0071E3
- Background: #F5F5F7
- Best for: Modern, consumer-facing applications

### 3. Microsoft Theme
Fluent Design professional theme
- Primary Color: #0078D4
- Background: #F3F2F1
- Best for: Business and enterprise applications

### 4. Wells Fargo Theme
Banking, trustworthy design
- Primary Color: #E31837
- Background: #F8F8F8
- Best for: Financial and banking applications

## How to Change Themes

### Step 1: Open the theme file
Navigate to `src/theme.ts`

### Step 2: Change the exported theme
Find this line at the bottom of the file:
```typescript
export const EXPORTED_THEME: Theme = lightTheme;
```

Change it to one of the following:
```typescript
export const EXPORTED_THEME: Theme = appleTheme;
// or
export const EXPORTED_THEME: Theme = microsoftTheme;
// or
export const EXPORTED_THEME: Theme = wellsFargoTheme;
// or
export const EXPORTED_THEME: Theme = lightTheme;
```

### Step 3: Save and refresh
The theme will be applied immediately throughout the entire application.

## Authentication Flow

### Components Structure
```
components/
  AuthLayout/
    ├── AuthLayout.tsx    # Main layout wrapper
    ├── AuthLayout.css    # Layout styles
    ├── Login.tsx         # Login form component
    ├── Signup.tsx        # Signup form component
    ├── AuthForm.css      # Form styles
    └── index.ts          # Component exports
```

### Features
- **Login Page**: Email and password authentication
- **Signup Page**: Full name, email, password, and password confirmation
- **Form Validation**: Client-side validation with error messages
- **Loading States**: Visual feedback during API calls
- **Responsive Design**: Works on desktop and mobile devices
- **Theme Integration**: All components respect the selected theme

### Usage Example
```typescript
import { AuthLayout, Login, Signup } from './components/AuthLayout';

function MyApp() {
  return (
    <AuthLayout title="Welcome" subtitle="Sign in to your account">
      <Login 
        onLogin={(email, password) => console.log(email, password)}
        onSwitchToSignup={() => console.log('Switch to signup')}
      />
    </AuthLayout>
  );
}
```

## Customization

### Adding a New Theme
1. Add your theme object to `src/theme.ts`:
```typescript
export const myCustomTheme: Theme = {
  name: 'My Custom Theme',
  colors: {
    primary: '#YOUR_COLOR',
    secondary: '#YOUR_COLOR',
    // ... other colors
  },
  fonts: {
    primary: 'Your Font, sans-serif',
    secondary: 'Your Font, sans-serif',
  },
  // ... spacing and borderRadius
};
```

2. Set it as the exported theme:
```typescript
export const EXPORTED_THEME: Theme = myCustomTheme;
```

### Modifying Theme Colors
Edit the color values in the theme object. All components will automatically use the new colors.

## Development

### Running the App
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## Notes
- Themes are applied globally throughout the application
- No UI control is required to change themes (as per requirements)
- All components are fully typed with TypeScript
- Responsive design works on all screen sizes
- Form validation provides clear error messages

