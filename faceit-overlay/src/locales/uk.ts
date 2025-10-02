export default {
  landing: {
    hero: {
      title: 'FACEIT Stats Overlay',
      subtitle: 'Професійна статистика FACEIT прямо на вашому екрані',
      features: {
        noRegistration: 'Без реєстрації',
        instantLaunch: 'Миттєвий запуск',
        simpleSetup: 'Введіть нік — готово'
      },
      cta: 'Почати використання'
    },
    features: {
      title: 'Можливості',
      liveMatch: {
        title: 'Статистика в реальному часі',
        description: 'Стежте за поточним матчем: ELO команд, статистика гравців, карта та режим гри. Вся інформація оновлюється автоматично.',
        list: [
          'Інформація про активний матч',
          'Порівняння ELO команд',
          'Статистика всіх гравців у лобі'
        ]
      },
      stats: {
        title: 'Детальна статистика',
        description: 'Повна картина вашої гри: K/D, винрейт, середні показники, тренди продуктивності та багато іншого.',
        list: [
          'ELO та зміна рейтингу',
          'K/D, винрейт, серії перемог',
          'Entry fragging та мультикіли',
          'Статистика по картах'
        ]
      },
      history: {
        title: 'Історія матчів',
        description: 'Переглядайте останні ігри з детальною статистикою: K/D/A, HS%, зміна ELO та результат кожного матчу.',
        list: [
          'Останні 20 матчів',
          'Детальна статистика кожної гри',
          'Візуалізація трендів'
        ]
      },
      customization: {
        title: 'Гнучке налаштування',
        description: 'Налаштуйте оверлей під себе: виберіть потрібні картки статистики, змініть розмір та розташування елементів.',
        list: [
          'Вибір карток що відображаються',
          'Налаштування розміру елементів',
          'Зручна панель керування'
        ]
      }
    },
    howItWorks: {
      title: 'Як це працює',
      steps: [
        {
          title: 'Відкрийте налаштування',
          description: 'Натисніть "Почати використання"'
        },
        {
          title: 'Введіть нікнейм',
          description: 'Вкажіть ваш нік на FACEIT'
        },
        {
          title: 'Відкрийте оверлей',
          description: 'Виберіть потрібні картки та насолоджуйтесь'
        }
      ]
    },
    footerCta: {
      title: 'Готові почати?',
      description: 'Ніяких реєстрацій та складних налаштувань',
      button: 'Перейти до налаштувань'
    },
    screenshots: {
      liveMatch: 'Скріншот: Live Match',
      stats: 'Скріншот: Stats Cards',
      history: 'Скріншот: Recent Matches',
      settings: 'Скріншот: Settings'
    }
  },
  settings: {
    backButton: 'На головну',
    title: 'FACEIT Overlay Generator',
    subtitle: 'Налаштуйте картки статистики для OBS',
    nickname: {
      label: 'Нікнейм FACEIT',
      placeholder: 'Введіть ваш нікнейм'
    },
    size: {
      label: 'Розмір оверлею',
      presets: {
        compact: 'Компактний',
        medium: 'Середній',
        full: 'Повний'
      }
    },
    cards: {
      label: 'Картки статистики',
      selectAll: 'Вибрати все',
      deselectAll: 'Зняти все',
      noCards: 'Немає доступних карток',
      metadata: {
        elo: {
          title: 'ELO та Рівень',
          description: 'Поточний рейтинг та рівень FACEIT'
        },
        winrate: {
          title: 'Винрейт',
          description: 'Відсоток перемог'
        },
        kd: {
          title: 'K/D Ratio',
          description: 'Співвідношення вбивств до смертей'
        },
        recentMatches: {
          title: 'Останні матчі',
          description: 'Детальний список останніх 10 матчів'
        },
        recentStreak: {
          title: 'Недавні результати',
          description: 'Останні 7 матчів (W/L)'
        },
        winStreak: {
          title: 'Серія',
          description: 'Поточна серія перемог/поразок'
        },
        performance: {
          title: 'Перформанс',
          description: 'ADR, Headshots %, K/R'
        },
        maps: {
          title: 'Карти',
          description: 'Статистика по картах'
        },
        multiKill: {
          title: 'Мультикіли',
          description: '2K, 3K, 4K, 5K статистика'
        },
        mapPerformance: {
          title: 'Топ Карти',
          description: 'Кращі карти за win rate'
        },
        performanceTrend: {
          title: 'Тренд Форми',
          description: 'Графік K/D та ADR'
        },
        entryFragging: {
          title: 'Entry Fragging',
          description: 'Статистика перших фрагів'
        },
        mvpAssist: {
          title: 'MVP & Assists',
          description: 'MVP раунди та асисти'
        },
        sessionStats: {
          title: 'Сесія',
          description: 'Статистика за останні матчі'
        }
      }
    },
    rotation: {
      label: 'Ротація карток',
      enable: 'Увімкнути автоматичну ротацію',
      interval: 'Інтервал зміни (секунди)',
      animation: 'Анімація переходу',
      animations: {
        fade: 'Плавне згасання',
        slide: 'Зсув',
        none: 'Без анімації'
      }
    },
    animations: {
      label: 'Анімації',
      fadeIn: 'Плавна поява',
      slideIn: 'Поява зі зсувом'
    },
    opacity: {
      label: 'Прозорість оверлею',
      levels: {
        opaque: 'Непрозорий',
        almostOpaque: 'Майже непрозорий',
        semiTransparent: 'Напівпрозорий',
        transparent: 'Прозорий',
        fullyTransparent: 'повністю прозорий',
        opaqueShort: 'непрозорий'
      }
    },
    actions: {
      save: 'Зберегти налаштування',
      reset: 'Скинути',
      confirmReset: 'Скинути всі налаштування?',
      saved: '✅ Налаштування збережено!',
      copyError: 'Не вдалося скопіювати посилання'
    },
    liveMatch: {
      updateInterval: 'Частота оновлення',
      opacity: 'Прозорість',
      showDuration: 'Тривалість показу',
      hideDuration: 'Тривалість приховування',
      seconds: 'сек',
      visibilityCycle: 'Цикл видимості',
      showDescription: 'Як довго віджет видимий',
      hideDescription: 'Як довго віджет прихований',
      intervals: {
        '10s': '10 секунд',
        '30s': '30 секунд',
        '1m': '1 хвилина'
      },
      info: {
        title: 'Інформація',
        text: 'Live Match віджет показується <strong>тільки під час матчу</strong>. Додайте його в OBS як окремий Browser Source.'
      },
      obsSettings: {
        title: '📺 Рекомендовані налаштування OBS:',
        width: 'Ширина:',
        height: 'Висота:',
        fps: 'FPS:',
        fpsValue: '30 (достатньо)',
        fullscreen: 'Рекомендується:',
        fullscreenValue: 'поставити на весь екран',
        adaptive: 'Віджет адаптується під розмір вікна'
      }
    },
    preview: {
      title: 'Попередній перегляд',
      openOverlay: 'Відкрити оверлей',
      openLiveMatch: 'Live Match',
      copyUrl: 'Копіювати URL',
      copied: 'Скопійовано!',
      urlHint: 'Використовуйте цей URL як Browser Source в OBS'
    }
  },
  common: {
    loading: 'Завантаження...',
    error: 'Помилка',
    retry: 'Повторити'
  }
}
