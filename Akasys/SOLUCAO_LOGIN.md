# 🔐 Solução do Problema de Login

## ⚠️ O que foi feito:

1. ✅ Adicionei **logs de debug** no `AuthContext.tsx` para identificar o problema
2. ✅ Configurei o uso da URL centralizada em `app.json`
3. ✅ Criei arquivos de teste para diagnóstico

## 🔍 Como Diagnosticar:

### **Passo 1: Verifique os logs no console do Expo**

Ao tentar fazer login, você verá mensagens como:
- `🌐 BASE_URL configurado: http://192.168.1.8:8000`
- `🔐 Tentando fazer login...`
- `📍 URL: http://192.168.1.8:8000/login`
- `👤 Email: seu@email.com`
- `📡 Response status: 200` (ou outro código)
- `📦 Response body: {...}`

### **Passo 2: Teste no navegador**

Abra o arquivo `test-backend-connection.html` no navegador e clique em "Testar Conexão".

### **Passo 3: Verifique se o backend está rodando**

```bash
# No terminal do backend, você deve ver:
INFO:     Uvicorn running on http://0.0.0.0:8000
```

## 🔧 Soluções Possíveis:

### **Problema 1: "Network request failed"**

**Causa**: Backend não está rodando ou IP errado.

**Solução**:
1. Certifique-se de que o backend FastAPI está rodando
2. Verifique se o IP no `app.json` está correto (atualmente: `http://192.168.1.8:8000`)
3. Se estiver testando em dispositivo físico, ambos devem estar na mesma rede Wi-Fi

### **Problema 2: "Credenciais inválidas" (401)**

**Causa**: Email ou senha incorretos, ou usuário não existe no banco.

**Solução**:
1. Verifique se o usuário existe no banco de dados:
   ```bash
   curl http://192.168.1.8:8000/usuario/1
   ```

2. Crie um usuário para teste (se necessário):
   ```bash
   curl -X POST http://192.168.1.8:8000/usuario \
     -H "Content-Type: application/json" \
     -d '{"nome": "Teste", "email": "teste@teste.com", "senha": "123456"}'
   ```

### **Problema 3: Backend não está acessível**

**Causa**: Firewall ou configuração de rede.

**Solução**:
1. No servidor FastAPI, certifique-se de rodar com:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

2. Verifique se o Windows Defender está bloqueando a conexão

## 📝 Checklist de Verificação:

- [ ] Backend FastAPI está rodando
- [ ] Backend está acessível em `http://192.168.1.8:8000`
- [ ] IP correto configurado em `app.json` (linha 45)
- [ ] Expo foi reiniciado após mudanças (`npx expo start -c`)
- [ ] Usuário existe no banco de dados
- [ ] Firewall não está bloqueando a porta 8000

## 🚀 Próximos Passos:

1. **Abra o console do Expo** (terminal onde rodou `expo start`)
2. **Tente fazer login** no app
3. **Copie os logs** que aparecem no console
4. **Compare** os logs com as soluções acima

## 📞 Informações para Depuração:

O **IP atual** configurado é: `http://192.168.1.8:8000`

Se este IP estiver errado, edite a linha 45 de `Akasys/app.json`:

```json
"API_BASE_URL": "http://SEU_IP_AQUI:8000"
```

Depois execute:
```bash
npx expo start -c
```

## 🎯 Comandos Úteis:

### Testar se o backend está rodando:
```bash
curl http://192.168.1.8:8000/
```

### Criar um usuário para teste:
```bash
curl -X POST http://192.168.1.8:8000/usuario ^
  -H "Content-Type: application/json" ^
  -d "{\"nome\": \"Teste\", \"email\": \"teste@teste.com\", \"senha\": \"123456\"}"
```

### Reiniciar o Expo (limpar cache):
```bash
npx expo start -c
```

## 📚 Arquivos Úteis:

- `TROUBLESHOOTING.md` - Guia completo de troubleshooting
- `test-backend-connection.html` - Teste interativo no navegador
- `config/api.ts` - Configuração centralizada de URLs

