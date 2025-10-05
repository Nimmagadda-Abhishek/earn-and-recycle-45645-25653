import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, accountsApi, Account, AuthResponse } from '@/lib/api';

interface AuthContextType {
  user: AuthResponse | null;
  account: Account | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAccount = async (userId: string) => {
    try {
      const accountData = await accountsApi.getByUid(userId);
      setAccount(accountData);
    } catch (error) {
      console.error('Failed to fetch account:', error);
    }
  };

  const refreshAccount = async () => {
    if (user?.userId) {
      await fetchAccount(user.userId);
    }
  };

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchAccount(userData.userId);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    setUser(response);
    localStorage.setItem('user', JSON.stringify(response));
    await fetchAccount(response.userId);
  };

  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    const response = await authApi.signup({ firstName, lastName, email, password });
    setUser(response);
    localStorage.setItem('user', JSON.stringify(response));
    await fetchAccount(response.userId);
  };

  const logout = () => {
    setUser(null);
    setAccount(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, account, loading, login, signup, logout, refreshAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
