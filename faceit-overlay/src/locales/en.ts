export default {
  landing: {
    hero: {
      title: 'FACEIT Stats Overlay',
      subtitle: 'Professional FACEIT statistics right on your screen',
      features: {
        noRegistration: 'No registration',
        instantLaunch: 'Instant launch',
        simpleSetup: 'Enter nickname — done'
      },
      cta: 'Get Started'
    },
    features: {
      title: 'Features',
      liveMatch: {
        title: 'Real-time Statistics',
        description: 'Track current match: team ELO, player stats, map and game mode. All information updates automatically.',
        list: [
          'Active match information',
          'Team ELO comparison',
          'Stats of all players in lobby'
        ]
      },
      stats: {
        title: 'Detailed Statistics',
        description: 'Complete picture of your game: K/D, win rate, average stats, performance trends and much more.',
        list: [
          'ELO and rating changes',
          'K/D, win rate, win streaks',
          'Entry fragging and multikills',
          'Map statistics'
        ]
      },
      history: {
        title: 'Match History',
        description: 'View recent games with detailed statistics: K/D/A, HS%, ELO changes and result of each match.',
        list: [
          'Last 20 matches',
          'Detailed stats of each game',
          'Trend visualization'
        ]
      },
      customization: {
        title: 'Flexible Customization',
        description: 'Customize the overlay for yourself: select desired stat cards, change size and position of elements.',
        list: [
          'Choose displayed cards',
          'Adjust element sizes',
          'Convenient control panel'
        ]
      }
    },
    howItWorks: {
      title: 'How It Works',
      steps: [
        {
          title: 'Open Settings',
          description: 'Click "Get Started"'
        },
        {
          title: 'Enter Nickname',
          description: 'Specify your FACEIT nickname'
        },
        {
          title: 'Open Overlay',
          description: 'Select desired cards and enjoy'
        }
      ]
    },
    footerCta: {
      title: 'Ready to Start?',
      description: 'No registration or complex setup required',
      button: 'Go to Settings'
    },
    screenshots: {
      liveMatch: 'Screenshot: Live Match',
      stats: 'Screenshot: Stats Cards',
      history: 'Screenshot: Recent Matches',
      settings: 'Screenshot: Settings'
    }
  },
  settings: {
    backButton: 'Back to Home',
    title: 'FACEIT Overlay Generator',
    subtitle: 'Configure stat cards for OBS',
    nickname: {
      label: 'FACEIT Nickname',
      placeholder: 'Enter your nickname'
    },
    size: {
      label: 'Overlay Size'
    },
    cards: {
      label: 'Card Selection',
      selectAll: 'Select All',
      deselectAll: 'Deselect All'
    },
    preview: {
      title: 'Preview',
      openOverlay: 'Open Overlay',
      openLiveMatch: 'Live Match',
      copyUrl: 'Copy URL',
      copied: 'Copied!',
      urlHint: 'Use this URL as Browser Source in OBS'
    }
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry'
  }
}
