import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, FlatList, Switch, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiBaseUrl } from '@/config/api';

export default function AdminScreen() {
  const colors = Colors.dark;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const BASE_URL = getApiBaseUrl();

  type Usuario = { id: number; nome: string; email: string; senha?: string };

  const [users, setUsers] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [formId, setFormId] = useState<number | null>(null);
  const [formNome, setFormNome] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSenha, setFormSenha] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [readId, setReadId] = useState('');

  // Persist/restore local list so it survives app reloads (since API lacks GET all)
  const USERS_CACHE_KEY = 'usuarios_cache';
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(USERS_CACHE_KEY);
        if (raw) {
          const parsed: Usuario[] = JSON.parse(raw);
          if (Array.isArray(parsed)) setUsers(parsed);
        }
      } catch {}
    })();
  }, []);

  const persistUsers = async (next: Usuario[]) => {
    try { await AsyncStorage.setItem(USERS_CACHE_KEY, JSON.stringify(next)); } catch {}
  };

  // display adapter
  const normalizeToCard = (u: Usuario) => ({
    id: u.id,
    name: u.nome,
    email: u.email,
    role: 'user',
    status: 'active',
    lastLogin: '—',
    avatar: 'person.circle.fill',
  });

  const filters = [
    { key: 'all', label: 'Todos', count: users.length },
  ];

  const filteredUsers = users
    .map(normalizeToCard)
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilter === 'all';
      return matchesSearch && matchesFilter;
    });

  // API functions
  const createUsuario = async (payload: { nome: string; email: string; senha: string }) => {
    setSaving(true);
    try {
      const response = await fetch(`${BASE_URL}/usuario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const rawText = await response.text();
      const data = rawText ? JSON.parse(rawText) : null;
      if (!response.ok) throw new Error(data?.detail || rawText || `Erro ${response.status}`);
      setUsers(prev => {
        const next = [data, ...prev.filter(p => p.id !== data.id)];
        persistUsers(next);
        return next;
      });
      Alert.alert('Sucesso', 'Usuário criado com sucesso');
      setShowForm(false);
      setFormId(null); setFormNome(''); setFormEmail(''); setFormSenha('');
    } catch (e: any) {
      Alert.alert('Erro', e?.message || 'Falha ao criar usuário');
    } finally {
      setSaving(false);
    }
  };

  const readUsuario = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/usuario/${id}`);
      const rawText = await response.text();
      const data = rawText ? JSON.parse(rawText) : null;
      if (!response.ok) throw new Error(data?.detail || rawText || `Erro ${response.status}`);
      setUsers(prev => {
        const next = prev.find(u => u.id === data.id)
          ? prev.map(u => (u.id === data.id ? data : u))
          : [data, ...prev];
        persistUsers(next);
        return next;
      });
      Alert.alert('Sucesso', `Usuário ${data?.id} carregado`);
    } catch (e: any) {
      Alert.alert('Erro', e?.message || 'Falha ao buscar usuário');
    } finally {
      setLoading(false);
    }
  };

  const updateUsuario = async (id: number, payload: { nome: string; email: string; senha?: string }) => {
    setSaving(true);
    try {
      const response = await fetch(`${BASE_URL}/usuario/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const rawText = await response.text();
      const data = rawText ? JSON.parse(rawText) : null;
      if (!response.ok) throw new Error(data?.detail || rawText || `Erro ${response.status}`);
      setUsers(prev => {
        const next = prev.map(u => (u.id === id ? data : u));
        persistUsers(next);
        return next;
      });
      Alert.alert('Sucesso', 'Usuário atualizado');
      setShowForm(false);
      setFormId(null); setFormNome(''); setFormEmail(''); setFormSenha('');
    } catch (e: any) {
      Alert.alert('Erro', e?.message || 'Falha ao atualizar usuário');
    } finally {
      setSaving(false);
    }
  };

  const deleteUsuario = async (id: number) => {
    setDeletingId(id);
    try {
      const response = await fetch(`${BASE_URL}/usuario/${id}`, { method: 'DELETE' });
      if (!response.ok && response.status !== 204) {
        const rawText = await response.text();
        let data: any = null; try { data = rawText ? JSON.parse(rawText) : null; } catch {}
        throw new Error(data?.detail || rawText || `Erro ${response.status}`);
      }
      setUsers(prev => {
        const next = prev.filter(u => u.id !== id);
        persistUsers(next);
        return next;
      });
      Alert.alert('Sucesso', 'Usuário removido');
    } catch (e: any) {
      Alert.alert('Erro', e?.message || 'Falha ao excluir usuário');
    } finally {
      setDeletingId(null);
    }
  };

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
          <TouchableOpacity
            onPress={() => {
              const u = users.find(u => u.id === item.id);
              if (!u) return;
              setFormId(u.id); setFormNome(u.nome); setFormEmail(u.email); setFormSenha('');
              setShowForm(true);
            }}
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
          >
            <IconSymbol name="pencil" size={16} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteUsuario(item.id)}
            disabled={deletingId === item.id}
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
          >
            {deletingId === item.id ? (
              <ActivityIndicator size="small" color="#FF3B30" />
            ) : (
              <IconSymbol name="trash" size={16} color="#FF3B30" />
            )}
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
        <TouchableOpacity onPress={() => { setShowForm(v => !v); if (!showForm) { setFormId(null); setFormNome(''); setFormEmail(''); setFormSenha(''); } }} style={[styles.addButton, { backgroundColor: colors.card }]}>
          <IconSymbol name="plus" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>{users.length}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Total</Text>
        </View>
        
      </View>

      

      {/* Create/Update User Form */}
      {showForm && (
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {formId ? `Editar Usuário #${formId}` : 'Novo Usuário'}
          </Text>
          <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border, marginBottom: 8 }]}>
            <IconSymbol name="person" size={20} color={colors.muted} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Nome"
              placeholderTextColor={colors.muted}
              value={formNome}
              onChangeText={setFormNome}
            />
          </View>
          <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border, marginBottom: 8 }]}>
            <IconSymbol name="envelope" size={20} color={colors.muted} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Email"
              placeholderTextColor={colors.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formEmail}
              onChangeText={setFormEmail}
            />
          </View>
          <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border, marginBottom: 8 }]}>
            <IconSymbol name="lock" size={20} color={colors.muted} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder={formId ? 'Senha (opcional para manter)' : 'Senha'}
              placeholderTextColor={colors.muted}
              secureTextEntry
              value={formSenha}
              onChangeText={setFormSenha}
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              disabled={saving}
              style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border, paddingVertical: 12, flex: 1 }]}
              onPress={() => {
                if (!formNome || !formEmail || (!formId && !formSenha)) {
                  Alert.alert('Atenção', 'Preencha nome, email e senha.');
                  return;
                }
                if (formId) {
                  updateUsuario(formId, { nome: formNome, email: formEmail, senha: formSenha || undefined });
                } else {
                  createUsuario({ nome: formNome, email: formEmail, senha: formSenha });
                }
              }}
            >
              {saving ? (
                <ActivityIndicator color={colors.text} />
              ) : (
                <Text style={[styles.quickActionText, { color: colors.text }]}>{formId ? 'Salvar' : 'Criar'}</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              disabled={saving}
              style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border, paddingVertical: 12, flex: 1 }]}
              onPress={() => { setShowForm(false); setFormId(null); setFormNome(''); setFormEmail(''); setFormSenha(''); }}
            >
              <Text style={[styles.quickActionText, { color: colors.text }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Search simplificada (nome/email) e botão para buscar ID se input for numérico) */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Buscar por nome ou email (digite ID e toque no botão)"
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => { const id = parseInt(searchQuery, 10); if (!isNaN(id)) readUsuario(id); }}>
            {loading ? <ActivityIndicator color={colors.text} /> : <IconSymbol name="arrow.down.circle" size={20} color={colors.text} />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Removido: filtros avançados */}

      {/* Ação: Novo Usuário */}
      <View style={styles.quickActionsSection}>
        <TouchableOpacity onPress={() => { setShowForm(true); setFormId(null); setFormNome(''); setFormEmail(''); setFormSenha(''); }} style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="person.badge.plus" size={24} color={colors.text} />
          <Text style={[styles.quickActionText, { color: colors.text }]}>Novo Usuário</Text>
        </TouchableOpacity>
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
