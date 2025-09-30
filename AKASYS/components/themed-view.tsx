import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  // Usa a cor principal do tema como padrão
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'primary'
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
