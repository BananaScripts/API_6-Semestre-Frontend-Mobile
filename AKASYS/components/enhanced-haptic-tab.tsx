import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as Haptics from 'expo-haptics';

export function EnhancedHapticTab(props: BottomTabBarButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
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
