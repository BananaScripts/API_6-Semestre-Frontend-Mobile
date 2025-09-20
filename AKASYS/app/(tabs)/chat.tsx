import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { Link } from 'expo-router';

export default function ChatScreen() {
  const colors = Colors.dark;
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'João Silva',
      lastMessage: 'Obrigado pela ajuda!',
      time: '2 min',
      unread: 2,
      avatar: 'person.circle.fill',
      online: true,
    },
    {
      id: 2,
      name: 'Maria Santos',
      lastMessage: 'Preciso de mais informações sobre o projeto',
      time: '15 min',
      unread: 0,
      avatar: 'person.circle.fill',
      online: false,
    },
    {
      id: 3,
      name: 'Carlos Oliveira',
      lastMessage: 'Vou enviar os documentos amanhã',
      time: '1h',
      unread: 1,
      avatar: 'person.circle.fill',
      online: true,
    },
    {
      id: 4,
      name: 'Ana Costa',
      lastMessage: 'Perfeito, obrigada!',
      time: '2h',
      unread: 0,
      avatar: 'person.circle.fill',
      online: false,
    },
    {
      id: 5,
      name: 'Pedro Lima',
      lastMessage: 'Podemos marcar uma reunião?',
      time: '3h',
      unread: 0,
      avatar: 'person.circle.fill',
      online: false,
    },
    {
      id: 6,
      name: 'Equipe Dev',
      lastMessage: 'Nova atualização disponível',
      time: '1d',
      unread: 5,
      avatar: 'person.3.fill',
      online: false,
    },
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderConversation = ({ item }: { item: any }) => (
    <Link href={`/chat/${item.id}`} asChild>
      <TouchableOpacity
        style={[styles.conversationItem, { borderBottomColor: colors.border }]}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: colors.surface }]}>
            <IconSymbol name={item.avatar} size={24} color={colors.text} />
          </View>
          {item.online && <View style={[styles.onlineIndicator, { backgroundColor: colors.accent }]} />}
        </View>
        
        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text style={[styles.conversationName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.conversationTime, { color: colors.muted }]}>{item.time}</Text>
          </View>
          <View style={styles.conversationFooter}>
            {item.unread > 0 && (
              <View style={[styles.unreadBadge, { backgroundColor: colors.accent }]}>
                <Text style={[styles.unreadText, { color: colors.background }]}>
                  {item.unread > 9 ? '9+' : item.unread}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Conversas</Text>
        <TouchableOpacity style={[styles.newChatButton, { backgroundColor: colors.card }]}>
          <IconSymbol name="plus" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.muted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Buscar conversas..."
            placeholderTextColor={colors.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" size={20} color={colors.muted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Conversations List */}
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderConversation}
        style={styles.conversationsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conversationsContent}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.accent }]}>
        <IconSymbol name="plus" size={24} color={colors.background} />
      </TouchableOpacity>
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
  newChatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  conversationsList: {
    flex: 1,
  },
  conversationsContent: {
    paddingBottom: 20,
    paddingHorizontal: 0,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  conversationContent: {
    flex: 1,
    minWidth: 0,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  conversationName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  conversationTime: {
    fontSize: 10,
    marginLeft: 4,
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 2,
  },
  unreadBadge: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  unreadText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
