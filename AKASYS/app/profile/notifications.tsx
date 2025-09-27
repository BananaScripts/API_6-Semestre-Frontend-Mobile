import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const colors = Colors.dark;
  const [isLoading, setIsLoading] = useState(false);
  
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    marketing: false,
    security: true,
    updates: true,
    reminders: true,
    promotions: false,
  });

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Sucesso', 'Configurações de notificação salvas!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar as configurações');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationCategories = [
    {
      title: 'Notificações Gerais',
      items: [
        {
          key: 'push' as keyof typeof notifications,
          title: 'Notificações Push',
          subtitle: 'Receber notificações no dispositivo',
          icon: 'bell.fill',
        },
        {
          key: 'email' as keyof typeof notifications,
          title: 'Notificações por Email',
          subtitle: 'Receber notificações por email',
          icon: 'envelope.fill',
        },
        {
          key: 'sms' as keyof typeof notifications,
          title: 'Notificações por SMS',
          subtitle: 'Receber notificações por SMS',
          icon: 'message.fill',
        },
      ],
    },
    {
      title: 'Tipos de Notificação',
      items: [
        {
          key: 'security' as keyof typeof notifications,
          title: 'Alertas de Segurança',
          subtitle: 'Login, alterações de senha, etc.',
          icon: 'shield.fill',
        },
        {
          key: 'updates' as keyof typeof notifications,
          title: 'Atualizações do Sistema',
          subtitle: 'Novas funcionalidades e melhorias',
          icon: 'arrow.down.circle.fill',
        },
        {
          key: 'reminders' as keyof typeof notifications,
          title: 'Lembretes',
          subtitle: 'Tarefas pendentes e prazos',
          icon: 'clock.fill',
        },
      ],
    },
    {
      title: 'Marketing',
      items: [
        {
          key: 'marketing' as keyof typeof notifications,
          title: 'Notificações de Marketing',
          subtitle: 'Ofertas especiais e novidades',
          icon: 'megaphone.fill',
        },
        {
          key: 'promotions' as keyof typeof notifications,
          title: 'Promoções',
          subtitle: 'Descontos e ofertas exclusivas',
          icon: 'tag.fill',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notificações</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Info Card */}
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="bell.badge" size={24} color={colors.accent} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>Controle suas Notificações</Text>
            <Text style={[styles.infoText, { color: colors.muted }]}>
              Personalize como e quando você recebe notificações
            </Text>
          </View>
        </View>

        {/* Notification Categories */}
        {notificationCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categorySection}>
            <Text style={[styles.categoryTitle, { color: colors.muted }]}>
              {category.title}
            </Text>
            <View style={[styles.categoryContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {category.items.map((item, itemIndex) => (
                <View
                  key={item.key}
                  style={[
                    styles.notificationItem,
                    { borderBottomColor: colors.border },
                    itemIndex === category.items.length - 1 && { borderBottomWidth: 0 }
                  ]}
                >
                  <View style={styles.notificationLeft}>
                    <View style={[styles.notificationIcon, { backgroundColor: colors.surface }]}>
                      <IconSymbol name={item.icon} size={20} color={colors.text} />
                    </View>
                    <View style={styles.notificationText}>
                      <Text style={[styles.notificationTitle, { color: colors.text }]}>
                        {item.title}
                      </Text>
                      <Text style={[styles.notificationSubtitle, { color: colors.muted }]}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={notifications[item.key]}
                    onValueChange={() => toggleNotification(item.key)}
                    trackColor={{ false: colors.border, true: colors.accent + '40' }}
                    thumbColor={notifications[item.key] ? colors.accent : colors.muted}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={[styles.categoryTitle, { color: colors.muted }]}>
            Ações Rápidas
          </Text>
          <View style={[styles.quickActionsContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity
              style={[styles.quickActionItem, { borderBottomColor: colors.border }]}
              onPress={() => {
                setNotifications(prev => ({
                  ...prev,
                  push: true,
                  email: true,
                  security: true,
                  updates: true,
                  reminders: true,
                }));
              }}
            >
              <IconSymbol name="checkmark.circle" size={20} color={colors.accent} />
              <Text style={[styles.quickActionText, { color: colors.text }]}>
                Ativar Todas as Notificações Importantes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionItem, { borderBottomColor: colors.border }]}
              onPress={() => {
                setNotifications(prev => ({
                  ...prev,
                  marketing: false,
                  promotions: false,
                }));
              }}
            >
              <IconSymbol name="xmark.circle" size={20} color={colors.muted} />
              <Text style={[styles.quickActionText, { color: colors.text }]}>
                Desativar Notificações de Marketing
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionItem}
              onPress={() => {
                setNotifications({
                  push: false,
                  email: false,
                  sms: false,
                  marketing: false,
                  security: false,
                  updates: false,
                  reminders: false,
                  promotions: false,
                });
              }}
            >
              <IconSymbol name="bell.slash" size={20} color="#ff4444" />
              <Text style={[styles.quickActionText, { color: colors.text }]}>
                Desativar Todas as Notificações
              </Text>
            </TouchableOpacity>
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
              {isLoading ? 'Salvando...' : 'Salvar Configurações'}
            </Text>
          </TouchableOpacity>
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
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  categoryContent: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 14,
  },
  quickActionsSection: {
    marginBottom: 24,
  },
  quickActionsContent: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  quickActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    gap: 12,
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
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
