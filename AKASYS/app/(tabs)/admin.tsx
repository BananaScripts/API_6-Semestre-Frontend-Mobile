import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, FlatList, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

export default function AdminScreen() {
  const colors = Colors.dark;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: 'João Silva',
      email: 'joao.silva@email.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2 horas atrás',
      avatar: 'person.circle.fill',
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      role: 'moderator',
      status: 'active',
      lastLogin: '1 dia atrás',
      avatar: 'person.circle.fill',
    },
    {
      id: 3,
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@email.com',
      role: 'user',
      status: 'inactive',
      lastLogin: '1 semana atrás',
      avatar: 'person.circle.fill',
    },
    {
      id: 4,
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      role: 'user',
      status: 'active',
      lastLogin: '3 horas atrás',
      avatar: 'person.circle.fill',
    },
    {
      id: 5,
      name: 'Pedro Lima',
      email: 'pedro.lima@email.com',
      role: 'moderator',
      status: 'suspended',
      lastLogin: '2 dias atrás',
      avatar: 'person.circle.fill',
    },
  ];

  const filters = [
    { key: 'all', label: 'Todos', count: users.length },
    { key: 'active', label: 'Ativos', count: users.filter(u => u.status === 'active').length },
    { key: 'inactive', label: 'Inativos', count: users.filter(u => u.status === 'inactive').length },
    { key: 'suspended', label: 'Suspensos', count: users.filter(u => u.status === 'suspended').length },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return colors.accent;
      case 'inactive': return colors.muted;
      case 'suspended': return '#FF3B30';
      default: return colors.muted;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return 'crown.fill';
      case 'moderator': return 'shield.fill';
      case 'user': return 'person.fill';
      default: return 'person.fill';
    }
  };

  const renderUser = ({ item }: { item: any }) => (
    <View style={[styles.userCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.surface }]}>
            <IconSymbol name={item.avatar} size={24} color={colors.text} />
          </View>
          <View style={styles.userDetails}>
            <Text style={[styles.userName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.userEmail, { color: colors.muted }]}>{item.email}</Text>
            <Text style={[styles.lastLogin, { color: colors.muted }]}>
              Último acesso: {item.lastLogin}
            </Text>
          </View>
        </View>
        <View style={styles.userActions}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status === 'active' ? 'Ativo' : 
               item.status === 'inactive' ? 'Inativo' : 'Suspenso'}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.userFooter}>
        <View style={styles.roleContainer}>
          <IconSymbol name={getRoleIcon(item.role)} size={16} color={colors.text} />
          <Text style={[styles.roleText, { color: colors.text }]}>
            {item.role === 'admin' ? 'Administrador' :
             item.role === 'moderator' ? 'Moderador' : 'Usuário'}
          </Text>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.surface }]}>
            <IconSymbol name="pencil" size={16} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.surface }]}>
            <IconSymbol name="trash" size={16} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Gerenciamento</Text>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.card }]}>
          <IconSymbol name="plus" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>{users.length}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Total</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.accent }]}>
            {users.filter(u => u.status === 'active').length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Ativos</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.muted }]}>
            {users.filter(u => u.status === 'inactive').length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Inativos</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Buscar usuários..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              { backgroundColor: selectedFilter === filter.key ? colors.accent : colors.card },
              { borderColor: colors.border }
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text style={[
              styles.filterText,
              { color: selectedFilter === filter.key ? colors.background : colors.text }
            ]}>
              {filter.label}
            </Text>
            <View style={[
              styles.filterBadge,
              { backgroundColor: selectedFilter === filter.key ? colors.background + '20' : colors.muted + '20' }
            ]}>
              <Text style={[
                styles.filterBadgeText,
                { color: selectedFilter === filter.key ? colors.background : colors.muted }
              ]}>
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Ações Rápidas</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <IconSymbol name="person.badge.plus" size={24} color={colors.text} />
            <Text style={[styles.quickActionText, { color: colors.text }]}>Novo Usuário</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <IconSymbol name="person.2" size={24} color={colors.text} />
            <Text style={[styles.quickActionText, { color: colors.text }]}>Importar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <IconSymbol name="square.and.arrow.up" size={24} color={colors.text} />
            <Text style={[styles.quickActionText, { color: colors.text }]}>Exportar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <IconSymbol name="gearshape" size={24} color={colors.text} />
            <Text style={[styles.quickActionText, { color: colors.text }]}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Users List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUser}
        style={styles.usersList}
        contentContainerStyle={styles.usersContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 6,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 6,
  },
  filterBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  usersList: {
    flex: 1,
  },
  usersContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  userCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 2,
  },
  lastLogin: {
    fontSize: 12,
  },
  userActions: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  userFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleText: {
    fontSize: 14,
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
