# API Documentation

## Описание проекта
Документация по открытым API запросам для проекта расширения FuturesDemoExt.

---

## История запросов и ответов

### Дата создания: 2 октября 2025

---

## Оглавление
- [Запросы и ответы](#запросы-и-ответы)
- [Примеры использования](#примеры-использования)
- [Структура данных](#структура-данных)

---

## Запросы и ответы

### 1. Получение информации о пользователе по никнейму

**Описание:** Получение детальной информации о пользователе FACEIT по его никнейму.

**Метод:** `GET`

**URL:** `https://www.faceit.com/api/users/v1/nicknames/{nickname}`

**Параметры:**
- `{nickname}` - никнейм пользователя (например: `ropz`)

**Пример запроса:**
```
GET https://www.faceit.com/api/users/v1/nicknames/ropz
```

**Структура ответа:**

```json
{
    "result": "OK",
    "payload": {
        "id": "string",                    // Уникальный ID пользователя
        "activated_at": "string",          // Дата активации аккаунта (ISO 8601)
        "avatar": "string",                // URL аватара
        "country": "string",               // Код страны (ISO 3166-1 alpha-2)
        "created_at": "string",            // Дата создания аккаунта (ISO 8601)
        "flag": "string",                  // Флаг основной игры
        "friends": ["string"],             // Массив ID друзей
        "games": {
            "game_name": {
                "game_id": "string",       // ID игрока в конкретной игре
                "game_name": "string",     // Никнейм в игре
                "faceit_elo": number,      // Рейтинг ELO
                "region": "string",        // Регион
                "skill_level": number,     // Уровень навыка (1-10)
                "skill_level_label": "string",
                "tags": ["string"]         // Теги (например, "ac_req")
            }
        },
        "memberships": ["string"],         // Типы подписки
        "nickname": "string",              // Никнейм пользователя
        "registration_status": "string",   // Статус регистрации
        "streaming": {
            "twitch_id": "string"          // ID Twitch канала
        },
        "tags": ["string"],                // Различные теги пользователя
        "timezone": "string",              // Часовой пояс
        "verified": boolean,               // Статус верификации
        "platforms": {
            "platform_name": {
                "id": "string",
                "nickname": "string",
                "id64": "string"
            }
        }
    }
}
```

**Пример ответа:**

<details>
<summary>Развернуть полный ответ</summary>

```json
{
    "result": "OK",
    "payload": {
        "id": "d3de50b6-c0fb-4d93-a304-0bdf7749ea5d",
        "activated_at": "2014-10-25T00:49:23.393Z",
        "avatar": "https://distribution.faceit-cdn.net/images/702c7586-cb7e-4866-9864-1a700f5143c0.jpeg",
        "country": "ee",
        "created_at": "2014-10-25T00:49:23.393Z",
        "flag": "cs2",
        "friends": [...],
        "games": {
            "cs2": {
                "game_id": "76561197991272318",
                "game_name": "ropz",
                "faceit_elo": 2915,
                "region": "EU",
                "skill_level": 10,
                "skill_level_label": "10",
                "tags": ["ac_req"]
            },
            "csgo": {
                "game_id": "76561197991272318",
                "game_name": "ropz",
                "faceit_elo": 3872,
                "region": "EU",
                "skill_level": 10,
                "skill_level_label": "10",
                "tags": ["ac_req"]
            }
        },
        "memberships": ["free"],
        "nickname": "ropz",
        "registration_status": "active",
        "streaming": {
            "twitch_id": "ropz"
        },
        "tags": ["btc", "fpl_eu_17", "pro", ...],
        "timezone": "2.0",
        "verified": true,
        "platforms": {
            "steam": {
                "id": "STEAM_0:0:15503295",
                "nickname": "ropz",
                "id64": "76561197991272318"
            }
        }
    }
}
```

</details>

**Ключевые поля:**
- `id` - используется для дальнейших запросов к API
- `games` - содержит статистику по каждой игре (ELO, уровень, регион)
- `faceit_elo` - рейтинг игрока (чем выше, тем лучше)
- `skill_level` - уровень от 1 до 10
- `friends` - массив UUID друзей
- `platforms` - связанные игровые платформы (Steam, Xbox и т.д.)

**Заметки:**
- API возвращает информацию по всем играм пользователя
- Поле `friends` может содержать большое количество ID
- Для CS2 и CS:GO используются одинаковые Steam ID
- Verified пользователи имеют подтвержденный статус

---

### 2. Получение детальной статистики игрока по игре

**Описание:** Получение полной статистики игрока для конкретной игры, включая lifetime статистику и сегменты (по соревнованиям, картам).

**Метод:** `GET`

**URL:** `https://www.faceit.com/api/stats/v1/stats/users/{user_id}/games/{game}`

**Параметры:**
- `{user_id}` - UUID пользователя (из предыдущего запроса)
- `{game}` - ID игры (например: `cs2`, `csgo`)

**Пример запроса:**
```
GET https://www.faceit.com/api/stats/v1/stats/users/d3de50b6-c0fb-4d93-a304-0bdf7749ea5d/games/cs2
```

**Структура ответа:**

```json
{
    "lifetime": {
        "_id": {
            "game": "string",
            "playerId": "string"
        },
        "rev": number,                    // Revision номер
        "m1": "string",                   // Количество матчей
        "m2": "string",                   // Победы
        "m3": "string",                   // Убийства
        "m4": "string",                   // Смерти
        "m7": "string",                   // K/D Ratio
        "m13": "string",                  // Total Headshots %
        "k5": "string",                   // Average K/D Ratio
        "k6": "string",                   // Win Rate %
        "k8": "string",                   // Average Headshots %
        "k17": "string",                  // ADR (Average Damage per Round)
        "k18": "string",                  // Entry Success Rate
        "k19": "string",                  // Entry Rate
        // ... множество других метрик
        "updated_at": number,             // Timestamp обновления
        "created_at": number              // Timestamp создания
    },
    "segments": [
        {
            "_id": {
                "game": "string",
                "gameMode": "string",
                "segmentId": "string",    // Тип сегмента (competitions, csgo_map)
                "playerId": "string"
            },
            "segments": {
                "segment_uuid": {         // UUID соревнования или название карты
                    "k1": "string",       // Average Kills
                    "k2": "string",       // Average Deaths
                    "k5": "string",       // Average K/D Ratio
                    "k6": "string",       // Win Rate %
                    "m1": "string",       // Matches
                    "m2": "string",       // Wins
                    // ... дополнительные метрики для сегмента
                }
            }
        }
    ]
}
```

**Основные метрики (ключи):**

| Ключ | Описание | Тип |
|------|----------|-----|
| `m1` | Количество матчей | Total |
| `m2` | Победы | Total |
| `m3` | Убийства | Total |
| `m4` | Смерти | Total |
| `m5` | Ассисты | Total |
| `m6` | MVPs | Total |
| `m7` | K/D Ratio | Total |
| `m8` | Раунды | Total |
| `m9` | Хедшоты | Total |
| `k1` | Средние убийства | Average |
| `k2` | Средние смерти | Average |
| `k5` | Средний K/D Ratio | Average |
| `k6` | Процент побед | Win Rate % |
| `k7` | Хедшотов за матч | Average |
| `k8` | Процент хедшотов | Average % |
| `k17` | ADR (Average Damage per Round) | Average |
| `k18` | Entry Success Rate | Rate |
| `k19` | Entry Rate | Rate |

**Типы сегментов:**

1. **`competitions`** - Статистика по соревнованиям
   - Каждый UUID представляет отдельное соревнование
   
2. **`csgo_map`** - Статистика по картам
   - Ключи: `de_ancient`, `de_mirage`, `de_dust2`, `de_inferno`, `de_nuke`, `de_anubis`, `de_vertigo` и т.д.

**Пример использования данных:**

```javascript
// Lifetime статистика
const totalMatches = response.lifetime.m1;
const winRate = response.lifetime.k6;
const avgKD = response.lifetime.k5;

// Статистика по картам
const mapStats = response.segments.find(s => s._id.segmentId === 'csgo_map');
const mirageStats = mapStats.segments['de_mirage'];
const mirageWinRate = mirageStats.k6;
```

**Заметки:**
- Все числовые значения возвращаются как строки
- Метрики с префиксом `m` - это total (общие) значения
- Метрики с префиксом `k` - это calculated (вычисленные) значения
- `segments` может содержать статистику по разным критериям (карты, соревнования)
- Некоторые метрики доступны только в расширенной статистике (extended stats)
- `rev` увеличивается с каждым обновлением статистики

---

### 3. Получение конфигурации статистики для игры

**Описание:** Получение маппинга всех метрик статистики для конкретной игры. Содержит расшифровку ключей метрик, их описания и группировку.

**Метод:** `GET`

**URL:** `https://www.faceit.com/api/stats/v1/stats/configuration/{game}`

**Параметры:**
- `{game}` - ID игры (например: `cs2`, `csgo`)

**Пример запроса:**
```
GET https://www.faceit.com/api/stats/v1/stats/configuration/cs2
```

**Структура ответа:**

```json
{
    "id": "string",                      // ID игры
    "mapping": {
        "metric_key": {
            "format": "string",          // Формат отображения (null, "0.0%", "0.00")
            "label": {
                "en": "string"           // Название метрики на английском
            },
            "source": "string",          // Источник данных (null или название поля)
            "style": "string",           // CSS стиль (null)
            "type": "string",            // Тип метрики (null)
            "values": {},                // Дополнительные значения
            "key_name": "string"         // Ключевое имя в snake_case
        }
    },
    "grouping": {                        // Группировка метрик для разных представлений
        "main_stats": [...],             // Основные статистики
        "performance": [...],            // Производительность
        "match_history": [...],          // История матчей
        "scoreboard": {...}              // Конфигурация таблицы результатов
    },
    "modeMapping": {                     // Маппинг игровых режимов
        "5v5": ["5v5"],
        "Wingman": ["Wingman"]
    }
}
```

**Основные разделы mapping:**

| Префикс | Назначение | Примеры |
|---------|-----------|---------|
| `c*` | Calculated (вычисляемые) | `c2` (K/D Ratio), `c3` (K/R Ratio), `c10` (ADR) |
| `i*` | Individual/Instant (индивидуальные) | `i6` (Kills), `i7` (Assists), `i8` (Deaths) |
| `k*` | Key metrics (ключевые метрики) | `k5` (Avg K/D), `k6` (Win Rate %), `k17` (ADR) |
| `m*` | Match/Total metrics (матч/общие) | `m1` (Matches), `m2` (Wins), `m3` (Kills) |
| `s*` | Streak/Series (серии) | `s0` (Recent Results), `s1` (Current Win Streak) |

**Полезные группы в grouping:**

```json
{
    "main_stats": ["m1", "k6", "s2", "s0", "k5", "k8"],
    "performance": ["elo", "k5", "k9", "k8", "k7"],
    "match_history": ["i10", "i18", "i1"],
    "scoreboard": {
        "default": ["rws", "kills", "deaths", "assists", "adr", "kd", "kr", "hsKills", ...],
        "advanced": ["kast", "accuracy", "shots", "hits", ...],
        "entry": ["entryAttempts", "entryKills", "entryDeaths", ...],
        "clutch": ["clutchRoundsWon", "clutchRoundsLost", "1v1Wins", ...]
    }
}
```

**Примеры расшифровки метрик:**

```json
{
    "c2": {
        "label": { "en": "K/D Ratio" },
        "key_name": "kill_death_ratio"
    },
    "c10": {
        "label": { "en": "ADR" },
        "key_name": "player_match_adr"
    },
    "k17": {
        "label": { "en": "ADR" },
        "key_name": "adr"
    },
    "i1": {
        "label": { "en": "Map" },
        "source": "map",
        "values": {
            "de_dust2": {
                "label": { "en": "Dust2" },
                "image_url_regular": "...",
                "image_url_small": "..."
            }
        }
    }
}
```

**Использование:**

```javascript
// Получить название метрики
const metricLabel = config.mapping['k17'].label.en; // "ADR"

// Получить все доступные карты
const maps = Object.keys(config.mapping['i1'].values);

// Получить метрики для основной таблицы
const mainMetrics = config.grouping.main_stats;
```

**Заметки:**
- Используйте этот endpoint для создания UI и правильного отображения метрик
- Конфигурация содержит информацию о форматировании значений
- `values` для карт содержит изображения и локализованные названия
- `grouping` определяет, какие метрики показывать в разных частях интерфейса
- Конфигурация может обновляться с добавлением новых метрик
- Некоторые метрики помечены как `extended: "1"` (расширенная статистика)

---

### 4. Получение истории матчей игрока

**Описание:** Получение истории последних матчей игрока с детальной статистикой по каждому матчу.

**Метод:** `GET`

**URL:** `https://www.faceit.com/api/stats/v1/stats/time/users/{user_id}/games/{game}`

**Параметры URL:**
- `{user_id}` - UUID пользователя
- `{game}` - ID игры (например: `cs2`, `csgo`)

**Query параметры:**
- `size` - Количество матчей (default: 20, max: обычно до 100)
- `game_mode` - Режим игры (например: `5v5`, `Wingman`, `2v2`)
- `from` - Timestamp начала периода (опционально)
- `to` - Timestamp конца периода (опционально)

**Пример запроса:**
```
GET https://www.faceit.com/api/stats/v1/stats/time/users/d3de50b6-c0fb-4d93-a304-0bdf7749ea5d/games/cs2?size=20&game_mode=5v5
```

**Структура ответа:**

Возвращает массив объектов матчей:

```json
[
    {
        "_id": {
            "matchId": "string",          // ID матча
            "playerId": "string"          // ID игрока
        },
        "created_at": number,             // Timestamp создания
        "updated_at": number,             // Timestamp обновления
        
        // Основная статистика
        "i6": "string",                   // Kills (убийства)
        "i7": "string",                   // Assists (ассисты)
        "i8": "string",                   // Deaths (смерти)
        "i9": "string",                   // MVPs
        "i10": "string",                  // Win (1 - победа, 0 - поражение)
        "i13": "string",                  // Headshots (хедшоты)
        "i14": "string",                  // Triple Kills (3k)
        "i15": "string",                  // Quadro Kills (4k)
        "i16": "string",                  // Penta Kills (5k)
        "i40": "string",                  // Double Kills (2k)
        
        // Вычисляемые метрики
        "c2": "string",                   // K/D Ratio
        "c3": "string",                   // K/R Ratio
        "c4": "string",                   // Headshot %
        "c10": "string",                  // ADR (Average Damage per Round)
        
        // Информация о матче
        "matchId": "string",              // Полный ID матча
        "competitionId": "string",        // ID соревнования
        "date": number,                   // Timestamp даты матча
        "game": "string",                 // Игра (cs2)
        "gameMode": "string",             // Режим (5v5)
        "i0": "string",                   // Регион (EU, NA, OCE и т.д.)
        "i1": "string",                   // Карта (de_dust2, de_mirage и т.д.)
        "i12": "string",                  // Количество раундов
        "i18": "string",                  // Счет матча ("13 / 9")
        "i19": "string",                  // Overtime score
        
        // Информация о половинах
        "i3": "string",                   // First Half Score
        "i4": "string",                   // Second Half Score
        
        // Информация о команде
        "teamId": "string",               // UUID команды
        "i2": "string",                   // Winner Team ID
        "i5": "string",                   // Название команды
        "premade": boolean,               // Premade команда или нет
        
        // Дополнительная информация
        "nickname": "string",             // Никнейм игрока
        "playerId": "string",             // UUID игрока
        "matchRound": "string",           // Раунд в серии Bo3/Bo5
        "played": "string",               // Количество сыгранных карт в серии
        "bestOf": "string",               // Формат серии (1, 2, 3, 5)
        "status": "string",               // Статус (APPLIED)
        "elo": "string",                  // ELO после матча (может отсутствовать)
        "c1": "string",                   // Match count (обычно "1")
        "c5": "string"                    // Final Score
    }
]
```

**Основные поля и их расшифровка:**

| Поле | Описание | Тип | Пример |
|------|----------|-----|--------|
| `i6` | Убийства | string | "22" |
| `i7` | Ассисты | string | "5" |
| `i8` | Смерти | string | "16" |
| `i9` | MVP раунды | string | "3" |
| `i10` | Результат (1=WIN, 0=LOSS) | string | "1" |
| `i13` | Хедшоты | string | "10" |
| `i14` | Triple Kills (3k) | string | "2" |
| `i15` | Quadro Kills (4k) | string | "0" |
| `i16` | Penta Kills (5k/ACE) | string | "0" |
| `i40` | Double Kills (2k) | string | "3" |
| `c2` | K/D Ratio | string | "1.38" |
| `c3` | K/R Ratio | string | "0.92" |
| `c4` | Headshot % | string | "45" |
| `c10` | ADR | string | "92.1" |
| `i1` | Карта | string | "de_nuke" |
| `i18` | Счет матча | string | "11 / 13" |

**Определение победы/поражения:**

```javascript
// Проверка результата матча
const isWin = match.i10 === "1";
const isLoss = match.i10 === "0";

// Проверка победителя команды
const isTeamWinner = match.teamId === match.i2;
```

**Работа с сериями (Bo2/Bo3):**

```javascript
// Определение серии
const isSeries = parseInt(match.bestOf) > 1;
const currentMapInSeries = match.matchRound; // "1", "2", "3"
const totalMapsPlayed = match.played;        // "1", "2", "3"

// Пример: Bo3, сыграли 2 карты
// match.bestOf = "3"
// match.matchRound = "2"
// match.played = "2"
```

**Фильтрация матчей:**

```javascript
// Только победы
const wins = matches.filter(m => m.i10 === "1");

// Только на определенной карте
const dustMatches = matches.filter(m => m.i1 === "de_dust2");

// Матчи с высоким K/D
const goodPerformance = matches.filter(m => parseFloat(m.c2) > 1.5);

// Premade матчи
const premadeMatches = matches.filter(m => m.premade === true);
```

**Вычисление статистики:**

```javascript
// Средний K/D за последние N матчей
const avgKD = matches.reduce((sum, m) => sum + parseFloat(m.c2), 0) / matches.length;

// Win Rate
const winRate = (matches.filter(m => m.i10 === "1").length / matches.length) * 100;

// Средний ADR
const avgADR = matches.reduce((sum, m) => sum + parseFloat(m.c10), 0) / matches.length;

// Всего убийств
const totalKills = matches.reduce((sum, m) => sum + parseInt(m.i6), 0);
```

**Пример ответа (один матч):**

```json
{
    "_id": {
        "matchId": "66f53bbfde0ff60007f9d967",
        "playerId": "d3de50b6-c0fb-4d93-a304-0bdf7749ea5d"
    },
    "i6": "22",
    "i7": "2",
    "i8": "16",
    "i9": "3",
    "i10": "1",
    "i13": "10",
    "c2": "1.38",
    "c10": "92.1",
    "i1": "de_nuke",
    "i18": "11 / 13",
    "teamId": "5086144a-69e4-4e7b-99cb-f724f0c6dc3e",
    "i5": "FaZe Clan",
    "premade": true,
    "competitionId": "b020a295-3a54-46dc-9bfc-a513760bbd48",
    "date": 1727347646000,
    "elo": "2915"
}
```

**Заметки:**
- Все числовые значения возвращаются как строки
- Массив отсортирован по дате (новые матчи первые)
- `elo` может отсутствовать в некоторых матчах (старые матчи или специальные турниры)
- `premade: true` означает, что игрок играл в составе организованной команды
- `matchRound` и `played` используются для отслеживания прогресса в сериях Bo2/Bo3/Bo5
- Поле `i19` содержит счет овертаймов, если были
- `status: "APPLIED"` означает, что статистика применена к профилю игрока
- Для получения большего количества матчей используйте параметр `size`
- Можно фильтровать по датам с помощью параметров `from` и `to` (timestamp в миллисекундах)

---

### 5. Получение детальной информации о матче

**Описание:** Получение полной информации о конкретном матче, включая детальную статистику всех игроков обеих команд.

**Метод:** `GET`

**URL:** `https://www.faceit.com/api/stats/v3/matches/{match_id}`

**Параметры:**
- `{match_id}` - ID матча (например: `1-a0cdcd1c-6e29-4dc0-aaa0-59b7c787d794`)

**Пример запроса:**
```
GET https://www.faceit.com/api/stats/v3/matches/1-a0cdcd1c-6e29-4dc0-aaa0-59b7c787d794
```

**Структура ответа:**

<details>
<summary>Развернуть полный JSON ответ</summary>

```json
[
    {
        "_id": "string",                    // MongoDB ID записи
        "created_at": 1754004534675,        // Timestamp создания (мс)
        "updated_at": 1754004534675,        // Timestamp обновления (мс)
        "bestOf": "1",                      // Формат серии (Bo1/Bo2/Bo3/Bo5)
        "competitionId": "string",          // ID соревнования
        "date": 1754004534000,              // Дата матча (timestamp в мс)
        "game": "cs2",                      // Название игры
        "gameMode": "5v5",                  // Режим игры
        "i0": "EU",                         // Регион
        "i1": "de_train",                   // Название карты
        "i12": "22",                        // Количество раундов
        "i18": "13 / 9",                    // Финальный счет
        "i2": "string",                     // ID победившей команды
        "matchId": "string",                // Полный ID матча
        "matchRound": "1",                  // Номер раунда в серии
        "played": "1",                      // Сыграно раундов в серии
        "teams": [
            {
                "i19": "0",                 // Счет овертайма
                "players": [
                    {
                        "nickname": "string",      // Никнейм игрока
                        "playerId": "string",      // ID игрока
                        "elo": 3996,              // ELO рейтинг
                        
                        // Основная статистика
                        "i6": "18",               // Убийства (Kills)
                        "i7": "6",                // Помощи (Assists)
                        "i8": "17",               // Смерти (Deaths)
                        "i9": "3",                // MVP
                        "i10": "1",               // Результат (1=победа, 0=поражение)
                        "i12": "22",              // Раунды
                        "i13": "10",              // Хэдшоты (Headshots)
                        
                        // Мультикиллы
                        "i14": "0",               // Triple Kills
                        "i15": "1",               // Quadro Kills
                        "i16": "0",               // Penta Kills
                        "i40": "3",               // Double Kills
                        
                        // Расширенная статистика
                        "i20": "1972",            // Урон (Damage)
                        "i21": "7",               // Entry Count (попытки первых фрагов)
                        "i22": "3",               // Entry Wins (удачные первые фраги)
                        "i23": "0",               // 1v1 Count
                        "i24": "0",               // 1v1 Wins
                        "i25": "0",               // 1v2 Count
                        "i26": "0",               // 1v2 Wins
                        "i27": "17",              // Ослепленные враги (Enemies Flashed)
                        "i28": "18",              // Количество бросков флешек
                        "i29": "9",               // Успешных флешек (Flash Successes)
                        "i30": "156",             // Урон утилитой (Utility Damage)
                        "i31": "11",              // Использовано утилиты
                        "i32": "5",               // Враги, повреждённые утилитой
                        "i33": "4",               // Успешное использование утилиты
                        "i34": "1",               // Clutch Kills
                        "i35": "3",               // First Kills
                        "i36": "0",               // Knife Kills
                        "i37": "0",               // Zeus Kills
                        "i38": "4",               // Pistol Kills
                        "i39": "0",               // Sniper Kills
                        
                        // Вычисляемая статистика (как в конфигурации)
                        "c2": "1.06",             // K/D Ratio
                        "c3": "0.82",             // K/R Ratio
                        "c4": "56",               // Headshot %
                        "c10": "89.6",            // ADR (Average Damage per Round)
                        "c11": "0.43",            // Entry Success Rate
                        "c12": "0.32",            // Entry Rate
                        "c13": "0",               // 1v1 Win Rate
                        "c14": "0",               // 1v2 Win Rate
                        "c15": "0.77",            // Enemies Flashed per Round
                        "c16": "0.5",             // Flash Success Rate
                        "c17": "0.82",            // Flashes per Round
                        "c18": "14.18",           // Utility Damage Success Rate
                        "c19": "7.09",            // Utility Damage per Round
                        "c20": "0.36",            // Utility Success Rate
                        "c21": "0.5",             // Utility Usage per Round
                        "c22": "0",               // Sniper Kill Rate
                        "c36": "0"                // Sniper Kill Rate per Round
                    }
                ],
                "teamId": "string",             // ID команды (совпадает с ID игрока-лидера)
                "i3": "10",                     // Счет первой половины
                "i4": "3",                      // Счет второй половины
                "i5": "team_AMSALEM",           // Название команды
                "premade": false,               // Организованная команда?
                "i17": "1",                     // Победа команды (1=победа, 0=поражение)
                "c5": "13",                     // Финальный счет команды
                "c9": "7.6"                     // Средние хэдшоты команды
            }
        ],
        "version": 1
    }
]
```

</details>

**Таблица ключевых полей игрока:**

| Код поля | Название (EN) | Название (RU) | Описание |
|----------|---------------|---------------|----------|
| `i6` | Kills | Убийства | Общее количество убийств |
| `i7` | Assists | Помощи | Количество помощей в убийствах |
| `i8` | Deaths | Смерти | Количество смертей |
| `i9` | MVPs | MVP | Количество раундов MVP |
| `i10` | Result | Результат | 1 = победа, 0 = поражение |
| `i13` | Headshots | Хэдшоты | Количество убийств в голову |
| `i20` | Damage | Урон | Общий нанесённый урон |
| `i21` | Entry Count | Попытки входа | Попытки первых фрагов |
| `i22` | Entry Wins | Успешные входы | Удачные первые фраги |
| `i27` | Enemies Flashed | Ослепленные враги | Количество ослеплённых врагов |
| `i30` | Utility Damage | Урон утилитой | Урон от гранат/молотовов |
| `c2` | K/D Ratio | Соотношение К/Д | Убийства / Смерти |
| `c3` | K/R Ratio | Соотношение К/Р | Убийства / Раунды |
| `c4` | Headshot % | Процент хэдшотов | Процент убийств в голову |
| `c10` | ADR | Средний урон | Средний урон за раунд |

**Таблица полей команды:**

| Код поля | Название | Описание |
|----------|----------|----------|
| `i3` | First Half Score | Счет первой половины |
| `i4` | Second Half Score | Счет второй половины |
| `i5` | Team Name | Название команды |
| `i17` | Team Win | Результат команды (1=победа, 0=поражение) |
| `i19` | Overtime Score | Счет овертайма |
| `c5` | Final Score | Финальный счет команды |
| `c9` | Team Headshots | Средние хэдшоты команды |
| `premade` | Premade | Организованная команда? |

**Примеры использования:**

```javascript
// Получение информации о матче
async function getMatchDetails(matchId) {
    const response = await fetch(
        `https://www.faceit.com/api/stats/v3/matches/${matchId}`
    );
    const data = await response.json();
    return data[0]; // Возвращает единственный матч
}

// Получение лучшего игрока матча
function getTopFragger(matchData) {
    const allPlayers = matchData.teams.flatMap(team => team.players);
    return allPlayers.reduce((best, player) => 
        parseInt(player.i6) > parseInt(best.i6) ? player : best
    );
}

// Вычисление разницы в счете
function getScoreDifference(matchData) {
    const team1Score = parseInt(matchData.teams[0].c5);
    const team2Score = parseInt(matchData.teams[1].c5);
    return Math.abs(team1Score - team2Score);
}

// Проверка, был ли овертайм
function hadOvertime(matchData) {
    return matchData.teams.some(team => 
        parseInt(team.i19) > 0
    );
}

// Получение статистики конкретного игрока из матча
function getPlayerStats(matchData, playerId) {
    for (const team of matchData.teams) {
        const player = team.players.find(p => p.playerId === playerId);
        if (player) {
            return {
                team: team.i5,
                won: player.i10 === "1",
                kd: parseFloat(player.c2),
                adr: parseFloat(player.c10),
                kills: parseInt(player.i6),
                deaths: parseInt(player.i8)
            };
        }
    }
    return null;
}

// Сравнение производительности игроков в команде
function compareTeammates(matchData, teamIndex) {
    const team = matchData.teams[teamIndex];
    return team.players
        .map(player => ({
            nickname: player.nickname,
            kills: parseInt(player.i6),
            adr: parseFloat(player.c10),
            rating: parseFloat(player.c2) // K/D как базовый рейтинг
        }))
        .sort((a, b) => b.kills - a.kills);
}

// Получение средних показателей команды
function getTeamAverages(matchData, teamIndex) {
    const team = matchData.teams[teamIndex];
    const players = team.players;
    const count = players.length;
    
    return {
        avgKills: players.reduce((sum, p) => sum + parseInt(p.i6), 0) / count,
        avgDeaths: players.reduce((sum, p) => sum + parseInt(p.i8), 0) / count,
        avgADR: players.reduce((sum, p) => sum + parseFloat(p.c10), 0) / count,
        totalDamage: players.reduce((sum, p) => sum + parseInt(p.i20), 0)
    };
}
```

**Заметки:**
- API возвращает массив с одним элементом (даже для одного матча)
- Все числовые значения в полях `i*` возвращаются как строки
- Вычисляемые метрики `c*` возвращаются как строки с десятичными числами
- `version: 1` указывает на версию формата данных
- `_id` - это MongoDB ObjectId записи в базе данных FACEIT
- Поля `created_at`, `updated_at` и `date` содержат timestamp в миллисекундах
- `teamId` обычно совпадает с `playerId` капитана/создателя лобби
- Если `premade: true`, команда была сформирована заранее (не случайные игроки)
- `bestOf` определяет формат серии: "1" = Bo1, "2" = Bo2, "3" = Bo3, "5" = Bo5
- `competitionId` используется для группировки матчей в рамках одного турнира/лиги
- Для получения нескольких матчей используйте эндпоинт из запроса #4
- Match ID имеет формат: `{server_id}-{uuid}` (например: `1-a0cdcd1c-6e29-4dc0-aaa0-59b7c787d794`)

---

### 6. Получение текущих матчей игрока, сгруппированных по состоянию

**Описание:** Получение информации о матчах игрока, сгруппированных по их текущему состоянию (ONGOING, READY и т.д.).

**Метод:** `GET`

**URL:** `https://www.faceit.com/api/match/v1/matches/groupByState?userId={userId}`

**Параметры:**
- `userId` - уникальный ID пользователя FACEIT (например: `6623f6a5-7013-46d9-986b-57e36f4f6813`)

**Пример запроса:**
```
GET https://www.faceit.com/api/match/v1/matches/groupByState?userId=6623f6a5-7013-46d9-986b-57e36f4f6813
```

**Структура ответа:**

```json
{
    "code": "string",              // Код операции (например: "OPERATION-OK")
    "env": "string",               // Окружение (prod/dev)
    "message": "string",           // Сообщение о результате операции
    "payload": {
        "ONGOING": [{              // Массив матчей в статусе ONGOING
            "id": "string",        // Уникальный ID матча
            "game": "string",      // Игра (cs2, csgo, dota2 и т.д.)
            "region": "string",    // Регион (EU, NA и т.д.)
            "gameModeType": "string",  // Тип игрового режима (например: "2Factions")
            "gameModeLabel": {
                "en": "string"     // Название режима (например: "5v5")
            },
            "entity": {
                "type": "string",  // Тип сущности (matchmaking, tournament)
                "id": "string",    // ID сущности
                "name": "string"   // Название (например: "Europe 5v5 Queue")
            },
            "entityCustom": {
                "queueId": "string",           // ID очереди
                "parties": {                   // Информация о группах игроков
                    "{partyId}": ["playerId"]  // ID группы: массив ID игроков
                },
                "matcherMatchId": "string",    // ID матча в системе подбора
                "partyQueueDurations": {       // Время ожидания групп в секундах
                    "{partyId}": number
                },
                "effectiveRanking": number     // Эффективный рейтинг матча
            },
            "teams": {
                "faction1": {
                    "id": "string",            // ID команды (обычно ID лидера)
                    "avatar": "string",        // URL аватара команды
                    "name": "string",          // Название команды
                    "leader": "string",        // ID лидера команды
                    "roster": [{
                        "id": "string",        // ID игрока
                        "avatar": "string",    // URL аватара игрока
                        "nickname": "string"   // Никнейм игрока
                    }]
                },
                "faction2": {
                    // Аналогичная структура для второй команды
                }
            },
            "state": "string",     // Состояние матча (ONGOING, READY и т.д.)
            "status": "string",    // Статус матча (LIVE, PENDING и т.д.)
            "playing": boolean,    // Идет ли игра в данный момент
            "createdAt": "string"  // Дата создания матча (ISO 8601)
        }],
        "READY": [],               // Матчи в статусе READY
        "FINISHED": []             // Матчи в статусе FINISHED
    },
    "time": number,                // Timestamp ответа
    "version": "string"            // Версия API
}
```

**Пример ответа:**

<details>
<summary>Развернуть полный ответ</summary>

```json
{
    "code": "OPERATION-OK",
    "env": "prod",
    "message": "Operation performed correctly.",
    "payload": {
        "ONGOING": [
            {
                "id": "1-435da127-1dd0-43be-b572-4fd950037d85",
                "game": "cs2",
                "region": "EU",
                "gameModeType": "2Factions",
                "gameModeLabel": {
                    "en": "5v5"
                },
                "entity": {
                    "type": "matchmaking",
                    "id": "f4148ddd-bce8-41b8-9131-ee83afcdd6dd",
                    "name": "Europe 5v5 Queue"
                },
                "entityCustom": {
                    "queueId": "66140674f2200d1bec86ffd8",
                    "parties": {
                        "3dacdf78-53e9-4914-83a1-58ced116c82b": [
                            "7ff47fcf-7a71-4fd2-87ac-b19930e0d65b",
                            "ff1046ed-7d30-4b4b-9930-999db29db491"
                        ],
                        "43c43235-9914-40b3-ae8d-19155915bc5c": [
                            "441ccb0d-b9a3-4ad1-8f76-ecedbedb26f9"
                        ],
                        "b11e2f94-ba86-4334-983e-a6ecee8c3a2e": [
                            "6623f6a5-7013-46d9-986b-57e36f4f6813"
                        ],
                        "b1e73a73-c4cf-4414-b961-0ca717252372": [
                            "48551949-89be-473e-9a4c-e76340b58700",
                            "7a77ac28-1dc7-4d02-8689-57194de5628c",
                            "4fca2bb4-2d9c-4368-8ff7-49a5554c65b7"
                        ],
                        "d58fce1e-19a1-41a8-a84a-fce61219f054": [
                            "d58fce1e-19a1-41a8-a84a-fce61219f054"
                        ],
                        "f555c943-935d-4043-a527-cccd1de39100": [
                            "a2727cc9-70fa-4445-9081-21c434e51ad1"
                        ],
                        "fa86e708-9472-422d-844a-2c4dac0df8e5": [
                            "fa86e708-9472-422d-844a-2c4dac0df8e5"
                        ]
                    },
                    "matcherMatchId": "58e70717-6291-4cf6-9ab2-7b6583df7cd7",
                    "partyQueueDurations": {
                        "3dacdf78-53e9-4914-83a1-58ced116c82b": 24.359,
                        "43c43235-9914-40b3-ae8d-19155915bc5c": 273.157,
                        "b11e2f94-ba86-4334-983e-a6ecee8c3a2e": 331.051,
                        "b1e73a73-c4cf-4414-b961-0ca717252372": 136.278,
                        "d58fce1e-19a1-41a8-a84a-fce61219f054": 239.361,
                        "f555c943-935d-4043-a527-cccd1de39100": 93.513,
                        "fa86e708-9472-422d-844a-2c4dac0df8e5": 46.564
                    },
                    "effectiveRanking": 3539
                },
                "teams": {
                    "faction1": {
                        "id": "7ff47fcf-7a71-4fd2-87ac-b19930e0d65b",
                        "avatar": "https://distribution.faceit-cdn.net/images/dc706205-5a7c-4690-ace9-61e4daa17880.jpg",
                        "name": "team_jzx",
                        "leader": "7ff47fcf-7a71-4fd2-87ac-b19930e0d65b",
                        "roster": [
                            {
                                "id": "6623f6a5-7013-46d9-986b-57e36f4f6813",
                                "avatar": "https://distribution.faceit-cdn.net/images/6f491662-32fa-4222-89e6-0efbd549f953.jpeg",
                                "nickname": "Jerry256"
                            },
                            {
                                "id": "a2727cc9-70fa-4445-9081-21c434e51ad1",
                                "avatar": "https://distribution.faceit-cdn.net/images/85e491b9-b421-4684-a5c4-2b7839d7b67d.jpg",
                                "nickname": "brknthings"
                            },
                            {
                                "id": "d58fce1e-19a1-41a8-a84a-fce61219f054",
                                "avatar": "https://distribution.faceit-cdn.net/images/1f3f8034-d787-433e-b636-a364e37b89d0.jpg",
                                "nickname": "renshi-"
                            },
                            {
                                "id": "7ff47fcf-7a71-4fd2-87ac-b19930e0d65b",
                                "avatar": "https://distribution.faceit-cdn.net/images/dc706205-5a7c-4690-ace9-61e4daa17880.jpg",
                                "nickname": "jzx"
                            },
                            {
                                "id": "ff1046ed-7d30-4b4b-9930-999db29db491",
                                "avatar": "https://distribution.faceit-cdn.net/images/ae4f1c24-17c3-4b8e-86f8-f7e299289c1f.jpg",
                                "nickname": "internetuser"
                            }
                        ]
                    },
                    "faction2": {
                        "id": "48551949-89be-473e-9a4c-e76340b58700",
                        "avatar": "https://assets.faceit-cdn.net/avatars/48551949-89be-473e-9a4c-e76340b58700_1632618869713.jpg",
                        "name": "team_Remill",
                        "leader": "48551949-89be-473e-9a4c-e76340b58700",
                        "roster": [
                            {
                                "id": "48551949-89be-473e-9a4c-e76340b58700",
                                "avatar": "https://assets.faceit-cdn.net/avatars/48551949-89be-473e-9a4c-e76340b58700_1632618869713.jpg",
                                "nickname": "Remill"
                            },
                            {
                                "id": "7a77ac28-1dc7-4d02-8689-57194de5628c",
                                "avatar": "https://distribution.faceit-cdn.net/images/63859b38-0f9f-4fac-be3a-7116647edc45.jpg",
                                "nickname": "lUMiERx"
                            },
                            {
                                "id": "4fca2bb4-2d9c-4368-8ff7-49a5554c65b7",
                                "avatar": "https://distribution.faceit-cdn.net/images/c27622d8-9339-469a-aa58-3c488f96c74c.jpeg",
                                "nickname": "-Proper"
                            },
                            {
                                "id": "fa86e708-9472-422d-844a-2c4dac0df8e5",
                                "avatar": "https://distribution.faceit-cdn.net/images/d936de9a-14ba-4d47-850c-5486ab9cac8a.jpg",
                                "nickname": "fly2k-"
                            },
                            {
                                "id": "441ccb0d-b9a3-4ad1-8f76-ecedbedb26f9",
                                "avatar": "https://distribution.faceit-cdn.net/images/4fa4b299-6a10-4fb7-ba78-e0c93108e8e3.jpg",
                                "nickname": "trafaks-_-"
                            }
                        ]
                    }
                },
                "state": "ONGOING",
                "status": "LIVE",
                "playing": true,
                "createdAt": "2025-10-02T11:31:45Z"
            }
        ]
    },
    "time": 1759405661486,
    "version": "1.263.2"
}
```

</details>

**Заметки:**
- Этот эндпоинт возвращает матчи, сгруппированные по их текущему состоянию
- Основные состояния: `ONGOING` (игра идет), `READY` (ожидание начала), `FINISHED` (завершен)
- Используйте `ONGOING` для отображения текущего активного матча
- В `entityCustom.parties` содержится информация о группах игроков (партиях)
- `effectiveRanking` показывает средний рейтинг матча
- `partyQueueDurations` показывает, сколько каждая группа ждала в очереди (в секундах)
- `roster` содержит основную информацию об игроках команды (ID, аватар, никнейм)
- Для получения детальной статистики игроков используйте эндпоинт #2
- `createdAt` использует формат ISO 8601 (в отличие от timestamp в других эндпоинтах)
- `status: "LIVE"` означает, что матч активно идет в данный момент

---

## Примеры использования

<!-- Примеры кода и использования API -->

---

## Структура данных

<!-- Описание структур данных, используемых в API -->

---

## Заметки и комментарии

<!-- Дополнительные заметки по работе с API -->
