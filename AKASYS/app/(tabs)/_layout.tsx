import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import AuthGuard from '@/components/AuthGuard';
import { HapticTab } from '@/components/haptic-tab';
import { TabIcon } from '@/components/custom-tab-bar';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  // Forçar modo escuro
  const colors = Colors.dark;

  return (
    <AuthGuard>
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 30 : 15,
          paddingTop: 10,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              size={24} 
              name={focused ? "chart.bar.fill" : "chart.bar"} 
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              size={24} 
              name={focused ? "message.fill" : "message"} 
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Usuário',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              size={24} 
              name={focused ? "person.fill" : "person"} 
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: 'Admin',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              size={24} 
              name={focused ? "shield.fill" : "shield"} 
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
    </AuthGuard>
  );
}
