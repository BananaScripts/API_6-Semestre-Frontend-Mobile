import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colors = Colors.dark;
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

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

  // Dados da tabela
  const tableData = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', status: 'Ativo', role: 'Admin', lastLogin: '2024-01-15', revenue: 'R$ 12.500' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com', status: 'Ativo', role: 'Vendedor', lastLogin: '2024-01-14', revenue: 'R$ 8.750' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', status: 'Inativo', role: 'Vendedor', lastLogin: '2024-01-10', revenue: 'R$ 5.200' },
    { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', status: 'Ativo', role: 'Gerente', lastLogin: '2024-01-15', revenue: 'R$ 15.300' },
    { id: 5, name: 'Carlos Lima', email: 'carlos@email.com', status: 'Ativo', role: 'Vendedor', lastLogin: '2024-01-13', revenue: 'R$ 9.800' },
    { id: 6, name: 'Lucia Ferreira', email: 'lucia@email.com', status: 'Pendente', role: 'Vendedor', lastLogin: '2024-01-12', revenue: 'R$ 3.400' },
  ];

  // Função para ordenar dados
  const sortData = (data: any[], field: string, order: string) => {
    return [...data].sort((a, b) => {
      let aVal = a[field];
      let bVal = b[field];
      
      // Tratamento especial para valores monetários
      if (field === 'revenue') {
        aVal = parseFloat(aVal.replace('R$ ', '').replace('.', '').replace(',', '.'));
        bVal = parseFloat(bVal.replace('R$ ', '').replace('.', '').replace(',', '.'));
      }
      
      if (order === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedData = sortData(tableData, sortBy, sortOrder);

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

        {/* Data Table */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Dados dos Usuários</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: colors.accent }]}>Exportar</Text>
            </TouchableOpacity>
          </View>
          
          {/* Mobile-friendly card layout for small screens */}
          {width < 768 ? (
            <View style={styles.mobileTableContainer}>
              {sortedData.map((row, index) => (
                <View 
                  key={row.id} 
                  style={[
                    styles.mobileTableCard, 
                    { 
                      backgroundColor: colors.card, 
                      borderColor: colors.border 
                    }
                  ]}
                >
                  <View style={styles.mobileCardHeader}>
                    <Text style={[styles.mobileCardName, { color: colors.text }]}>
                      {row.name}
                    </Text>
                    <View style={[
                      styles.statusBadge, 
                      { 
                        backgroundColor: row.status === 'Ativo' ? colors.accent + '20' : 
                                       row.status === 'Inativo' ? colors.muted + '20' : 
                                       colors.highlight + '20'
                      }
                    ]}>
                      <Text style={[
                        styles.statusText, 
                        { 
                          color: row.status === 'Ativo' ? colors.accent : 
                                 row.status === 'Inativo' ? colors.muted : 
                                 colors.highlight
                        }
                      ]}>
                        {row.status}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.mobileCardContent}>
                    <View style={styles.mobileCardRow}>
                      <Text style={[styles.mobileCardLabel, { color: colors.muted }]}>Email:</Text>
                      <Text style={[styles.mobileCardValue, { color: colors.text }]} numberOfLines={1}>
                        {row.email}
                      </Text>
                    </View>
                    
                    <View style={styles.mobileCardRow}>
                      <Text style={[styles.mobileCardLabel, { color: colors.muted }]}>Cargo:</Text>
                      <Text style={[styles.mobileCardValue, { color: colors.text }]}>
                        {row.role}
                      </Text>
                    </View>
                    
                    <View style={styles.mobileCardRow}>
                      <Text style={[styles.mobileCardLabel, { color: colors.muted }]}>Receita:</Text>
                      <Text style={[styles.mobileCardValue, { color: colors.accent, fontWeight: 'bold' }]}>
                        {row.revenue}
                      </Text>
                    </View>
                    
                    <View style={styles.mobileCardRow}>
                      <Text style={[styles.mobileCardLabel, { color: colors.muted }]}>Último Login:</Text>
                      <Text style={[styles.mobileCardValue, { color: colors.text }]}>
                        {row.lastLogin}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            /* Desktop table layout */
            <View style={[styles.tableContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {/* Table Header */}
              <View style={[styles.tableHeader, { borderBottomColor: colors.border }]}>
                <TouchableOpacity 
                  style={styles.tableHeaderCell} 
                  onPress={() => handleSort('name')}
                >
                  <Text style={[styles.tableHeaderText, { color: colors.text }]}>Nome</Text>
                  <IconSymbol 
                    name={sortBy === 'name' ? (sortOrder === 'asc' ? 'arrow.up' : 'arrow.down') : 'arrow.up.arrow.down'} 
                    size={12} 
                    color={colors.muted} 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.tableHeaderCell} 
                  onPress={() => handleSort('email')}
                >
                  <Text style={[styles.tableHeaderText, { color: colors.text }]}>Email</Text>
                  <IconSymbol 
                    name={sortBy === 'email' ? (sortOrder === 'asc' ? 'arrow.up' : 'arrow.down') : 'arrow.up.arrow.down'} 
                    size={12} 
                    color={colors.muted} 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.tableHeaderCell} 
                  onPress={() => handleSort('status')}
                >
                  <Text style={[styles.tableHeaderText, { color: colors.text }]}>Status</Text>
                  <IconSymbol 
                    name={sortBy === 'status' ? (sortOrder === 'asc' ? 'arrow.up' : 'arrow.down') : 'arrow.up.arrow.down'} 
                    size={12} 
                    color={colors.muted} 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.tableHeaderCell} 
                  onPress={() => handleSort('role')}
                >
                  <Text style={[styles.tableHeaderText, { color: colors.text }]}>Cargo</Text>
                  <IconSymbol 
                    name={sortBy === 'role' ? (sortOrder === 'asc' ? 'arrow.up' : 'arrow.down') : 'arrow.up.arrow.down'} 
                    size={12} 
                    color={colors.muted} 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.tableHeaderCell} 
                  onPress={() => handleSort('revenue')}
                >
                  <Text style={[styles.tableHeaderText, { color: colors.text }]}>Receita</Text>
                  <IconSymbol 
                    name={sortBy === 'revenue' ? (sortOrder === 'asc' ? 'arrow.up' : 'arrow.down') : 'arrow.up.arrow.down'} 
                    size={12} 
                    color={colors.muted} 
                  />
                </TouchableOpacity>
              </View>

              {/* Table Rows */}
              {sortedData.map((row, index) => (
                <View 
                  key={row.id} 
                  style={[
                    styles.tableRow, 
                    { 
                      borderBottomColor: colors.border,
                      backgroundColor: index % 2 === 0 ? 'transparent' : colors.surface + '20'
                    }
                  ]}
                >
                  <View style={styles.tableCell}>
                    <Text style={[styles.tableCellText, { color: colors.text }]} numberOfLines={1}>
                      {row.name}
                    </Text>
                  </View>
                  
                  <View style={styles.tableCell}>
                    <Text style={[styles.tableCellText, { color: colors.muted }]} numberOfLines={1}>
                      {row.email}
                    </Text>
                  </View>
                  
                  <View style={styles.tableCell}>
                    <View style={[
                      styles.statusBadge, 
                      { 
                        backgroundColor: row.status === 'Ativo' ? colors.accent + '20' : 
                                       row.status === 'Inativo' ? colors.muted + '20' : 
                                       colors.highlight + '20'
                      }
                    ]}>
                      <Text style={[
                        styles.statusText, 
                        { 
                          color: row.status === 'Ativo' ? colors.accent : 
                                 row.status === 'Inativo' ? colors.muted : 
                                 colors.highlight
                        }
                      ]}>
                        {row.status}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.tableCell}>
                    <Text style={[styles.tableCellText, { color: colors.text }]} numberOfLines={1}>
                      {row.role}
                    </Text>
                  </View>
                  
                  <View style={styles.tableCell}>
                    <Text style={[styles.tableCellText, { color: colors.text }]} numberOfLines={1}>
                      {row.revenue}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
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
  // Table Styles
  tableContainer: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  tableCellText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Mobile Table Styles
  mobileTableContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  mobileTableCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  mobileCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mobileCardName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  mobileCardContent: {
    gap: 8,
  },
  mobileCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mobileCardLabel: {
    fontSize: 14,
    fontWeight: '500',
    minWidth: 80,
  },
  mobileCardValue: {
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
  },
});
