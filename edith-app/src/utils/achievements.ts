// Achievements System
import { getCookie, setCookie } from './cookies';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
  secret?: boolean;
}

export const allAchievements: Achievement[] = [
  {
    id: 'first_chat',
    title: 'Hello, E.D.I.T.H!',
    description: 'Send your first message to E.D.I.T.H',
    icon: '👋',
    unlocked: false
  },
  {
    id: 'voice_user',
    title: 'Voice Activated',
    description: 'Use voice input for the first time',
    icon: '🎤',
    unlocked: false
  },
  {
    id: 'personality_switch',
    title: 'Identity Crisis',
    description: 'Try all 4 personality modes',
    icon: '🎭',
    unlocked: false
  },
  {
    id: 'weather_check',
    title: 'Weather Watcher',
    description: 'Check the weather',
    icon: '🌤️',
    unlocked: false
  },
  {
    id: 'web_searcher',
    title: 'Web Crawler',
    description: 'Perform your first web search',
    icon: '🔍',
    unlocked: false
  },
  {
    id: 'news_reader',
    title: 'Daily Bugle',
    description: 'Read the news',
    icon: '📰',
    unlocked: false
  },
  {
    id: 'reminder_master',
    title: 'Never Forget',
    description: 'Create 5 reminders',
    icon: '📅',
    unlocked: false
  },
  {
    id: 'trivia_novice',
    title: 'Trivia Novice',
    description: 'Answer 5 trivia questions correctly',
    icon: '🎓',
    unlocked: false
  },
  {
    id: 'trivia_expert',
    title: 'MCU Expert',
    description: 'Answer 20 trivia questions correctly',
    icon: '🏆',
    unlocked: false
  },
  {
    id: 'easter_egg_hunter',
    title: 'Easter Egg Hunter',
    description: 'Find 3 hidden easter eggs',
    icon: '🥚',
    unlocked: false,
    secret: true
  },
  {
    id: 'chatty',
    title: 'Chatty Spider',
    description: 'Send 100 messages',
    icon: '💬',
    unlocked: false
  },
  {
    id: 'dedicated',
    title: 'Dedicated Hero',
    description: 'Use E.D.I.T.H for 7 days',
    icon: '⭐',
    unlocked: false
  },
  {
    id: 'power_user',
    title: 'Power User',
    description: 'Use all quick commands',
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'with_great_power',
    title: 'With Great Power...',
    description: 'Discover Uncle Ben\'s wisdom',
    icon: '🕷️',
    unlocked: false,
    secret: true
  },
  {
    id: 'i_am_iron_man',
    title: 'I Am Iron Man',
    description: 'Channel your inner Tony Stark',
    icon: '🦾',
    unlocked: false,
    secret: true
  },
  {
    id: 'love_3000',
    title: 'Love You 3000',
    description: 'Find the heartwarming easter egg',
    icon: '❤️',
    unlocked: false,
    secret: true
  }
];

export class AchievementManager {
  private static STORAGE_KEY = 'EDITH_ACHIEVEMENTS';
  private static STATS_KEY = 'ACHIEVEMENT_STATS';

  static getAchievements(): Achievement[] {
    const data = getCookie(this.STORAGE_KEY);
    if (!data) return allAchievements;
    
    const saved = JSON.parse(data);
    return allAchievements.map(achievement => {
      const savedAch = saved.find((a: Achievement) => a.id === achievement.id);
      return savedAch || achievement;
    });
  }

  static saveAchievements(achievements: Achievement[]): void {
    setCookie(this.STORAGE_KEY, JSON.stringify(achievements), 365);
  }

  static getStats(): any {
    const data = getCookie(this.STATS_KEY);
    return data ? JSON.parse(data) : {
      triviaCorrect: 0,
      easterEggsFound: 0,
      personalitiesUsed: [],
      commandsUsed: []
    };
  }

  static saveStats(stats: any): void {
    setCookie(this.STATS_KEY, JSON.stringify(stats), 365);
  }

  static unlockAchievement(id: string): Achievement | null {
    const achievements = this.getAchievements();
    const achievement = achievements.find(a => a.id === id);
    
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = Date.now();
      this.saveAchievements(achievements);
      return achievement;
    }
    
    return null;
  }

  static checkAndUnlock(id: string): Achievement | null {
    return this.unlockAchievement(id);
  }

  static incrementStat(stat: string, value?: any): void {
    const stats = this.getStats();
    
    if (stat === 'triviaCorrect') {
      stats.triviaCorrect = (stats.triviaCorrect || 0) + 1;
      
      // Check trivia achievements
      if (stats.triviaCorrect >= 5) {
        this.unlockAchievement('trivia_novice');
      }
      if (stats.triviaCorrect >= 20) {
        this.unlockAchievement('trivia_expert');
      }
    } else if (stat === 'easterEggsFound') {
      stats.easterEggsFound = (stats.easterEggsFound || 0) + 1;
      
      if (stats.easterEggsFound >= 3) {
        this.unlockAchievement('easter_egg_hunter');
      }
    } else if (stat === 'personalityUsed') {
      if (!stats.personalitiesUsed) stats.personalitiesUsed = [];
      if (!stats.personalitiesUsed.includes(value)) {
        stats.personalitiesUsed.push(value);
      }
      
      if (stats.personalitiesUsed.length >= 4) {
        this.unlockAchievement('personality_switch');
      }
    } else if (stat === 'commandUsed') {
      if (!stats.commandsUsed) stats.commandsUsed = [];
      if (!stats.commandsUsed.includes(value)) {
        stats.commandsUsed.push(value);
      }
      
      const quickCommands = ['/time', '/date', '/weather', '/search', '/news', '/remind', '/joke', '/help'];
      const usedQuickCommands = stats.commandsUsed.filter((cmd: string) => quickCommands.includes(cmd));
      
      if (usedQuickCommands.length >= quickCommands.length) {
        this.unlockAchievement('power_user');
      }
    }
    
    this.saveStats(stats);
  }

  static getUnlockedCount(): number {
    return this.getAchievements().filter(a => a.unlocked).length;
  }

  static getTotalCount(): number {
    return allAchievements.length;
  }

  static getProgress(): number {
    return Math.round((this.getUnlockedCount() / this.getTotalCount()) * 100);
  }
}
