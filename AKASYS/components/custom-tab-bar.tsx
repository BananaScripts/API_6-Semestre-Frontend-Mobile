import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as Haptics from 'expo-haptics';

export function CustomTabBarButton(props: BottomTabBarButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Verificação segura para isSelected
  const isSelected = props.accessibilityState?.selected ?? false;

  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        try {
          if (process.env.EXPO_OS === 'ios' || process.env.EXPO_OS === 'android') {
            if (isSelected) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            } else {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
          }
        } catch (error) {
          console.warn('Haptics not available:', error);
        }
        props.onPressIn?.(ev);
      }}
      style={[
        styles.tabButton,
        props.style,
        isSelected && { backgroundColor: colors.tint + '10' }
      ]}
    >
      <View style={[
        styles.tabContent,
        isSelected && { backgroundColor: colors.tint + '15' }
      ]}>
        {props.children}
      </View>
      {isSelected && (
        <View style={[styles.indicator, { backgroundColor: colors.tint }]} />
      )}
    </PlatformPressable>
  );
}

interface TabIconProps {
  name: string;
  size: number;
  color: string;
  focused: boolean;
}

export function TabIcon({ name, size, color, focused }: TabIconProps) {
  const scale = focused ? 1.1 : 1;
  
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <IconSymbol 
        name={name} 
        size={focused ? size + 2 : size} 
        color={color} 
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 60,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -15,
    width: 30,
    height: 3,
    borderRadius: 2,
  },
});
