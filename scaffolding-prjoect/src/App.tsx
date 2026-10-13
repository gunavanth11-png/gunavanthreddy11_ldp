import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { CashAccelerationPage } from './components/pages/CashAccelerationPage';
import { HomePage } from './components/pages/HomePage';


export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/cash-acceleration');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentPath === '/home' ? (
        <HomePage onNavigate={setCurrentPath} />
      ) : (
        <CashAccelerationPage onNavigate={setCurrentPath} />
      )}
    </ThemeProvider>
  );
};

export default App;
