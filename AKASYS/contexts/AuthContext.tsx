import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import { router } from 'expo-router';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const BASE_URL = (() => {
    const extra = (Constants.expoConfig as any)?.extra || {};
    const configured = extra.API_BASE_URL as string | undefined;
    if (configured) return configured;
    return 'http://192.168.1.7:8000';
  })();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('user'),
      ]);
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username: email, password }).toString(),
      });

      const rawText = await response.text();
      let data: any = null;
      try { data = rawText ? JSON.parse(rawText) : null; } catch {}

      if (!response.ok) {
        const msg = data?.detail || rawText || `Erro: ${response.status}`;
        Alert.alert('Erro de login', typeof msg === 'string' ? msg : 'Falha ao autenticar');
        return false;
      }

      const accessToken = data?.access_token as string | undefined;
      if (!accessToken) {
        Alert.alert('Erro de login', 'Token não retornado pelo servidor');
        return false;
      }

      await AsyncStorage.setItem('token', accessToken);
      setToken(accessToken);

      const derivedName = email.split('@')[0];
      const userData: User = { id: 'self', email, name: derivedName };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error?.message?.includes('Network request failed')
        ? 'Não foi possível conectar ao servidor. Verifique o IP e se o backend está rodando.'
        : 'Ocorreu um erro ao fazer login';
      Alert.alert('Erro', message);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('user'),
        AsyncStorage.removeItem('token'),
      ]);
      setUser(null);
      setToken(null);
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
