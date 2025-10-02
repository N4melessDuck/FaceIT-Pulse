# Решение проблемы CORS

## Проблема

FACEIT API не устанавливает заголовки CORS, поэтому прямые запросы из браузера блокируются.

## Решения

### 1. Для разработки (текущее) ✅

**Vite Proxy** - проксирование запросов через dev-сервер.

**Как работает:**
- Запросы идут на `/api/*`
- Vite проксирует их на `https://www.faceit.com/api/*`
- CORS не проверяется т.к. запрос серверный

**Настройка:** `vite.config.ts`

```ts
server: {
  proxy: {
    '/api': {
      target: 'https://www.faceit.com',
      changeOrigin: true,
      secure: false
    }
  }
}
```

### 2. Для production

#### Вариант A: CORS Proxy (быстро, но ненадежно)

Используем публичный CORS proxy:

```ts
// src/config/constants.ts
const isDev = import.meta.env.DEV
export const API_BASE_URL = isDev 
  ? '/api' 
  : 'https://corsproxy.io/?https://www.faceit.com/api'
```

**Минусы:**
- Может быть медленным
- Может упасть
- Не для серьезных проектов

**Альтернативные proxy:**
- `https://api.allorigins.win/raw?url=`
- `https://corsproxy.io/?`
- `https://cors-anywhere.herokuapp.com/`

#### Вариант B: Собственный Backend (рекомендуется) ⭐

Создайте простой Express/FastAPI сервер:

**Express пример:**

```js
// server.js
const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/api/*', async (req, res) => {
  try {
    const url = `https://www.faceit.com${req.url}`
    const response = await axios.get(url)
    res.json(response.data)
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message
    })
  }
})

app.listen(8080, () => console.log('Proxy running on :8080'))
```

Тогда в production:

```ts
export const API_BASE_URL = isDev 
  ? '/api' 
  : 'https://your-server.com/api'
```

#### Вариант C: Browser Extension

Расширения Chrome/Firefox не имеют ограничений CORS:

```json
// manifest.json
{
  "permissions": [
    "https://www.faceit.com/*"
  ],
  "host_permissions": [
    "https://www.faceit.com/*"
  ]
}
```

### 3. Для OBS

**В OBS Browser Source CORS не проблема!**

OBS использует CEF (Chromium Embedded Framework) без веб-безопасности:
- Можно делать прямые запросы на FACEIT API
- Просто используйте полный URL: `https://www.faceit.com/api`

```ts
// Для OBS билда
export const API_BASE_URL = 'https://www.faceit.com/api'
```

## Рекомендации

### Текущий стек (MVP):
1. **Dev:** Vite proxy ✅
2. **Production web:** CORS proxy (corsproxy.io)
3. **OBS:** Прямые запросы

### Production стек (real):
1. **Dev:** Vite proxy
2. **Production:** Собственный backend
3. **OBS:** Прямые запросы

## Быстрый старт

```bash
# Разработка (работает через Vite proxy)
npm run dev

# Production build для веб
npm run build

# Production build для OBS (без CORS proxy)
VITE_TARGET=obs npm run build
```

## Env переменные

Создайте `.env.local`:

```env
# Development
VITE_API_BASE_URL=/api

# Production (uncomment нужный вариант)
# VITE_API_BASE_URL=https://corsproxy.io/?https://www.faceit.com/api
# VITE_API_BASE_URL=https://your-server.com/api
# VITE_API_BASE_URL=https://www.faceit.com/api  # Для OBS
```

Затем в коде:

```ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
```

## Troubleshooting

**"Network Error" или "CORS blocked"**
- Убедитесь что dev-сервер запущен (`npm run dev`)
- Проверьте что используется `/api` а не `https://www.faceit.com/api`
- Перезапустите dev-сервер после изменения `vite.config.ts`

**"404 Not Found"**
- Проверьте что эндпоинт правильный
- Проверьте proxy конфигурацию в `vite.config.ts`

**В production не работает**
- Убедитесь что используете CORS proxy или свой backend
- Проверьте что `API_BASE_URL` правильно установлен для production
