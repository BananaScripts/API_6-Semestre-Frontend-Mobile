import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiBaseUrl } from '@/config/api';

export default function LoginScreen() {
  const colors = Colors.dark;
  // Cores de destaque
  const blue = Colors.dark.primary;
  const gold = Colors.dark.highlight;
  // não usamos a função login do contexto aqui porque fazemos a requisição direta ao servidor
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  // Substitua pela URL do endpoint real do seu servidor
  const BASE_URL = getApiBaseUrl();

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, authLoading]);

const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    Alert.alert('Erro', 'Por favor, preencha todos os campos');
    return;
  }

    setIsLoading(true);

  const success = await login(email, password); // usa o login do contexto
  setIsLoading(false);

  if (success) {
    router.replace('/(tabs)'); // só redireciona se login do contexto tiver setado token
  }

    try {
      // Monta body Form URL Encoded com os campos username e password
      const body = new URLSearchParams({
        username: email, // username recebe o email do usuário
        password: password,
      }).toString();

      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body,
      });

      if (!res.ok) {
        // Tenta ler mensagem de erro do servidor, se houver
        let text;
        try {
          const errJson = await res.json();
          text = errJson?.error_description || errJson?.message || JSON.stringify(errJson);
        } catch {
          text = await res.text();
        }
        Alert.alert('Erro', `Falha ao autenticar: ${text || res.statusText}`);
        return;
      }

      const json = await res.json();

      // Verifica o formato esperado
      // Exemplo esperado:
      // {
      //   "access_token": "...",
      //   "token_type": "bearer"
      // }
      if (json && json.access_token) {
        const tokenData = {
          access_token: json.access_token,
          token_type: json.token_type || 'bearer',
          // opcional: expiry, refresh_token dependendo do servidor
        };

        // Salva token localmente (use um armazenamento mais seguro se possível)
        await AsyncStorage.setItem('auth_token', JSON.stringify(tokenData));

        // Opcional: se o seu AuthContext possuir função para setar token, você pode chamá-la aqui.
        // Ex.: auth.setToken(tokenData) -- adaptar conforme sua implementação.

        // Redireciona para a tela principal após login bem-sucedido
        router.replace('/(tabs)');
      } else {
        Alert.alert('Erro', 'Resposta do servidor inválida. Não foi possível obter access_token.');
      }
    } catch (error: any) {
      console.error('handleLogin error:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar Senha', 'Funcionalidade em desenvolvimento');
  };

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.text }]}>Verificando autenticação...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Logo/Header */}
          <View style={styles.header}>
            <View style={[styles.logoContainer, { backgroundColor: colors.card }]}>
              <IconSymbol name="person.circle.fill" size={60} color={colors.text} />
            </View>
            <Text style={[styles.title, { color: gold }]}>Bem-vindo</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>
              Faça login para continuar
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={[styles.inputContainer, { borderColor: colors.border }]}>
              <IconSymbol name="envelope" size={20} color={colors.muted} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Email"
                placeholderTextColor={colors.muted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={[styles.inputContainer, { borderColor: colors.border }]}>
              <IconSymbol name="lock" size={20} color={colors.muted} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Senha"
                placeholderTextColor={colors.muted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <IconSymbol 
                  name={showPassword ? "eye.slash" : "eye"} 
                  size={20} 
                  color={colors.muted} 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: colors.accent }]}>
                Esqueceu a senha?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.loginButton,
                { backgroundColor: blue },
                isLoading && styles.loginButtonDisabled
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={[styles.loginButtonText, { color: colors.background }]}>
                  Entrando...
                </Text>
              ) : (
                <Text style={[styles.loginButtonText, { color: colors.background }]}>
                  Entrar
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  demoContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    marginBottom: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
