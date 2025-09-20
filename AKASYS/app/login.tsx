import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const colors = Colors.dark;
  // Cores de destaque
  const blue = Colors.dark.primary;
  const gold = Colors.dark.highlight;
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        Alert.alert('Erro', 'Email ou senha incorretos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar Senha', 'Funcionalidade em desenvolvimento');
  };

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

          {/* Demo Credentials */}
          <View style={[styles.demoContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.demoTitle, { color: colors.text }]}>Credenciais de Demo:</Text>
            <Text style={[styles.demoText, { color: colors.muted }]}>Email: admin@admin.com</Text>
            <Text style={[styles.demoText, { color: colors.muted }]}>Senha: 123456</Text>
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
});
