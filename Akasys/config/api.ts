import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * Get the base URL for API requests
 * Reads from app.json extra.API_BASE_URL or falls back to default
 */
export function getApiBaseUrl(): string {
  const extra = (Constants.expoConfig as any)?.extra || {};
  const configured = extra.API_BASE_URL as string | undefined;
  
  if (configured) return configured;
  
  // Fallback baseado no platform
  return Platform.OS === 'android' 
    ? 'http://192.168.1.8:8000'
    : 'http://localhost:8000';
}

/**
 * Get the WebSocket URL for real-time connections
 * Converts HTTP/HTTPS URL to WS/WSS
 */
export function getWebSocketUrl(): string {
  const httpUrl = getApiBaseUrl();
  return httpUrl.replace('http://', 'ws://').replace('https://', 'wss://');
}

/**
 * Get full URL for an API endpoint
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}

/**
 * Get full URL for a WebSocket endpoint
 */
export function getWebSocketEndpoint(endpoint: string): string {
  const baseUrl = getWebSocketUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}

