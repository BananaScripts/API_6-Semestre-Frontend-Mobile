# 🌐 Solução - Problema de CORS

## O Problema

Ao rodar o app no navegador web (através do Expo), o navegador bloqueia requisições para o backend por política de CORS.

**Erro**: `Access-Control-Allow-Origin header is present on the requested resource`

## 🔧 Solução - Configurar CORS no Backend

Você precisa adicionar CORS ao seu backend FastAPI. Adicione este código no início do seu arquivo backend (provavelmente `main.py`):

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Dom Rock Backend")

# ============= ADICIONE ESTE CÓDIGO =============
# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8081",  # Expo Web
        "http://192.168.1.8:8081",
        "http://localhost:3000",
        "*"  # Temporariamente permitir tudo durante desenvolvimento
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ================================================
```

Ou, para aceitar todas as origens durante desenvolvimento:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Aceita qualquer origem
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📝 Passo a Passo

1. **Abra o arquivo do backend** (provavelmente onde você definiu `app = FastAPI()`)

2. **Adicione o import no topo**:
   ```python
   from fastapi.middleware.cors import CORSMiddleware
   ```

3. **Adicione o middleware após criar o app**:
   ```python
   app = FastAPI(title="Dom Rock Backend")
   
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # Em produção, especifique domínios
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

4. **Reinicie o backend** (geralmente Ctrl+C e depois `uvicorn main:app --reload`)

5. **Tente fazer login novamente**

## ⚠️ Alternativa Rápida (Temporária)

Se você quiser testar rapidamente sem mexer no código, pode usar a extensão do navegador "CORS Unblock" ou similar, mas **NÃO é recomendado para produção**.

## ✅ O Que Esperar

Depois de configurar CORS, o login deve funcionar! Você verá:
- ✅ Requisição enviada com sucesso
- ✅ Status 200 (ou 401 se credenciais estiverem erradas)
- ✅ Token retornado

## 📚 Referência

Documentação oficial do FastAPI sobre CORS:
https://fastapi.tiangolo.com/tutorial/cors/

