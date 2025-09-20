import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colors = Colors.dark;

  const dashboardCards = [
    { 
      title: 'Vendas do Mês', 
      value: 'R$ 45.230', 
      change: '+12.5%', 
      icon: 'chart.line.uptrend.xyaxis',
      trend: 'up'
    },
    { 
      title: 'Usuários Ativos', 
      value: '2.847', 
      change: '+8.2%', 
      icon: 'person.3.fill',
      trend: 'up'
    },
    { 
      title: 'Taxa de Conversão', 
      value: '3.24%', 
      change: '-2.1%', 
      icon: 'percent',
      trend: 'down'
    },
    { 
      title: 'Tempo Médio', 
      value: '4m 32s', 
      change: '+15.3%', 
      icon: 'clock.fill',
      trend: 'up'
    },
  ];

  const quickActions = [
    { title: 'Relatórios', icon: 'doc.text.fill', route: '/reports' },
    { title: 'Analytics', icon: 'chart.bar.fill', route: '/analytics' },
    { title: 'Configurações', icon: 'gearshape.fill', route: '/settings' },
    { title: 'Suporte', icon: 'questionmark.circle.fill', route: '/support' },
  ];

  const recentData = [
    { id: 1, title: 'Relatório de Vendas', subtitle: 'Última atualização: 2h atrás', icon: 'doc.fill' },
    { id: 2, title: 'Análise de Performance', subtitle: 'Dados atualizados', icon: 'chart.line.uptrend.xyaxis' },
    { id: 3, title: 'Backup Automático', subtitle: 'Concluído com sucesso', icon: 'icloud.fill' },
    { id: 4, title: 'Nova Atualização', subtitle: 'Versão 2.1.0 disponível', icon: 'arrow.down.circle.fill' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.muted }]}>Dashboard</Text>
            <Text style={[styles.userName, { color: colors.text }]}>Visão Geral</Text>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { backgroundColor: colors.card }]}>
            <IconSymbol name="bell.fill" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Dashboard Cards */}
        <View style={styles.dashboardContainer}>
          {dashboardCards.map((card, index) => (
            <View key={index} style={[styles.dashboardCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.cardHeader}>
                <IconSymbol name={card.icon} size={24} color={colors.text} />
                <View style={[styles.trendIndicator, { backgroundColor: card.trend === 'up' ? colors.accent + '20' : colors.muted + '20' }]}>
                  <IconSymbol 
                    name={card.trend === 'up' ? 'arrow.up' : 'arrow.down'} 
                    size={12} 
                    color={card.trend === 'up' ? colors.accent : colors.muted} 
                  />
                </View>
              </View>
              <Text style={[styles.cardValue, { color: colors.text }]}>{card.value}</Text>
              <Text style={[styles.cardTitle, { color: colors.muted }]}>{card.title}</Text>
              <Text style={[
                styles.cardChange, 
                { color: card.trend === 'up' ? colors.accent : colors.muted }
              ]}>
                {card.change}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Ações Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <Link key={index} href={action.route} asChild>
                <TouchableOpacity
                  style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  activeOpacity={0.7}
                >
                  <IconSymbol name={action.icon} size={24} color={colors.text} />
                  <Text style={[styles.quickActionTitle, { color: colors.text }]}>{action.title}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>

        {/* Recent Data */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Dados Recentes</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.accent }]}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.dataContainer, { backgroundColor: colors.card }]}>
            {recentData.map((item) => (
              <View key={item.id} style={[styles.dataItem, { borderBottomColor: colors.border }]}>
                <View style={[styles.dataIcon, { backgroundColor: colors.surface }]}>
                  <IconSymbol name={item.icon} size={16} color={colors.text} />
                </View>
                <View style={styles.dataContent}>
                  <Text style={[styles.dataTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[styles.dataSubtitle, { color: colors.muted }]}>{item.subtitle}</Text>
                </View>
                <IconSymbol name="chevron.right" size={16} color={colors.muted} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  dashboardCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  cardChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  quickActionCard: {
    width: (width - 64) / 2,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  dataContainer: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  dataIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dataContent: {
    flex: 1,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  dataSubtitle: {
    fontSize: 14,
  },
});
