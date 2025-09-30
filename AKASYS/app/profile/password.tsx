import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangePasswordScreen() {
  const colors = Colors.dark;
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSave = async () => {
    if (!formData.currentPassword.trim()) {
      Alert.alert('Erro', 'Digite sua senha atual');
      return;
    }

    if (!formData.newPassword.trim()) {
      Alert.alert('Erro', 'Digite a nova senha');
      return;
    }

    if (formData.newPassword.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simular validação da senha atual
      if (formData.currentPassword !== '123456') {
        Alert.alert('Erro', 'Senha atual incorreta');
        return;
      }

      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Sucesso', 'Senha alterada com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao alterar a senha');
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: colors.muted };
    if (password.length < 6) return { strength: 1, text: 'Muito fraca', color: '#ff4444' };
    if (password.length < 8) return { strength: 2, text: 'Fraca', color: '#ff8800' };
    if (password.length < 10) return { strength: 3, text: 'Média', color: '#ffbb00' };
    if (password.length < 12) return { strength: 4, text: 'Forte', color: '#88cc00' };
    return { strength: 5, text: 'Muito forte', color: '#00cc44' };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Alterar Senha</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Security Info */}
          <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <IconSymbol name="shield.checkered" size={24} color={colors.accent} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>Segurança da Conta</Text>
              <Text style={[styles.infoText, { color: colors.muted }]}>
                Mantenha sua conta segura com uma senha forte e única
              </Text>
            </View>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            <View style={[styles.inputGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Senha Atual</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.passwordInput, { color: colors.text }]}
                  value={formData.currentPassword}
                  onChangeText={(value) => updateField('currentPassword', value)}
                  placeholder="Digite sua senha atual"
                  placeholderTextColor={colors.muted}
                  secureTextEntry={!showPasswords.current}
                />
                <TouchableOpacity onPress={() => togglePasswordVisibility('current')}>
                  <IconSymbol 
                    name={showPasswords.current ? "eye.slash" : "eye"} 
                    size={20} 
                    color={colors.muted} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.inputGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Nova Senha</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.passwordInput, { color: colors.text }]}
                  value={formData.newPassword}
                  onChangeText={(value) => updateField('newPassword', value)}
                  placeholder="Digite a nova senha"
                  placeholderTextColor={colors.muted}
                  secureTextEntry={!showPasswords.new}
                />
                <TouchableOpacity onPress={() => togglePasswordVisibility('new')}>
                  <IconSymbol 
                    name={showPasswords.new ? "eye.slash" : "eye"} 
                    size={20} 
                    color={colors.muted} 
                  />
                </TouchableOpacity>
              </View>
              
              {/* Password Strength Indicator */}
              {formData.newPassword.length > 0 && (
                <View style={styles.strengthContainer}>
                  <View style={styles.strengthBars}>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <View
                        key={level}
                        style={[
                          styles.strengthBar,
                          {
                            backgroundColor: level <= passwordStrength.strength 
                              ? passwordStrength.color 
                              : colors.border
                          }
                        ]}
                      />
                    ))}
                  </View>
                  <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                    {passwordStrength.text}
                  </Text>
                </View>
              )}
            </View>

            <View style={[styles.inputGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>Confirmar Nova Senha</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={[styles.passwordInput, { color: colors.text }]}
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateField('confirmPassword', value)}
                  placeholder="Confirme a nova senha"
                  placeholderTextColor={colors.muted}
                  secureTextEntry={!showPasswords.confirm}
                />
                <TouchableOpacity onPress={() => togglePasswordVisibility('confirm')}>
                  <IconSymbol 
                    name={showPasswords.confirm ? "eye.slash" : "eye"} 
                    size={20} 
                    color={colors.muted} 
                  />
                </TouchableOpacity>
              </View>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword.length > 0 && (
                <View style={styles.matchContainer}>
                  <IconSymbol 
                    name={formData.newPassword === formData.confirmPassword ? "checkmark.circle.fill" : "xmark.circle.fill"} 
                    size={16} 
                    color={formData.newPassword === formData.confirmPassword ? colors.accent : '#ff4444'} 
                  />
                  <Text style={[
                    styles.matchText, 
                    { color: formData.newPassword === formData.confirmPassword ? colors.accent : '#ff4444' }
                  ]}>
                    {formData.newPassword === formData.confirmPassword ? 'Senhas coincidem' : 'Senhas não coincidem'}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Password Requirements */}
          <View style={[styles.requirementsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.requirementsTitle, { color: colors.text }]}>Requisitos da Senha:</Text>
            <View style={styles.requirementsList}>
              <View style={styles.requirementItem}>
                <IconSymbol 
                  name={formData.newPassword.length >= 6 ? "checkmark.circle.fill" : "circle"} 
                  size={16} 
                  color={formData.newPassword.length >= 6 ? colors.accent : colors.muted} 
                />
                <Text style={[styles.requirementText, { color: colors.muted }]}>
                  Pelo menos 6 caracteres
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <IconSymbol 
                  name={formData.newPassword.length >= 8 ? "checkmark.circle.fill" : "circle"} 
                  size={16} 
                  color={formData.newPassword.length >= 8 ? colors.accent : colors.muted} 
                />
                <Text style={[styles.requirementText, { color: colors.muted }]}>
                  Recomendado: 8+ caracteres
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <IconSymbol 
                  name={/[A-Z]/.test(formData.newPassword) ? "checkmark.circle.fill" : "circle"} 
                  size={16} 
                  color={/[A-Z]/.test(formData.newPassword) ? colors.accent : colors.muted} 
                />
                <Text style={[styles.requirementText, { color: colors.muted }]}>
                  Pelo menos uma letra maiúscula
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <IconSymbol 
                  name={/\d/.test(formData.newPassword) ? "checkmark.circle.fill" : "circle"} 
                  size={16} 
                  color={/\d/.test(formData.newPassword) ? colors.accent : colors.muted} 
                />
                <Text style={[styles.requirementText, { color: colors.muted }]}>
                  Pelo menos um número
                </Text>
              </View>
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: colors.accent },
                isLoading && styles.saveButtonDisabled
              ]}
              onPress={handleSave}
              disabled={isLoading}
            >
              <Text style={[styles.saveButtonText, { color: colors.background }]}>
                {isLoading ? 'Alterando...' : 'Alterar Senha'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
  },
  formSection: {
    paddingHorizontal: 20,
    gap: 16,
  },
  inputGroup: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  strengthContainer: {
    marginTop: 12,
  },
  strengthBars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  strengthBar: {
    height: 4,
    flex: 1,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  matchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  matchText: {
    fontSize: 12,
    fontWeight: '500',
  },
  requirementsCard: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  requirementsList: {
    gap: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementText: {
    fontSize: 14,
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
