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
      label: 'Overlay Size',
      presets: {
        compact: 'Compact',
        medium: 'Medium',
        full: 'Full'
      }
    },
    cards: {
      label: 'Stat Cards',
      selectAll: 'Select All',
      deselectAll: 'Deselect All',
      noCards: 'No cards available',
      metadata: {
        elo: {
          title: 'ELO & Level',
          description: 'Current rating and FACEIT level'
        },
        winrate: {
          title: 'Win Rate',
          description: 'Win percentage'
        },
        kd: {
          title: 'K/D Ratio',
          description: 'Kill to death ratio'
        },
        recentMatches: {
          title: 'Recent Matches',
          description: 'Detailed list of last 10 matches'
        },
        recentStreak: {
          title: 'Recent Results',
          description: 'Last 7 matches (W/L)'
        },
        winStreak: {
          title: 'Streak',
          description: 'Current win/loss streak'
        },
        performance: {
          title: 'Performance',
          description: 'ADR, Headshots %, K/R'
        },
        maps: {
          title: 'Maps',
          description: 'Map statistics'
        },
        multiKill: {
          title: 'Multikills',
          description: '2K, 3K, 4K, 5K statistics'
        },
        mapPerformance: {
          title: 'Top Maps',
          description: 'Best maps by win rate'
        },
        performanceTrend: {
          title: 'Form Trend',
          description: 'K/D and ADR chart'
        },
        entryFragging: {
          title: 'Entry Fragging',
          description: 'First frag statistics'
        },
        mvpAssist: {
          title: 'MVP & Assists',
          description: 'MVP rounds and assists'
        },
        sessionStats: {
          title: 'Session',
          description: 'Recent matches statistics'
        }
      }
    },
    rotation: {
      label: 'Card Rotation',
      enable: 'Enable automatic rotation',
      interval: 'Change interval (seconds)',
      animation: 'Transition animation',
      animations: {
        fade: 'Smooth fade',
        slide: 'Slide',
        none: 'No animation'
      }
    },
    animations: {
      label: 'Animations',
      fadeIn: 'Fade in',
      slideIn: 'Slide in'
    },
    opacity: {
      label: 'Overlay Opacity',
      levels: {
        opaque: 'Opaque',
        almostOpaque: 'Almost opaque',
        semiTransparent: 'Semi-transparent',
        transparent: 'Transparent',
        fullyTransparent: 'fully transparent',
        opaqueShort: 'opaque'
      }
    },
    actions: {
      save: 'Save Settings',
      reset: 'Reset',
      confirmReset: 'Reset all settings?',
      saved: '✅ Settings saved!',
      copyError: 'Failed to copy link'
    },
    liveMatch: {
      updateInterval: 'Update Interval',
      opacity: 'Opacity',
      showDuration: 'Show Duration',
      hideDuration: 'Hide Duration',
      seconds: 'sec',
      visibilityCycle: 'Visibility Cycle',
      showDescription: 'How long the widget is visible',
      hideDescription: 'How long the widget is hidden',
      intervals: {
        '10s': '10 seconds',
        '30s': '30 seconds',
        '1m': '1 minute'
      },
      info: {
        title: 'Information',
        text: 'Live Match widget is shown <strong>only during a match</strong>. Add it to OBS as a separate Browser Source.'
      },
      obsSettings: {
        title: '📺 Recommended OBS settings:',
        width: 'Width:',
        height: 'Height:',
        fps: 'FPS:',
        fpsValue: '30 (enough)',
        fullscreen: 'Recommended:',
        fullscreenValue: 'set to fullscreen',
        adaptive: 'Widget adapts to window size'
      }
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
