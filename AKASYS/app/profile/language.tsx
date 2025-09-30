import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LanguageScreen() {
  const colors = Colors.dark;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('pt-BR');

  const languages = [
    {
      code: 'pt-BR',
      name: 'Português (Brasil)',
      nativeName: 'Português',
      flag: '🇧🇷',
      isDefault: true,
    },
    {
      code: 'en-US',
      name: 'English (United States)',
      nativeName: 'English',
      flag: '🇺🇸',
      isDefault: false,
    },
    {
      code: 'es-ES',
      name: 'Español (España)',
      nativeName: 'Español',
      flag: '🇪🇸',
      isDefault: false,
    },
    {
      code: 'fr-FR',
      name: 'Français (France)',
      nativeName: 'Français',
      flag: '🇫🇷',
      isDefault: false,
    },
    {
      code: 'de-DE',
      name: 'Deutsch (Deutschland)',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      isDefault: false,
    },
    {
      code: 'it-IT',
      name: 'Italiano (Italia)',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      isDefault: false,
    },
    {
      code: 'ja-JP',
      name: '日本語 (日本)',
      nativeName: '日本語',
      flag: '🇯🇵',
      isDefault: false,
    },
    {
      code: 'ko-KR',
      name: '한국어 (대한민국)',
      nativeName: '한국어',
      flag: '🇰🇷',
      isDefault: false,
    },
    {
      code: 'zh-CN',
      name: '中文 (简体)',
      nativeName: '中文',
      flag: '🇨🇳',
      isDefault: false,
    },
  ];

  const handleLanguageSelect = async (languageCode: string) => {
    if (languageCode === selectedLanguage) return;

    setIsLoading(true);
    
    try {
      // Simular mudança de idioma
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSelectedLanguage(languageCode);
      
      const selectedLang = languages.find(lang => lang.code === languageCode);
      Alert.alert(
        'Idioma Alterado',
        `O idioma foi alterado para ${selectedLang?.name}`,
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Aqui você pode implementar a lógica real de mudança de idioma
              // Por exemplo, salvar no AsyncStorage e recarregar a aplicação
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao alterar o idioma');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === selectedLanguage);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Idioma</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Current Language Info */}
        <View style={[styles.currentLanguageCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.currentLanguageHeader}>
            <Text style={[styles.currentLanguageTitle, { color: colors.text }]}>Idioma Atual</Text>
            <View style={[styles.currentLanguageBadge, { backgroundColor: colors.accent }]}>
              <Text style={[styles.currentLanguageBadgeText, { color: colors.background }]}>
                Ativo
              </Text>
            </View>
          </View>
          
          <View style={styles.currentLanguageContent}>
            <Text style={styles.currentLanguageFlag}>{getCurrentLanguage()?.flag}</Text>
            <View style={styles.currentLanguageInfo}>
              <Text style={[styles.currentLanguageName, { color: colors.text }]}>
                {getCurrentLanguage()?.name}
              </Text>
              <Text style={[styles.currentLanguageNative, { color: colors.muted }]}>
                {getCurrentLanguage()?.nativeName}
              </Text>
            </View>
          </View>
        </View>

        {/* Available Languages */}
        <View style={styles.languagesSection}>
          <Text style={[styles.sectionTitle, { color: colors.muted }]}>
            Idiomas Disponíveis
          </Text>
          
          <View style={[styles.languagesList, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {languages.map((language, index) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageItem,
                  { borderBottomColor: colors.border },
                  index === languages.length - 1 && { borderBottomWidth: 0 },
                  selectedLanguage === language.code && { backgroundColor: colors.accent + '10' }
                ]}
                onPress={() => handleLanguageSelect(language.code)}
                disabled={isLoading}
                activeOpacity={0.7}
              >
                <View style={styles.languageLeft}>
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <View style={styles.languageInfo}>
                    <Text style={[styles.languageName, { color: colors.text }]}>
                      {language.name}
                    </Text>
                    <Text style={[styles.languageNative, { color: colors.muted }]}>
                      {language.nativeName}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.languageRight}>
                  {language.isDefault && (
                    <View style={[styles.defaultBadge, { backgroundColor: colors.highlight }]}>
                      <Text style={[styles.defaultBadgeText, { color: colors.background }]}>
                        Padrão
                      </Text>
                    </View>
                  )}
                  
                  {selectedLanguage === language.code && (
                    <IconSymbol name="checkmark.circle.fill" size={24} color={colors.accent} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Language Info */}
        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="info.circle" size={24} color={colors.accent} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>Sobre os Idiomas</Text>
            <Text style={[styles.infoText, { color: colors.muted }]}>
              A mudança de idioma será aplicada em toda a aplicação. Algumas funcionalidades podem precisar ser recarregadas.
            </Text>
          </View>
        </View>

        {/* Loading Overlay */}
        {isLoading && (
          <View style={[styles.loadingOverlay, { backgroundColor: colors.background + '80' }]}>
            <View style={[styles.loadingCard, { backgroundColor: colors.card }]}>
              <IconSymbol name="globe" size={32} color={colors.accent} />
              <Text style={[styles.loadingText, { color: colors.text }]}>
                Alterando idioma...
              </Text>
            </View>
          </View>
        )}
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
  currentLanguageCard: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  currentLanguageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentLanguageTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  currentLanguageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentLanguageBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  currentLanguageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentLanguageFlag: {
    fontSize: 32,
    marginRight: 16,
  },
  currentLanguageInfo: {
    flex: 1,
  },
  currentLanguageName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  currentLanguageNative: {
    fontSize: 14,
  },
  languagesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginHorizontal: 20,
  },
  languagesList: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  languageNative: {
    fontSize: 14,
  },
  languageRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  defaultBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '600',
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
    lineHeight: 20,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCard: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
