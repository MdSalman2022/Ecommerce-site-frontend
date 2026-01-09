'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// User type matching backend schema
interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'moderator' | 'admin';
  authProvider: 'local' | 'google' | 'facebook';
  isVerified: boolean;
  createdAt?: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  accessToken?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isStaff: boolean;
  setLoading: (loading: boolean) => void;
  register: (name: string, email: string, password: string) => Promise<AuthResponse>;
  login: (email: string, password: string) => Promise<AuthResponse>;
  loginWithGoogle: () => void;
  loginWithFacebook: () => void;
  logout: () => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<AuthResponse>;
  resetPassword: (email: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Auth Functions (API-based)

  // Check if user is logged in on mount
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Token invalid, try refresh
        const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          localStorage.setItem('accessToken', refreshData.accessToken);
          // Retry getting user
          const retryResponse = await fetch(`${API_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${refreshData.accessToken}`,
            },
            credentials: 'include',
          });
          if (retryResponse.ok) {
            const userData = await retryResponse.json();
            setUser(userData.user);
          } else {
            localStorage.removeItem('accessToken');
            setUser(null);
          }
        } else {
          localStorage.removeItem('accessToken');
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      });

      const data: AuthResponse = await response.json();

      if (data.success && data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        setUser(data.user || null);
      }

      return data;
    } catch (error) {
      return { success: false, message: 'Registration failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Login with email/password
  const login = async (email: string, password: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data: AuthResponse = await response.json();

      if (data.success && data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        setUser(data.user || null);
      }

      return data;
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Redirect to Google OAuth
  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  // Redirect to Facebook OAuth
  const loginWithFacebook = () => {
    window.location.href = `${API_URL}/api/auth/facebook`;
  };

  // Logout
  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
      setLoading(false);
    }
  };

  // Update password
  const updatePassword = async (currentPassword: string, newPassword: string): Promise<AuthResponse> => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/api/auth/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
        credentials: 'include',
      });

      return await response.json();
    } catch (error) {
      return { success: false, message: 'Password update failed.' };
    }
  };

  // Reset password (placeholder - backend endpoint not yet implemented)
  const resetPassword = async (email: string): Promise<void> => {
    // TODO: Implement password reset endpoint on backend
    // For now, just show a message that this feature is currently placeholder
    console.log('Password reset requested for:', email);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  // Check auth on mount and handle OAuth callback
  useEffect(() => {
    const init = async () => {
      // Check for OAuth callback
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
          // OAuth was successful, refresh user
          window.history.replaceState({}, '', window.location.pathname);
        }
      }
      await refreshUser();
    };
    init();
  }, []);
  
  const isAdmin = user?.role === 'admin';
  const isModerator = user?.role === 'moderator';
  const isStaff = isAdmin || isModerator;

  const authInfo: AuthContextType = {
    user,
    loading,
    isAdmin,
    isModerator,
    isStaff,
    setLoading,
    register,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    updatePassword,
    resetPassword,
    refreshUser
  };
  
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
