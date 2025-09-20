# Sistema de Navegação - AKASYS

## Visão Geral

Este projeto implementa um sistema de navegação robusto e moderno usando Expo Router com uma barra de navegação inferior customizada. O código foi estruturado de forma limpa e bem organizada.

## Estrutura da Navegação

### Layout Principal
- **Arquivo**: `app/_layout.tsx`
- **Função**: Define o layout raiz da aplicação com Stack Navigator
- **Recursos**: Suporte a temas claro/escuro, configuração de telas modais

### Layout de Abas
- **Arquivo**: `app/(tabs)/_layout.tsx`
- **Função**: Configura a barra de navegação inferior com 4 abas
- **Abas**:
  - 🏠 **Início** - Dashboard principal
  - ✈️ **Explorar** - Descoberta de conteúdo
  - 👤 **Perfil** - Informações do usuário
  - ⚙️ **Configurações** - Ajustes da aplicação

## Páginas Implementadas

### 1. Página Inicial (`index.tsx`)
- Dashboard com estatísticas rápidas
- Ações rápidas
- Atividades recentes
- Design responsivo e moderno

### 2. Página de Exploração (`explore.tsx`)
- Barra de pesquisa
- Categorias organizadas
- Itens em destaque
- Ações rápidas

### 3. Página de Perfil (`profile.tsx`)
- Informações do usuário
- Opções de perfil
- Botão de logout
- Interface limpa e intuitiva

### 4. Página de Configurações (`settings.tsx`)
- Configurações organizadas por seções
- Switches para opções
- Suporte a modo escuro
- Configurações de privacidade

## Componentes Customizados

### CustomTabBarButton
- **Arquivo**: `components/custom-tab-bar.tsx`
- **Recursos**:
  - Feedback háptico ao tocar
  - Animações suaves
  - Indicador visual para aba ativa
  - Suporte a temas

### TabIcon
- **Recursos**:
  - Animações de escala
  - Ícones dinâmicos (preenchido/vazio)
  - Cores adaptáveis ao tema

## Recursos Implementados

### ✅ Navegação por Abas
- 4 abas principais com ícones intuitivos
- Transições suaves entre páginas
- Indicadores visuais de aba ativa

### ✅ Feedback Háptico
- Vibração leve ao tocar em abas
- Diferentes intensidades para diferentes ações
- Melhora a experiência do usuário

### ✅ Suporte a Temas
- Modo claro e escuro
- Cores adaptáveis automaticamente
- Consistência visual em toda a aplicação

### ✅ Animações
- Ícones com animação de escala
- Transições suaves
- Feedback visual responsivo

### ✅ Design Responsivo
- Adaptação para diferentes tamanhos de tela
- Layout flexível
- Otimizado para iOS e Android

## Como Usar

### Executar o Projeto
```bash
# Instalar dependências
npm install

# Executar no iOS
npm run ios

# Executar no Android
npm run android

# Executar no Web
npm run web
```

### Adicionar Nova Aba
1. Crie um novo arquivo em `app/(tabs)/`
2. Adicione a configuração no `_layout.tsx`:
```tsx
<Tabs.Screen
  name="nova-aba"
  options={{
    title: 'Nova Aba',
    tabBarIcon: ({ color, focused }) => (
      <TabIcon 
        size={24} 
        name={focused ? "icone.fill" : "icone"} 
        color={color}
        focused={focused}
      />
    ),
  }}
/>
```

### Personalizar Cores
Edite o arquivo `constants/theme.ts` para modificar as cores do tema.

## Estrutura de Arquivos

```
app/
├── _layout.tsx              # Layout raiz
├── (tabs)/
│   ├── _layout.tsx          # Layout das abas
│   ├── index.tsx            # Página inicial
│   ├── explore.tsx          # Página de exploração
│   ├── profile.tsx          # Página de perfil
│   └── settings.tsx         # Página de configurações
└── modal.tsx                # Modal de exemplo

components/
└── custom-tab-bar.tsx       # Componentes de navegação customizados
```

## Tecnologias Utilizadas

- **Expo Router** - Navegação baseada em arquivos
- **React Navigation** - Sistema de navegação
- **Expo Haptics** - Feedback háptico
- **React Native Reanimated** - Animações
- **Expo Symbols** - Ícones do sistema
- **TypeScript** - Tipagem estática

## Próximos Passos

- [ ] Implementar navegação aninhada
- [ ] Adicionar mais animações
- [ ] Implementar navegação por gestos
- [ ] Adicionar testes de navegação
- [ ] Otimizar performance

---

**Desenvolvido com ❤️ usando Expo Router e React Native**
