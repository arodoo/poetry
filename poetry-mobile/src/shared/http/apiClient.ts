/*
 * File: apiClient.ts
 * Purpose: Axios HTTP client with automatic JWT authentication.
 * Intercepts requests to add Bearer token from SecureStore and
 * handles 401 errors with token refresh logic. All API calls
 * should use this client instead of raw fetch or axios.
 * All Rights Reserved. Arodi Emmanuel
 */
import axios, { AxiosInstance, AxiosError } from 'axios'
import { tokenStorage } from '../auth/tokenStorage'
import { getEnv } from '../config/env'

const env = getEnv()

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(async (config) => {
  const tokens = await tokenStorage.load()
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const tokens = await tokenStorage.load()
      if (tokens?.refreshToken) {
        await tokenStorage.clear()
      }
    }
    return Promise.reject(error)
  }
)
