# 🔧 Troubleshooting - Problema de Login

## Diagnóstico do Problema

O login está mostrando "Entrando..." e depois voltando, o que geralmente indica um erro na comunicação com o backend.

## Passos para Diagnosticar

### 1. Verifique se o Backend está Rodando

No terminal onde seu backend está rodando, você deve ver algo como:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 2. Verifique o IP Correto

O IP atual configurado no `app.json` é: `http://192.168.1.8:8000`

**IMPORTANTE**: Este IP DEVE ser:
- O IP da sua máquina local (não `localhost` ou `127.0.0.1` se estiver testando no dispositivo físico ou emulador)
- O mesmo IP em que o backend FastAPI está acessível

### 3. Como Descobrir o IP Correto

#### No Windows (PowerShell):
```powershell
ipconfig
```
Procure por "IPv4 Address" na seção da sua interface de rede (Wi-Fi ou Ethernet).
Exemplo: `192.168.1.123`

#### No Windows (CMD):
```cmd
ipconfig | findstr IPv4
```

### 4. Atualize o IP no app.json

Edite o arquivo `Akasys/app.json` e altere a linha 45:

```json
"API_BASE_URL": "http://SEU_IP_AQUI:8000"
```

**Exemplo**: Se seu IP for `192.168.1.100`:
```json
"API_BASE_URL": "http://192.168.1.100:8000"
```

### 5. Reinicie o Expo

Após alterar o `app.json`:

```bash
# Pare o servidor Expo (Ctrl+C)
# Limpe o cache e reinicie
npx expo start -c
```

### 6. Verifique os Logs

Ao tentar fazer login, verifique o console do Expo para ver os logs de debug que adicionamos:

```
🔐 Tentando fazer login...
📍 URL: http://192.168.1.8:8000/login
👤 Email: seu@email.com
📡 Response status: 200 (ou 401, 500, etc)
📦 Response body: {...}
```

### 7. Teste o Backend Diretamente

Abra um navegador ou use o curl para testar:

```bash
# Teste se o backend está rodando
curl http://SEU_IP:8000/

# Deve retornar: {"status": "ok", "msg": "API funfando"}
```

### 8. Teste o Login com curl

```bash
curl -X POST "http://SEU_IP:8000/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=seu@email.com&password=suasenha"
```

## Problemas Comuns

### Problema: "Network request failed"
**Solução**: 
- Verifique se o IP no `app.json` está correto
- Certifique-se de que o backend está rodando
- Verifique se está na mesma rede Wi-Fi (se estiver testando em dispositivo físico)

### Problema: Status 401 (Credenciais inválidas)
**Solução**:
- Verifique se o usuário existe no banco de dados
- Verifique se a senha está correta
- Confirme se está usando o email correto

### Problema: Status 500 (Erro interno)
**Solução**:
- Verifique os logs do servidor backend
- Confirme que o banco de dados está conectado
- Verifique se todas as dependências estão instaladas

## Teste Rápido no Backend

Certifique-se de ter um usuário criado. Você pode criar um usuário usando o endpoint:

```bash
curl -X POST "http://SEU_IP:8000/usuario" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste", "email": "teste@teste.com", "senha": "123456"}'
```

## Configuração de Firewall

Se estiver usando o Windows Defender ou outro firewall, certifique-se de que a porta 8000 está liberada para conexões locais.

## Próximos Passos

1. Identifique seu IP local usando `ipconfig`
2. Atualize o `app.json` com o IP correto
3. Reinicie o Expo com `npx expo start -c`
4. Tente fazer login novamente
5. Verifique os logs no console para ver o erro específico

