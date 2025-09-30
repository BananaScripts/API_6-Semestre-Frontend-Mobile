import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactScreen() {
  const colors = Colors.dark;
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
  });

  const contactCategories = [
    { value: 'general', label: 'Geral', icon: 'questionmark.circle' },
    { value: 'technical', label: 'Suporte Técnico', icon: 'wrench.and.screwdriver' },
    { value: 'billing', label: 'Cobrança', icon: 'creditcard' },
    { value: 'feature', label: 'Sugestão de Funcionalidade', icon: 'lightbulb' },
    { value: 'bug', label: 'Reportar Bug', icon: 'exclamationmark.triangle' },
  ];

  const contactMethods = [
    {
      title: 'Email',
      subtitle: 'Resposta em até 24h',
      icon: 'envelope.fill',
      action: () => Linking.openURL('mailto:suporte@akasys.com?subject=Suporte - AKASYS'),
      color: colors.accent,
    },
    {
      title: 'WhatsApp',
      subtitle: 'Resposta imediata',
      icon: 'message.fill',
      action: () => Linking.openURL('https://wa.me/5511999999999?text=Olá, preciso de ajuda com o AKASYS'),
      color: '#25D366',
    },
    {
      title: 'Telefone',
      subtitle: 'Seg-Sex, 9h às 18h',
      icon: 'phone.fill',
      action: () => Linking.openURL('tel:+5511999999999'),
      color: colors.highlight,
    },
  ];

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Mensagem Enviada!',
        'Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Limpar formulário
              setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                category: 'general',
              });
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          <Text style={[styles.headerTitle, { color: colors.text }]}>Fale Conosco</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Contact Methods */}
          <View style={styles.contactMethodsSection}>
            <Text style={[styles.sectionTitle, { color: colors.muted }]}>
              Formas de Contato
            </Text>
            <View style={styles.contactMethodsList}>
              {contactMethods.map((method, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.contactMethodCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={method.action}
                  activeOpacity={0.7}
                >
                  <View style={[styles.contactMethodIcon, { backgroundColor: method.color + '20' }]}>
                    <IconSymbol name={method.icon} size={24} color={method.color} />
                  </View>
                  <View style={styles.contactMethodInfo}>
                    <Text style={[styles.contactMethodTitle, { color: colors.text }]}>
                      {method.title}
                    </Text>
                    <Text style={[styles.contactMethodSubtitle, { color: colors.muted }]}>
                      {method.subtitle}
                    </Text>
                  </View>
                  <IconSymbol name="chevron.right" size={16} color={colors.muted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Contact Form */}
          <View style={styles.formSection}>
            <Text style={[styles.sectionTitle, { color: colors.muted }]}>
              Envie sua Mensagem
            </Text>
            
            <View style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {/* Category Selection */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Categoria</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                  {contactCategories.map((category) => (
                    <TouchableOpacity
                      key={category.value}
                      style={[
                        styles.categoryChip,
                        { 
                          backgroundColor: formData.category === category.value ? colors.accent : colors.surface,
                          borderColor: colors.border
                        }
                      ]}
                      onPress={() => updateField('category', category.value)}
                    >
                      <IconSymbol 
                        name={category.icon} 
                        size={16} 
                        color={formData.category === category.value ? colors.background : colors.text} 
                      />
                      <Text style={[
                        styles.categoryChipText, 
                        { color: formData.category === category.value ? colors.background : colors.text }
                      ]}>
                        {category.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Name */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Nome *</Text>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  value={formData.name}
                  onChangeText={(value) => updateField('name', value)}
                  placeholder="Digite seu nome completo"
                  placeholderTextColor={colors.muted}
                />
              </View>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Email *</Text>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  value={formData.email}
                  onChangeText={(value) => updateField('email', value)}
                  placeholder="Digite seu email"
                  placeholderTextColor={colors.muted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Subject */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Assunto *</Text>
                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  value={formData.subject}
                  onChangeText={(value) => updateField('subject', value)}
                  placeholder="Digite o assunto da sua mensagem"
                  placeholderTextColor={colors.muted}
                />
              </View>

              {/* Message */}
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>Mensagem *</Text>
                <TextInput
                  style={[styles.textArea, { color: colors.text, borderColor: colors.border }]}
                  value={formData.message}
                  onChangeText={(value) => updateField('message', value)}
                  placeholder="Descreva sua dúvida, sugestão ou problema..."
                  placeholderTextColor={colors.muted}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  { backgroundColor: colors.accent },
                  isLoading && styles.submitButtonDisabled
                ]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={[styles.submitButtonText, { color: colors.background }]}>
                  {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* FAQ Section */}
          <View style={styles.faqSection}>
            <Text style={[styles.sectionTitle, { color: colors.muted }]}>
              Perguntas Frequentes
            </Text>
            <View style={[styles.faqCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.faqItem}>
                <Text style={[styles.faqQuestion, { color: colors.text }]}>
                  Como altero minha senha?
                </Text>
                <Text style={[styles.faqAnswer, { color: colors.muted }]}>
                  Acesse Perfil → Alterar Senha e siga as instruções.
                </Text>
              </View>
              
              <View style={[styles.faqItem, { borderTopColor: colors.border }]}>
                <Text style={[styles.faqQuestion, { color: colors.text }]}>
                  Esqueci minha senha, o que fazer?
                </Text>
                <Text style={[styles.faqAnswer, { color: colors.muted }]}>
                  Use a opção "Esqueci a senha" na tela de login.
                </Text>
              </View>
              
              <View style={[styles.faqItem, { borderTopColor: colors.border }]}>
                <Text style={[styles.faqQuestion, { color: colors.text }]}>
                  Como cancelar minha conta?
                </Text>
                <Text style={[styles.faqAnswer, { color: colors.muted }]}>
                  Entre em contato conosco através do formulário acima.
                </Text>
              </View>
            </View>
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
  contactMethodsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  contactMethodsList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  contactMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  contactMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactMethodInfo: {
    flex: 1,
  },
  contactMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactMethodSubtitle: {
    fontSize: 14,
  },
  formSection: {
    marginBottom: 24,
  },
  formCard: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryScroll: {
    marginBottom: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    gap: 6,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 120,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  faqSection: {
    marginBottom: 32,
  },
  faqCard: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  faqItem: {
    padding: 16,
    borderTopWidth: 1,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
  },
});
