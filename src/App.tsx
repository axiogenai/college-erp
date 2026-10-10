import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ErpDataProvider } from './context/ErpDataContext';
import { PublicLanding } from './components/public/PublicLanding';
import { AppLayout } from './components/layout/AppLayout';
import { UserRole } from './types';

const MainController: React.FC = () => {
  const [viewMode, setViewMode] = useState<'landing' | 'portal'>('portal');
  const { switchPersona, login } = useAuth();

  const handleEnterPortal = (role?: UserRole) => {
    if (role) {
      switchPersona(role);
      login(role);
    }
    setViewMode('portal');
  };

  const handleNavigateLanding = () => {
    setViewMode('landing');
  };

  if (viewMode === 'landing') {
    return <PublicLanding onEnterPortal={handleEnterPortal} />;
  }

  return <AppLayout onNavigateLanding={handleNavigateLanding} />;
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ErpDataProvider>
          <MainController />
        </ErpDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
