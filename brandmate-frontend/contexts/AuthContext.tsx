import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { storage } from '@/utils/storage';
import { API_ENDPOINTS } from '@/config/api';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (loginData: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  const clearAuthData = useCallback(async () => {
    setUser(null);
    setToken(null);
    try {
      await storage.removeItem('authToken');
      await storage.removeItem('userData');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      const storedToken = await storage.getItem('authToken');
      const storedUser = await storage.getItem('userData');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        // Verify token is still valid
        const response = await fetch(API_ENDPOINTS.auth.profile, {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          // Token is invalid, clear storage
          await clearAuthData();
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      await clearAuthData();
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthData]);

  // Check authentication status on app start
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);



  const login = async (loginData: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: loginData,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const { user: userData, token: authToken } = data.data;
        
        // Store auth data
        await storage.setItem('authToken', authToken);
        await storage.setItem('userData', JSON.stringify(userData));
        
        setUser(userData);
        setToken(authToken);

        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const register = async (username: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(API_ENDPOINTS.auth.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const { user: userData, token: authToken } = data.data;
        
        // Store auth data
        await storage.setItem('authToken', authToken);
        await storage.setItem('userData', JSON.stringify(userData));
        
        setUser(userData);
        setToken(authToken);

        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        // Call logout endpoint
        await fetch(API_ENDPOINTS.auth.logout, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local auth data regardless of API call result
      await clearAuthData();
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};