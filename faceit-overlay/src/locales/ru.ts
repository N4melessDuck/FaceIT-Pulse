export default {
  landing: {
    hero: {
      title: 'FaceIT Pulse',
      subtitle: 'Профессиональная статистика FACEIT прямо на вашем экране',
      features: {
        noRegistration: 'Без регистрации',
        instantLaunch: 'Мгновенный запуск',
        simpleSetup: 'Введите ник — готово'
      },
      cta: 'Начать использование'
    },
    features: {
      title: 'Возможности',
      liveMatch: {
        title: 'Статистика в реальном времени',
        description: 'Следите за текущим матчем: ELO команд, статистика игроков, карта и режим игры. Вся информация обновляется автоматически.',
        list: [
          'Информация об активном матче',
          'Сравнение ELO команд',
          'Статистика всех игроков в лобби'
        ]
      },
      stats: {
        title: 'Детальная статистика',
        description: 'Полная картина вашей игры: K/D, винрейт, средние показатели, тренды производительности и многое другое.',
        list: [
          'ELO и изменение рейтинга',
          'K/D, винрейт, серии побед',
          'Entry fragging и мультикиллы',
          'Статистика по картам'
        ]
      },
      history: {
        title: 'История матчей',
        description: 'Просматривайте последние игры с подробной статистикой: K/D/A, HS%, изменение ELO и результат каждого матча.',
        list: [
          'Последние 20 матчей',
          'Детальная статистика каждой игры',
          'Визуализация трендов'
        ]
      },
      customization: {
        title: 'Гибкая настройка',
        description: 'Настройте оверлей под себя: выберите нужные карточки статистики, измените размер и расположение элементов.',
        list: [
          'Выбор отображаемых карточек',
          'Настройка размера элементов',
          'Удобная панель управления'
        ]
      }
    },
    howItWorks: {
      title: 'Как это работает',
      steps: [
        {
          title: 'Откройте настройки',
          description: 'Нажмите "Начать использование"'
        },
        {
          title: 'Введите никнейм',
          description: 'Укажите ваш ник на FACEIT'
        },
        {
          title: 'Откройте оверлей',
          description: 'Выберите нужные карточки и наслаждайтесь'
        }
      ]
    },
    contact: {
      title: 'Сообщить об ошибке или предложить идею',
      description: 'Есть замечания или предложения? Можете связаться со мной.',
      telegram: 'Telegram',
      twitter: 'Twitter'
    },
    footerCta: {
      title: 'Готовы начать?',
      description: 'Никаких регистраций и сложных настроек',
      button: 'Перейти к настройкам'
    },
    screenshots: {
      liveMatch: 'Скриншот: Live Match',
      stats: 'Скриншот: Stats Cards',
      history: 'Скриншот: Recent Matches',
      settings: 'Скриншот: Settings'
    }
  },
  settings: {
    backButton: 'На главную',
    title: 'FACEIT Overlay Generator',
    subtitle: 'Настройте карточки статистики для OBS',
    nickname: {
      label: 'Никнейм FACEIT',
      placeholder: 'Введите ваш никнейм'
    },
    size: {
      label: 'Размер оверлея',
      presets: {
        compact: 'Компактный',
        medium: 'Средний',
        full: 'Полный'
      }
    },
    cards: {
      label: 'Карточки статистики',
      selectAll: 'Выбрать всё',
      deselectAll: 'Снять всё',
      noCards: 'Нет доступных карточек',
      metadata: {
        elo: {
          title: 'ELO и Уровень',
          description: 'Текущий рейтинг и уровень FACEIT'
        },
        winrate: {
          title: 'Винрейт',
          description: 'Процент побед'
        },
        kd: {
          title: 'K/D Ratio',
          description: 'Соотношение убийств к смертям'
        },
        recentMatches: {
          title: 'Последние матчи',
          description: 'Детальный список последних 10 матчей'
        },
        recentStreak: {
          title: 'Недавние результаты',
          description: 'Последние 7 матчей (W/L)'
        },
        winStreak: {
          title: 'Серия',
          description: 'Текущая серия побед/поражений'
        },
        performance: {
          title: 'Перформанс',
          description: 'ADR, Headshots %, K/R'
        },
        maps: {
          title: 'Карты',
          description: 'Статистика по картам'
        },
        multiKill: {
          title: 'Мультикиллы',
          description: '2K, 3K, 4K, 5K статистика'
        },
        mapPerformance: {
          title: 'Топ Карты',
          description: 'Лучшие карты по win rate'
        },
        performanceTrend: {
          title: 'Тренд Формы',
          description: 'График K/D и ADR'
        },
        entryFragging: {
          title: 'Entry Fragging',
          description: 'Статистика первых фрагов'
        },
        mvpAssist: {
          title: 'MVP & Assists',
          description: 'MVP раунды и ассисты'
        },
        sessionStats: {
          title: 'Сессия',
          description: 'Статистика за последние матчи'
        }
      }
    },
    rotation: {
      label: 'Ротация карточек',
      enable: 'Включить автоматическую ротацию',
      interval: 'Интервал смены (секунды)',
      animation: 'Анимация перехода',
      animations: {
        fade: 'Плавное затухание',
        slide: 'Сдвиг',
        none: 'Без анимации'
      }
    },
    animations: {
      label: 'Анимации',
      fadeIn: 'Плавное появление',
      slideIn: 'Появление со сдвигом'
    },
    opacity: {
      label: 'Прозрачность оверлея',
      levels: {
        opaque: 'Непрозрачный',
        almostOpaque: 'Почти непрозрачный',
        semiTransparent: 'Полупрозрачный',
        transparent: 'Прозрачный',
        fullyTransparent: 'полностью прозрачный',
        opaqueShort: 'непрозрачный'
      }
    },
    actions: {
      save: 'Сохранить настройки',
      reset: 'Сбросить',
      confirmReset: 'Сбросить все настройки?',
      saved: '✅ Настройки сохранены!',
      copyError: 'Не удалось скопировать ссылку'
    },
    liveMatch: {
      updateInterval: 'Частота обновления',
      opacity: 'Прозрачность',
      showDuration: 'Длительность показа',
      hideDuration: 'Длительность скрытия',
      seconds: 'сек',
      visibilityCycle: 'Цикл видимости',
      showDescription: 'Как долго виджет виден',
      hideDescription: 'Как долго виджет скрыт',
      intervals: {
        '10s': '10 секунд',
        '30s': '30 секунд',
        '1m': '1 минута'
      },
      info: {
        title: 'Информация',
        text: 'Live Match виджет показывается <strong>только во время матча</strong>. Добавьте его в OBS как отдельный Browser Source.'
      },
      obsSettings: {
        title: '📺 Рекомендуемые настройки OBS:',
        width: 'Ширина:',
        height: 'Высота:',
        fps: 'FPS:',
        fpsValue: '30 (достаточно)',
        fullscreen: 'Рекомендуется:',
        fullscreenValue: 'поставить на весь экран',
        adaptive: 'Виджет адаптируется под размер окна'
      }
    },
    preview: {
      title: 'Предпросмотр',
      openOverlay: 'Открыть оверлей',
      openLiveMatch: 'Live Match',
      copyUrl: 'Копировать URL',
      copied: 'Скопировано!',
      urlHint: 'Используйте этот URL как Browser Source в OBS'
    }
  },
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    retry: 'Повторить'
  }
}
