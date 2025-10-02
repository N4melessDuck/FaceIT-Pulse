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
      label: 'Розмір оверлею'
    },
    cards: {
      label: 'Вибір карток',
      selectAll: 'Вибрати все',
      deselectAll: 'Зняти все'
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
