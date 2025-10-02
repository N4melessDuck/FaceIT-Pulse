export default {
  landing: {
    hero: {
      title: 'FACEIT Stats Overlay',
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
      label: 'Размер оверлея'
    },
    cards: {
      label: 'Выбор карточек',
      selectAll: 'Выбрать всё',
      deselectAll: 'Снять всё'
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
