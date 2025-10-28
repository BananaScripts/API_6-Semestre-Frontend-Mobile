import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

// --- TIPOS ---
type ProfileRoute =
  | '/profile/personal'
  | '/profile/password'
  | '/profile/notifications'
  | '/profile/language'
  | '/profile/contact'
  | '/profile/about';

type ProfileIcon =
  | 'person.circle'
  | 'key'
  | 'bell'
  | 'globe'
  | 'envelope'
  | 'info.circle'
  | 'chevron.right'
  | 'rectangle.portrait.and.arrow.right';

export default function ProfileScreen() {
  const colors = Colors.dark;
  const { user, logout } = useAuth();
  const router = useRouter();

  const userInfo = {
    name: user?.name || 'Usuário',
    email: user?.email || 'usuario@email.com',
    phone: '+55 11 99999-9999',
    memberSince: 'Membro desde Jan 2023',
  };

  // --- LOGOUT COM ALERT/CONFIRM ---
  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Tem certeza que deseja sair da sua conta?');
      if (confirmed) logout().catch(err => console.error('Erro ao sair:', err));
    } else {
      Alert.alert(
        'Sair da Conta',
        'Tem certeza que deseja sair da sua conta?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Sair', 
            style: 'destructive',
            onPress: () => logout().catch(err => {
              console.error('Erro ao sair:', err);
              Alert.alert('Erro', 'Não foi possível sair da conta.');
            }),
          },
        ]
      );
    }
  };

  const profileSections: {
    title: string;
    items: { icon: ProfileIcon; title: string; subtitle: string; route: ProfileRoute }[];
  }[] = [
    {
      title: 'Conta',
      items: [
        { icon: 'person.circle', title: 'Informações Pessoais', subtitle: 'Nome, email, telefone', route: '/profile/personal' },
        { icon: 'key', title: 'Alterar Senha', subtitle: 'Segurança da conta', route: '/profile/password' },
      ],
    },
    {
      title: 'Preferências',
      items: [
        { icon: 'bell', title: 'Notificações', subtitle: 'Alertas e lembretes', route: '/profile/notifications' },
        { icon: 'globe', title: 'Idioma', subtitle: 'Português (Brasil)', route: '/profile/language' },
      ],
    },
    {
      title: 'Suporte',
      items: [
        { icon: 'envelope', title: 'Fale Conosco', subtitle: 'Suporte por email', route: '/profile/contact' },
        { icon: 'info.circle', title: 'Sobre', subtitle: 'Versão 1.0.0', route: '/profile/about' },
      ],
    },
  ];

  const containerStyle = StyleSheet.flatten([styles.container, { backgroundColor: colors.background }]);

  return (
    <SafeAreaView style={containerStyle}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={StyleSheet.flatten([styles.avatarContainer, { backgroundColor: colors.card }])}>
            <IconSymbol name="person.circle" size={40} color={colors.text} />
          </View>
          <Text style={StyleSheet.flatten([styles.userName, { color: colors.text }])}>{userInfo.name}</Text>
          <Text style={StyleSheet.flatten([styles.userEmail, { color: colors.muted }])}>{userInfo.email}</Text>
          <Text style={StyleSheet.flatten([styles.memberSince, { color: colors.muted }])}>{userInfo.memberSince}</Text>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={StyleSheet.flatten([styles.sectionTitle, { color: colors.muted }])}>{section.title}</Text>
            <View style={StyleSheet.flatten([styles.sectionContent, { backgroundColor: colors.card }])}>
              {section.items.map((item, itemIndex) => {
                const isLast = itemIndex === section.items.length - 1;
                const optionStyle = StyleSheet.flatten([
                  styles.optionItem,
                  { borderBottomColor: colors.border },
                  isLast && { borderBottomWidth: 0 },
                ].filter(Boolean));

                return (
                  <TouchableOpacity
                    key={item.route}
                    style={optionStyle}
                    activeOpacity={0.7}
                    onPress={() => router.push(item.route)} // navega para a rota
                  >
                    <View style={styles.optionLeft}>
                      <View style={StyleSheet.flatten([styles.optionIcon, { backgroundColor: colors.surface }])}>
                        <IconSymbol name={item.icon} size={20} color={colors.text} />
                      </View>
                      <View style={styles.optionText}>
                        <Text style={StyleSheet.flatten([styles.optionTitle, { color: colors.text }])}>{item.title}</Text>
                        <Text style={StyleSheet.flatten([styles.optionSubtitle, { color: colors.muted }])}>{item.subtitle}</Text>
                      </View>
                    </View>
                    <IconSymbol name="chevron.right" size={16} color={colors.muted} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={StyleSheet.flatten([styles.logoutButton, { backgroundColor: colors.card, borderColor: colors.border }])}
            activeOpacity={0.7}
            onPress={handleLogout} // botão de logout real
          >
            <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color={colors.text} />
            <Text style={StyleSheet.flatten([styles.logoutText, { color: colors.text }])}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 20 },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  userName: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  userEmail: { fontSize: 16, marginBottom: 4 },
  memberSince: { fontSize: 14 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, marginHorizontal: 20 },
  sectionContent: { marginHorizontal: 20, borderRadius: 12, overflow: 'hidden', borderWidth: 1, paddingVertical: 8 },
  optionItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, paddingHorizontal: 16, borderBottomWidth: 1 },
  optionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  optionIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  optionText: { flex: 1 },
  optionTitle: { fontSize: 16, fontWeight: '500', marginBottom: 2 },
  optionSubtitle: { fontSize: 14 },
  logoutSection: { paddingHorizontal: 20, paddingVertical: 32 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 12, borderWidth: 1 },
  logoutText: { fontSize: 16, fontWeight: '600', marginLeft: 8 },
});
