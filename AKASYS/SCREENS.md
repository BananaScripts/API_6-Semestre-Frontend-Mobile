# Telas da Aplicação - AKASYS

## Visão Geral

Aplicação desenvolvida com tema escuro e sem cores de destaque, seguindo um design minimalista e profissional. Todas as telas foram criadas com foco na usabilidade e experiência do usuário.

## 🎨 Tema Escuro

### Cores Utilizadas:
- **Background**: `#000000` (Preto)
- **Cards**: `#1A1A1A` (Cinza escuro)
- **Surface**: `#0F0F0F` (Cinza mais escuro)
- **Text**: `#FFFFFF` (Branco)
- **Muted**: `#4A4A4A` (Cinza médio)
- **Border**: `#2C2C2C` (Cinza para bordas)
- **Accent**: `#FFFFFF` (Branco para destaques)

## 📱 Telas Implementadas

### 1. 🏠 Dashboard (Home)
**Arquivo**: `app/(tabs)/index.tsx`

**Características:**
- Cards de métricas com indicadores de tendência
- Ações rápidas com navegação para páginas específicas
- Lista de dados recentes
- Design responsivo e moderno

**Componentes:**
- Cards de estatísticas (Vendas, Usuários, Conversão, Tempo)
- Botões de ação rápida (Relatórios, Analytics, Configurações, Suporte)
- Lista de atividades recentes

### 2. 💬 Chat
**Arquivo**: `app/(tabs)/chat.tsx`

**Características:**
- Lista de conversas com status online/offline
- Barra de pesquisa funcional
- Indicadores de mensagens não lidas
- Botão flutuante para nova conversa
- Design similar a apps de mensagem populares

**Funcionalidades:**
- Busca por nome ou email
- Indicadores visuais de status
- Badges de mensagens não lidas
- Navegação para conversas individuais

### 3. 👤 Usuário (Perfil)
**Arquivo**: `app/(tabs)/profile.tsx`

**Características:**
- Design estilo iFood com seções organizadas
- Informações do usuário no cabeçalho
- Opções agrupadas por categoria
- Navegação para páginas de configuração

**Seções:**
- **Conta**: Informações pessoais, senha, pagamento, endereços
- **Preferências**: Notificações, privacidade, idioma, tema
- **Suporte**: Ajuda, contato, avaliação, sobre
- **Legal**: Termos de uso, política de privacidade

### 4. 🛡️ Admin
**Arquivo**: `app/(tabs)/admin.tsx`

**Características:**
- CRUD completo de usuários
- Sistema de filtros e busca
- Estatísticas em tempo real
- Gerenciamento de permissões

**Funcionalidades:**
- Lista de usuários com status e roles
- Filtros por status (Todos, Ativos, Inativos, Suspensos)
- Busca por nome ou email
- Ações de edição e exclusão
- Indicadores visuais de status e permissões

## 🧭 Navegação

### Barra Inferior (4 Abas):
1. **Dashboard** - Ícone: `chart.bar`
2. **Chat** - Ícone: `message`
3. **Usuário** - Ícone: `person`
4. **Admin** - Ícone: `shield`

### Navegação Interna:
- Links para páginas específicas usando `expo-router`
- Transições suaves entre telas
- Feedback háptico em interações

## 🎯 Características do Design

### Consistência Visual:
- Tema escuro em todas as telas
- Tipografia consistente
- Espaçamentos padronizados
- Bordas arredondadas (12px)
- Sombras sutis para profundidade

### Componentes Reutilizáveis:
- `IconSymbol` para ícones do sistema
- Cards com bordas e sombras
- Botões com estados de interação
- Listas com separadores
- Badges e indicadores

### Responsividade:
- Layout adaptável para diferentes tamanhos
- Grid system flexível
- Componentes que se ajustam ao conteúdo

## 🔧 Tecnologias Utilizadas

- **React Native** - Framework principal
- **Expo Router** - Navegação baseada em arquivos
- **TypeScript** - Tipagem estática
- **Expo Symbols** - Ícones do sistema
- **React Native Safe Area Context** - Área segura
- **FlatList** - Listas performáticas

## 📁 Estrutura de Arquivos

```
app/
├── _layout.tsx              # Layout raiz
├── (tabs)/
│   ├── _layout.tsx          # Layout das abas
│   ├── index.tsx            # Dashboard
│   ├── chat.tsx             # Chat
│   ├── profile.tsx          # Usuário
│   └── admin.tsx            # Admin
└── modal.tsx                # Modal de exemplo

components/
├── custom-tab-bar.tsx       # Componentes de navegação
├── enhanced-haptic-tab.tsx  # Tab com feedback háptico
└── haptic-tab.tsx           # Tab original

constants/
└── theme.ts                 # Configuração de cores
```

## 🚀 Como Executar

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

## ✨ Próximas Funcionalidades

- [ ] Implementar páginas específicas de configuração
- [ ] Adicionar animações mais elaboradas
- [ ] Implementar sistema de notificações push
- [ ] Adicionar testes automatizados
- [ ] Implementar modo offline
- [ ] Adicionar internacionalização

---

**Desenvolvido com ❤️ usando React Native e Expo**
