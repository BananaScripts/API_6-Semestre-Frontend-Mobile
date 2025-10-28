# API Configuration

This directory contains the API configuration utilities for the app.

## Configuration Source

The backend URL is configured in `app.json` under the `expo.extra.API_BASE_URL` field.

Currently configured as:
```json
{
  "expo": {
    "extra": {
      "API_BASE_URL": "http://192.168.1.7:8000"
    }
  }
}
```

## Usage

### Getting the API Base URL

```typescript
import { getApiBaseUrl } from '@/config/api';

const url = getApiBaseUrl();
// Returns: "http://192.168.1.7:8000"
```

### Getting the WebSocket URL

```typescript
import { getWebSocketUrl } from '@/config/api';

const wsUrl = getWebSocketUrl();
// Returns: "ws://192.168.1.7:8000"
```

### Getting a Full API Endpoint

```typescript
import { getApiUrl } from '@/config/api';

const endpoint = getApiUrl('/usuario');
// Returns: "http://192.168.1.7:8000/usuario"
```

### Getting a Full WebSocket Endpoint

```typescript
import { getWebSocketEndpoint } from '@/config/api';

const endpoint = getWebSocketEndpoint('/wb/chatbot');
// Returns: "ws://192.168.1.7:8000/wb/chatbot"
```

## Changing the Backend URL

To change the backend URL, edit `app.json`:

```json
{
  "expo": {
    "extra": {
      "API_BASE_URL": "http://your-backend-url:port"
    }
  }
}
```

After making changes:
1. Stop the Expo development server
2. Clear the cache: `npx expo start -c`
3. Restart the development server

## Files Updated

All files in the `(tabs)` folder and contexts have been updated to use this centralized configuration:
- `Akasys/app/(tabs)/index.tsx`
- `Akasys/app/(tabs)/admin.tsx`
- `Akasys/app/(tabs)/chat.tsx`
- `Akasys/contexts/AuthContext.tsx`

