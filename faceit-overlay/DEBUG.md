# Debugging Guide

## Текущий статус

✅ Dev-сервер запущен на `http://localhost:3001`
✅ CORS решен через Vite proxy
✅ Типы TypeScript обновлены для правильных ключей API

## Как проверить

1. Откройте в браузере: `http://localhost:3001/?nickname=ropz`
2. Откройте Dev Tools (F12)
3. Перейдите на вкладку Console
4. Вы должны увидеть:
   ```
   === FACEIT API Response ===
   User: {id: "...", nickname: "ropz", ...}
   Stats: {lifetime: {...}, segments: [...]}
   Stats Lifetime: {m1: "123", k5: "1.23", k6: "55", ...}
   Matches: [{...}, {...}, ...]
   ========================
   ```

## Проверка данных

### Если видите логи но данные пустые:

Проверьте структуру `Stats Lifetime`:
- Должны быть ключи типа `m1`, `k5`, `k6` 
- Если есть только полные названия типа "Win Rate %" - значит API изменился

### Если видите ошибку CORS:

```
Access to fetch at 'https://www.faceit.com/api/...' has been blocked by CORS policy
```

**Решение:** Перезапустите dev-сервер
```bash
# Остановите текущий (Ctrl+C)
npm run dev
```

### Если видите Network Error:

1. Проверьте что dev-сервер запущен
2. Проверьте URL - должен быть `/api/...` а не `https://www.faceit.com/api/...`
3. Проверьте `vite.config.ts` - proxy должен быть настроен

### Если данные загружаются но отображаются пустыми:

Проверьте computed свойства в `src/stores/player.ts`:
```ts
const winRate = computed(() => {
  if (!stats.value?.lifetime) return null
  return stats.value.lifetime.k6 || null  // k6 = Win Rate %
})
```

## API ключи

Основные ключи которые используются:

| Ключ | Значение | Где используется |
|------|----------|------------------|
| `m1` | Количество матчей | totalMatches |
| `k1` | Средние убийства | avgKills |
| `k2` | Средние смерти | avgDeaths |
| `k5` | Средний K/D | avgKD |
| `k6` | Винрейт % | winRate |
| `k8` | Процент HS | - |
| `k17` | ADR | - |

## Типичные проблемы

### 1. "Не указан параметр nickname"

**Причина:** URL без параметра  
**Решение:** Добавьте `?nickname=ropz` к URL

### 2. "Игрок не найден"

**Причина:** Неправильный никнейм или игрок не играет в CS2  
**Решение:** Проверьте никнейм на FACEIT.com

### 3. Данные показывают "--"

**Причина:** 
- API вернул пустой lifetime объект
- Игрок не имеет статистики в CS2
- Неправильные ключи в store

**Решение:** 
1. Проверьте Console logs
2. Убедитесь что `Stats Lifetime` не пустой
3. Проверьте что ключи совпадают (m1, k5, k6 и т.д.)

### 4. Vite proxy не работает

**Причина:** Конфигурация не применилась  
**Решение:** Перезапустите dev-сервер (полностью остановите и запустите снова)

## Полезные команды

```bash
# Перезапуск dev-сервера
npm run dev

# Проверка портов
netstat -ano | findstr :3001

# Очистка кеша
npm run dev -- --force

# Build для production
npm run build

# Preview production build
npm run preview
```

## Логирование

Все логи добавлены в `src/stores/player.ts`:

```ts
console.log('=== FACEIT API Response ===')
console.log('User:', data.user)
console.log('Stats:', data.stats)
console.log('Stats Lifetime:', data.stats?.lifetime)
console.log('Matches:', data.matches)
console.log('========================')
```

После проверки логи можно удалить для production.
