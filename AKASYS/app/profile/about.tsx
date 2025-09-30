import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AboutScreen() {
  const colors = Colors.dark;

  const appInfo = {
    name: 'AKASYS',
    version: '1.0.0',
    build: '2024.01.15',
    description: 'Sistema de gestão empresarial completo e intuitivo',
  };

  const teamMembers = [
    {
      name: 'Equipe de Desenvolvimento',
      role: 'Desenvolvimento e Design',
      avatar: '👨‍💻',
    },
    {
      name: 'Equipe de Suporte',
      role: 'Atendimento ao Cliente',
      avatar: '👩‍💼',
    },
    {
      name: 'Equipe de Qualidade',
      role: 'Testes e Qualidade',
      avatar: '👨‍🔬',
    },
  ];

  const features = [
    {
      title: 'Dashboard Intuitivo',
      description: 'Visão geral completa do seu negócio',
      icon: 'chart.bar.fill',
    },
    {
      title: 'Gestão de Usuários',
      description: 'Controle total de acesso e permissões',
      icon: 'person.3.fill',
    },
    {
      title: 'Relatórios Avançados',
      description: 'Análises detalhadas e insights',
      icon: 'doc.text.fill',
    },
    {
      title: 'Segurança Robusta',
      description: 'Proteção de dados e privacidade',
      icon: 'shield.fill',
    },
  ];

  const socialLinks = [
    {
      title: 'Website',
      subtitle: 'www.akasys.com',
      icon: 'globe',
      action: () => Linking.openURL('https://www.akasys.com'),
    },
    {
      title: 'LinkedIn',
      subtitle: 'Empresa AKASYS',
      icon: 'link',
      action: () => Linking.openURL('https://linkedin.com/company/akasys'),
    },
    {
      title: 'GitHub',
      subtitle: 'Código aberto',
      icon: 'chevron.left.forwardslash.chevron.right',
      action: () => Linking.openURL('https://github.com/akasys'),
    },
  ];

  const legalLinks = [
    {
      title: 'Termos de Uso',
      action: () => Alert.alert('Termos de Uso', 'Aqui estariam os termos de uso da aplicação.'),
    },
    {
      title: 'Política de Privacidade',
      action: () => Alert.alert('Política de Privacidade', 'Aqui estaria a política de privacidade da aplicação.'),
    },
    {
      title: 'Licenças',
      action: () => Alert.alert('Licenças', 'Informações sobre as licenças utilizadas na aplicação.'),
    },
  ];

  const handleRateApp = () => {
    Alert.alert(
      'Avaliar App',
      'Gostaria de avaliar o AKASYS na App Store?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Avaliar', onPress: () => {
          // Aqui você pode implementar a lógica para abrir a App Store
          Alert.alert('Obrigado!', 'Sua avaliação é muito importante para nós!');
        }}
      ]
    );
  };

  const handleShareApp = () => {
    Alert.alert(
      'Compartilhar',
      'Compartilhe o AKASYS com seus amigos!',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Compartilhar', onPress: () => {
          // Aqui você pode implementar a lógica de compartilhamento
          Alert.alert('Sucesso!', 'App compartilhado com sucesso!');
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Sobre</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* App Info */}
        <View style={styles.appInfoSection}>
          <View style={[styles.appIcon, { backgroundColor: colors.accent }]}>
            <Text style={styles.appIconText}>A</Text>
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>{appInfo.name}</Text>
          <Text style={[styles.appDescription, { color: colors.muted }]}>
            {appInfo.description}
          </Text>
          <View style={[styles.versionInfo, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.versionRow}>
              <Text style={[styles.versionLabel, { color: colors.muted }]}>Versão:</Text>
              <Text style={[styles.versionValue, { color: colors.text }]}>{appInfo.version}</Text>
            </View>
            <View style={styles.versionRow}>
              <Text style={[styles.versionLabel, { color: colors.muted }]}>Build:</Text>
              <Text style={[styles.versionValue, { color: colors.text }]}>{appInfo.build}</Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            Principais Funcionalidades
          </Text>
          <View style={styles.featuresList}>
            {features.map((feature, index) => (
              <View key={index} style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={[styles.featureIcon, { backgroundColor: colors.accent + '20' }]}>
                  <IconSymbol name={feature.icon} size={24} color={colors.accent} />
                </View>
                <View style={styles.featureInfo}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    {feature.title}
                  </Text>
                  <Text style={[styles.featureDescription, { color: colors.muted }]}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Team */}
        <View style={styles.teamSection}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            Nossa Equipe
          </Text>
          <View style={[styles.teamCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {teamMembers.map((member, index) => (
              <View key={index} style={[styles.teamMember, { borderBottomColor: colors.border }]}>
                <Text style={styles.teamAvatar}>{member.avatar}</Text>
                <View style={styles.teamInfo}>
                  <Text style={[styles.teamName, { color: colors.text }]}>
                    {member.name}
                  </Text>
                  <Text style={[styles.teamRole, { color: colors.muted }]}>
                    {member.role}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Social Links */}
        <View style={styles.socialSection}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            Conecte-se Conosco
          </Text>
          <View style={[styles.socialCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {socialLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.socialItem, { borderBottomColor: colors.border }]}
                onPress={link.action}
                activeOpacity={0.7}
              >
                <View style={[styles.socialIcon, { backgroundColor: colors.surface }]}>
                  <IconSymbol name={link.icon} size={20} color={colors.text} />
                </View>
                <View style={styles.socialInfo}>
                  <Text style={[styles.socialTitle, { color: colors.text }]}>
                    {link.title}
                  </Text>
                  <Text style={[styles.socialSubtitle, { color: colors.muted }]}>
                    {link.subtitle}
                  </Text>
                </View>
                <IconSymbol name="chevron.right" size={16} color={colors.muted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            Ações
          </Text>
          <View style={styles.actionsList}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.accent }]}
              onPress={handleRateApp}
              activeOpacity={0.8}
            >
              <IconSymbol name="star.fill" size={20} color={colors.background} />
              <Text style={[styles.actionButtonText, { color: colors.background }]}>
                Avaliar App
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={handleShareApp}
              activeOpacity={0.8}
            >
              <IconSymbol name="square.and.arrow.up" size={20} color={colors.text} />
              <Text style={[styles.actionButtonText, { color: colors.text }]}>
                Compartilhar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal */}
        <View style={styles.legalSection}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            Legal
          </Text>
          <View style={[styles.legalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {legalLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.legalItem, { borderBottomColor: colors.border }]}
                onPress={link.action}
                activeOpacity={0.7}
              >
                <Text style={[styles.legalTitle, { color: colors.text }]}>
                  {link.title}
                </Text>
                <IconSymbol name="chevron.right" size={16} color={colors.muted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={[styles.copyrightText, { color: colors.muted }]}>
            © 2024 AKASYS. Todos os direitos reservados.
          </Text>
          <Text style={[styles.copyrightText, { color: colors.muted }]}>
            Desenvolvido com ❤️ para facilitar sua gestão empresarial.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appIconText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  versionInfo: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    width: '100%',
  },
  versionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  versionLabel: {
    fontSize: 14,
  },
  versionValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  featuresSection: {
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
  featuresList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
  },
  teamSection: {
    marginBottom: 24,
  },
  teamCard: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  teamAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  teamRole: {
    fontSize: 14,
  },
  socialSection: {
    marginBottom: 24,
  },
  socialCard: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  socialIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  socialInfo: {
    flex: 1,
  },
  socialTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  socialSubtitle: {
    fontSize: 14,
  },
  actionsSection: {
    marginBottom: 24,
  },
  actionsList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  legalSection: {
    marginBottom: 24,
  },
  legalCard: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  legalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  legalTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  copyrightSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  copyrightText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
});
