import React, { createContext, useContext, useState } from 'react';
import { UserRole, UserPersona } from '../types';
import { defaultPersonas } from '../data/mockData';

interface AuthContextType {
  currentUser: UserPersona;
  role: UserRole;
  isLoggedIn: boolean;
  switchPersona: (role: UserRole) => void;
  login: (role?: UserRole) => void;
  logout: () => void;
  hasPermission: (permission: PermissionKey) => boolean;
}

export type PermissionKey = 
  | 'view_all_students'
  | 'edit_students'
  | 'delete_students'
  | 'view_all_faculty'
  | 'edit_faculty'
  | 'mark_attendance'
  | 'view_all_attendance'
  | 'enter_marks'
  | 'publish_results'
  | 'view_all_finances'
  | 'record_fee_payment'
  | 'approve_refunds'
  | 'manage_timetable'
  | 'manage_admissions'
  | 'view_audit_logs'
  | 'access_ai_tools';

const ROLE_PERMISSIONS: Record<UserRole, PermissionKey[]> = {
  principal: [
    'view_all_students', 'edit_students', 'delete_students',
    'view_all_faculty', 'edit_faculty',
    'mark_attendance', 'view_all_attendance',
    'enter_marks', 'publish_results',
    'view_all_finances', 'record_fee_payment', 'approve_refunds',
    'manage_timetable', 'manage_admissions',
    'view_audit_logs', 'access_ai_tools'
  ],
  faculty: [
    'view_all_students',
    'view_all_faculty',
    'mark_attendance', 'view_all_attendance',
    'enter_marks',
    'manage_timetable',
    'access_ai_tools'
  ],
  student: [
    // Students only access their personal records through authorized filtered views
    'access_ai_tools'
  ],
  accountant: [
    'view_all_students',
    'view_all_finances',
    'record_fee_payment',
    'approve_refunds',
    'access_ai_tools'
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserPersona>(defaultPersonas.principal);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const switchPersona = (newRole: UserRole) => {
    if (defaultPersonas[newRole]) {
      setCurrentUser(defaultPersonas[newRole]);
      setIsLoggedIn(true);
    }
  };

  const login = (newRole: UserRole = 'principal') => {
    switchPersona(newRole);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const hasPermission = (permission: PermissionKey): boolean => {
    if (!isLoggedIn) return false;
    const permissions = ROLE_PERMISSIONS[currentUser.role] || [];
    return permissions.includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser.role,
        isLoggedIn,
        switchPersona,
        login,
        logout,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
