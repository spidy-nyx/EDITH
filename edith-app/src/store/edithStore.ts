import { create } from 'zustand';
import OpenAI from 'openai';
import { getCookie, setCookie } from '../utils/cookies';
import { soundEffects } from '../utils/soundEffects';
import { getPersonalityPrompt } from '../utils/personalities';
import { searchWeb, summarizeSearchResults } from '../utils/webSearch';
import { getWeather, formatWeatherResponse } from '../utils/weather';
import { getNews, summarizeNews } from '../utils/news';
import { ReminderManager, parseReminderCommand } from '../utils/reminders';
import { checkForEasterEgg } from '../utils/mcuData';
import { AchievementManager } from '../utils/achievements';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

type PersonalityMode = 'tony' | 'peter' | 'professional' | 'fun';

interface EdithState {
  status: 'READY' | 'LISTENING' | 'PROCESSING' | 'SPEAKING';
  lastResponse: string;
  newsItems: string[];
  conversationHistory: Array<{ role: string; content: string }>;
  chatHistory: ChatMessage[];
  openai: OpenAI | null;
  selectedVoice: string | null;
  theme: 'spiderman' | 'ironman' | 'venom';
  volume: number;
  isMuted: boolean;
  personality: PersonalityMode;
  stats: {
    totalConversations: number;
    totalMessages: number;
    startDate: number;
  };
  
  initializeAI: () => void;
  processCommand: (command: string) => Promise<void>;
  updateStatus: (status: EdithState['status']) => void;
  addNewsItem: (item: string) => void;
  setVoice: (voiceName: string) => void;
  addChatMessage: (role: 'user' | 'assistant', content: string) => void;
  clearChatHistory: () => void;
  setTheme: (theme: 'spiderman' | 'ironman' | 'venom') => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPersonality: (personality: PersonalityMode) => void;
  incrementStats: () => void;
}

export const useEdithStore = create<EdithState>((set, get) => ({
  status: 'READY',
  lastResponse: `Hello ${getCookie('USER_NAME') || 'SPIDERMAN'}! E.D.I.T.H systems online. How can I help?`,
  newsItems: [
    'SYSTEMS ONLINE',
    'VOICE RECOGNITION ACTIVE',
    'AI BRAIN CONNECTED',
    'READY FOR COMMANDS'
  ],
  conversationHistory: [],
  chatHistory: JSON.parse(getCookie('CHAT_HISTORY') || '[]'),
  selectedVoice: getCookie('SELECTED_VOICE') || null,
  theme: (getCookie('THEME') as 'spiderman' | 'ironman' | 'venom') || 'spiderman',
  volume: parseFloat(getCookie('VOLUME') || '1'),
  isMuted: getCookie('IS_MUTED') === 'true',
  personality: (getCookie('PERSONALITY') as PersonalityMode) || 'tony',
  stats: JSON.parse(getCookie('STATS') || '{"totalConversations":0,"totalMessages":0,"startDate":' + Date.now() + '}'),
  openai: null,

  initializeAI: () => {
    // Check cookies first, then env variables
    const storedGeminiKey = getCookie('GEMINI_API_KEY');
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const geminiKey = storedGeminiKey || import.meta.env.VITE_GEMINI_API_KEY;
    
    if (apiKey) {
      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true // Only for Electron app
      });
      set({ openai });
    } else if (geminiKey) {
      // Using Gemini (free!)
      console.log('Using Google Gemini (Free)');
    }
  },

  processCommand: async (command: string) => {
    const { openai, conversationHistory, personality } = get();
    
    // Check for easter eggs first
    const easterEgg = checkForEasterEgg(command);
    if (easterEgg) {
      soundEffects.success();
      set({ status: 'SPEAKING', lastResponse: easterEgg });
      get().addNewsItem(`E.D.I.T.H: ${easterEgg}`);
      get().addChatMessage('assistant', easterEgg);
      speak(easterEgg);
      
      // Track easter egg achievements
      AchievementManager.incrementStat('easterEggsFound');
      if (command.toLowerCase().includes('with great power')) {
        AchievementManager.unlockAchievement('with_great_power');
      } else if (command.toLowerCase().includes('i am iron man')) {
        AchievementManager.unlockAchievement('i_am_iron_man');
      } else if (command.toLowerCase().includes('i love you 3000')) {
        AchievementManager.unlockAchievement('love_3000');
      }
      
      setTimeout(() => set({ status: 'READY' }), 3000);
      return;
    }
    
    // Handle quick commands
    if (command.startsWith('/')) {
      handleQuickCommand(command);
      return;
    }
    
    // First chat achievement
    AchievementManager.checkAndUnlock('first_chat');
    
    soundEffects.processing();
    set({ status: 'PROCESSING' });
    get().addNewsItem(`User: ${command}`);
    get().addChatMessage('user', command);
    get().incrementStats();

    try {
      // Check cookies first, then env
      const storedGroqKey = getCookie('GROQ_API_KEY');
      const storedGeminiKey = getCookie('GEMINI_API_KEY');
      const groqKey = storedGroqKey || import.meta.env.VITE_GROQ_API_KEY;
      const geminiKey = storedGeminiKey || import.meta.env.VITE_GEMINI_API_KEY;
      
      // Try Groq first (FREE and FAST!)
      if (groqKey) {
        console.log('Using Groq AI (Free & Fast)...');
        
        try {
          const groqResponse = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${groqKey}`
              },
              body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [{
                  role: 'system',
                  content: `${getPersonalityPrompt(personality, getCookie('USER_NAME') || 'SPIDERMAN')} Keep responses short (2-3 sentences). Current date and time: ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}.`
                }, {
                  role: 'user',
                  content: command
                }],
                max_tokens: 150,
                temperature: 0.8
              })
            }
          );

          if (groqResponse.ok) {
            const groqData = await groqResponse.json();
            const aiResponse = groqData.choices?.[0]?.message?.content || 'Sorry, I had trouble with that.';

            soundEffects.speaking();
            set({ lastResponse: aiResponse, status: 'SPEAKING' });
            get().addNewsItem(`E.D.I.T.H: ${aiResponse}`);
            speak(aiResponse);
            
            setTimeout(() => set({ status: 'READY' }), 3000);
            return;
          } else {
            console.log('Groq failed, trying Gemini...');
          }
        } catch (groqError) {
          console.log('Groq error, trying Gemini...', groqError);
        }
      }
      
      // Try Gemini as fallback
      if (geminiKey) {
        console.log('Using Gemini API...');
        
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `${getPersonalityPrompt(personality, getCookie('USER_NAME') || 'SPIDERMAN')} Keep responses short (2-3 sentences). Current date and time: ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}.\n\nUser: ${command}`
                }]
              }]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I had trouble with that.';

          soundEffects.speaking();
          set({ lastResponse: aiResponse, status: 'SPEAKING' });
          get().addNewsItem(`E.D.I.T.H: ${aiResponse}`);
          speak(aiResponse);
          
          setTimeout(() => set({ status: 'READY' }), 3000);
          return;
        }
      }

      // Try Hugging Face as fallback (FREE, no API key!)
      if (!openai) {
        console.log('Using Hugging Face (Free, no API key needed)...');
        
        try {
          const hfResponse = await fetch(
            'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                inputs: `You are E.D.I.T.H, Tony Stark's AI. Be witty and call user ${getCookie('USER_NAME') || 'SPIDERMAN'}. Current date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.\n\nUser: ${command}\nE.D.I.T.H:`,
                parameters: { max_length: 100 }
              })
            }
          );

          if (hfResponse.ok) {
            const hfData = await hfResponse.json();
            const userName = getCookie('USER_NAME') || 'SPIDERMAN';
            const aiResponse = hfData[0]?.generated_text?.split('E.D.I.T.H:')[1]?.trim() || 
                             `Hey ${userName}! I heard "${command}". I'm running on free AI right now!`;
            
            soundEffects.speaking();
            set({ lastResponse: aiResponse, status: 'SPEAKING' });
            get().addNewsItem(`E.D.I.T.H: ${aiResponse}`);
            speak(aiResponse);
            setTimeout(() => set({ status: 'READY' }), 3000);
            return;
          }
        } catch (hfError) {
          console.log('Hugging Face failed, using demo mode');
        }

        // Final fallback - demo mode
        const userName = getCookie('USER_NAME') || 'SPIDERMAN';
        const demoResponses = [
          `Hey ${userName}! I heard you say "${command}". Get a FREE Gemini API key to unlock my full potential!`,
          `${userName}, I'm in demo mode right now. "${command}" sounds interesting! Add a Gemini API key for real AI.`,
          `Web-head! I caught "${command}". I'm running on limited power. Get a free API key at aistudio.google.com!`
        ];
        const response = demoResponses[Math.floor(Math.random() * demoResponses.length)];
        set({ lastResponse: response, status: 'READY' });
        get().addNewsItem(`E.D.I.T.H: ${response}`);
        speak(response);
        return;
      }

      // OpenAI fallback
      const newHistory = [...conversationHistory, { role: 'user', content: command }];
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `${getPersonalityPrompt(personality, getCookie('USER_NAME') || 'SPIDERMAN')} Keep responses concise (2-3 sentences max). Current date and time: ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}.`
          },
          ...newHistory as any
        ],
        max_tokens: 150,
        temperature: 0.8
      });

      const response = completion.choices[0].message.content || 'Sorry, I had trouble processing that.';
      newHistory.push({ role: 'assistant', content: response });

      set({ 
        lastResponse: response,
        conversationHistory: newHistory.slice(-10),
        status: 'SPEAKING'
      });

      get().addNewsItem(`E.D.I.T.H: ${response}`);
      speak(response);

      setTimeout(() => set({ status: 'READY' }), 3000);

    } catch (error: any) {
      console.error('Error processing command:', error);
      
      // Smart demo mode with basic responses
      let response = '';
      const lowerCommand = command.toLowerCase();
      const userName = getCookie('USER_NAME') || 'SPIDERMAN';
      
      if (lowerCommand.includes('time')) {
        const now = new Date();
        response = `It's ${now.toLocaleTimeString()}, ${userName}! Time to save the world!`;
      } else if (lowerCommand.includes('date') || lowerCommand.includes('today')) {
        const now = new Date();
        response = `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, web-head!`;
      } else if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
        response = `Hey ${userName}! E.D.I.T.H systems online. How can I help you today?`;
      } else if (lowerCommand.includes('joke')) {
        const jokes = [
          "Why did Spider-Man join the computer class? To improve his web design!",
          "What's Spider-Man's favorite month? Web-ruary!",
          "Why doesn't Spider-Man use the internet? Too many bugs in the web!"
        ];
        response = jokes[Math.floor(Math.random() * jokes.length)];
      } else if (lowerCommand.includes('who are you')) {
        response = `I'm E.D.I.T.H - Even Dead, I'm The Hero. Tony Stark's AI assistant, now serving you, ${userName}!`;
      } else if (lowerCommand.includes('what can you do')) {
        response = `I can tell time, dates, jokes, and chat with you! Add a Gemini API key for full AI powers, ${userName}!`;
      } else {
        const demoResponses = [
          `Hey ${userName}! I heard "${command}". I'm in demo mode - add a Gemini API key for full AI!`,
          `Web-head! "${command}" sounds interesting! I'm running on limited power right now.`,
          `${userName}, I caught "${command}". Get a free Gemini API key at aistudio.google.com for real AI!`
        ];
        response = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      }
      
      set({ lastResponse: response, status: 'READY' });
      get().addNewsItem(`E.D.I.T.H: ${response}`);
      speak(response);
    }
  },

  updateStatus: (status) => set({ status }),

  addNewsItem: (item) => {
    const { newsItems } = get();
    const newItems = [...newsItems, item].slice(-10); // Keep last 10 items
    set({ newsItems: newItems });
  },

  setVoice: (voiceName) => {
    set({ selectedVoice: voiceName });
    setCookie('SELECTED_VOICE', voiceName, 365);
  },

  addChatMessage: (role, content) => {
    const { chatHistory } = get();
    const newMessage: ChatMessage = {
      role,
      content,
      timestamp: Date.now()
    };
    const updatedHistory = [...chatHistory, newMessage];
    set({ chatHistory: updatedHistory });
    setCookie('CHAT_HISTORY', JSON.stringify(updatedHistory.slice(-50)), 365); // Keep last 50 messages
  },

  clearChatHistory: () => {
    set({ chatHistory: [] });
    setCookie('CHAT_HISTORY', '[]', 365);
  },

  setTheme: (theme) => {
    set({ theme });
    setCookie('THEME', theme, 365);
    document.documentElement.setAttribute('data-theme', theme);
  },

  setVolume: (volume) => {
    set({ volume, isMuted: false });
    setCookie('VOLUME', volume.toString(), 365);
    setCookie('IS_MUTED', 'false', 365);
  },

  toggleMute: () => {
    const { isMuted } = get();
    set({ isMuted: !isMuted });
    setCookie('IS_MUTED', (!isMuted).toString(), 365);
  },

  setPersonality: (personality) => {
    set({ personality });
    setCookie('PERSONALITY', personality, 365);
    soundEffects.activate();
    const userName = getCookie('USER_NAME') || 'SPIDERMAN';
    const messages = {
      tony: `Personality updated to Tony Stark mode. Let's get to work, ${userName}.`,
      peter: `Hey ${userName}! Switched to Peter Parker mode. Ready to help!`,
      professional: `Professional mode activated, ${userName}. How may I assist you?`,
      fun: `Fun mode ON! 🎉 Let's have some fun, ${userName}!`
    };
    get().addNewsItem(messages[personality]);
    
    // Track personality usage for achievement
    AchievementManager.incrementStat('personalityUsed', personality);
  },

  incrementStats: () => {
    const { stats } = get();
    const newStats = {
      ...stats,
      totalMessages: stats.totalMessages + 1,
      totalConversations: stats.totalConversations + (stats.totalMessages === 0 ? 1 : 0)
    };
    set({ stats: newStats });
    setCookie('STATS', JSON.stringify(newStats), 365);
  }
}));

// Quick Commands Handler
async function handleQuickCommand(command: string) {
  const store = useEdithStore.getState();
  const userName = getCookie('USER_NAME') || 'SPIDERMAN';
  let response = '';

  soundEffects.activate();
  store.updateStatus('PROCESSING');

  const cmd = command.toLowerCase();
  const args = cmd.split(' ').slice(1).join(' ');
  
  // Track command usage for achievement
  AchievementManager.incrementStat('commandUsed', cmd.split(' ')[0]);

  try {
    switch (true) {
      case cmd === '/time':
        const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        response = `It's ${time}, ${userName}!`;
        break;

      case cmd === '/date':
        const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        response = `Today is ${date}, web-head!`;
        break;

      case cmd === '/weather':
        store.addNewsItem('Fetching weather data...');
        const weather = await getWeather();
        if (weather) {
          response = formatWeatherResponse(weather);
          AchievementManager.checkAndUnlock('weather_check');
        } else {
          response = `Couldn't get weather data, ${userName}. Location access might be blocked.`;
        }
        break;

      case cmd.startsWith('/search '):
        if (!args) {
          response = 'Usage: /search <query>. Example: /search Spider-Man';
          break;
        }
        store.addNewsItem(`Searching for: ${args}...`);
        const results = await searchWeb(args);
        response = summarizeSearchResults(results);
        if (results.length > 0) {
          response += `\n\nTop result: ${results[0].url}`;
        }
        AchievementManager.checkAndUnlock('web_searcher');
        break;

      case cmd.startsWith('/news'):
        const category = args || 'general';
        store.addNewsItem(`Fetching ${category} news...`);
        const articles = await getNews(category);
        response = summarizeNews(articles);
        AchievementManager.checkAndUnlock('news_reader');
        break;

      case cmd.startsWith('/remind'):
        const reminderData = parseReminderCommand(command);
        if (reminderData) {
          const reminder = ReminderManager.addReminder(
            reminderData.title,
            '',
            reminderData.date
          );
          response = `✅ Reminder set: "${reminder.title}" at ${reminderData.date.toLocaleString()}`;
        } else {
          response = 'Usage: /remind me to <task> in <time>. Example: /remind me to call mom in 2 hours';
        }
        break;

      case cmd === '/reminders':
        response = ReminderManager.checkReminders();
        const upcoming = ReminderManager.getUpcomingReminders();
        if (upcoming.length > 1) {
          response += `\n\nYou have ${upcoming.length} total reminders.`;
        }
        break;

      case cmd === '/joke':
        const jokes = [
          "Why did Spider-Man join the computer class? To improve his web design! 🕸️",
          "What's Spider-Man's favorite month? Web-ruary! 😄",
          "Why doesn't Spider-Man use the internet? Too many bugs in the web! 🐛",
          "How does Spider-Man communicate? Through the world wide web! 🌐",
          "What's Iron Man's favorite drink? Rust-proof coffee! ☕"
        ];
        response = jokes[Math.floor(Math.random() * jokes.length)];
        break;

      case cmd === '/help':
        response = `Quick Commands:
/time - Current time
/date - Today's date
/weather - Local weather
/search <query> - Web search
/news [category] - Latest news
/remind me to <task> in <time> - Set reminder
/reminders - Check reminders
/joke - Random joke
/help - This menu

Just speak naturally for AI chat!`;
        break;

      default:
        response = `Unknown command: ${command}. Type /help for available commands.`;
    }
  } catch (error) {
    console.error('Command error:', error);
    response = `Error executing command: ${command}. Try again or type /help.`;
  }

  store.addNewsItem(`E.D.I.T.H: ${response}`);
  store.addChatMessage('assistant', response);
  store.updateStatus('SPEAKING');
  speak(response);
  
  setTimeout(() => store.updateStatus('READY'), 2000);
}

// Text-to-Speech function with voice selection
function speak(text: string) {
  // Cancel any ongoing speech
  speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  
  // Function to set voice and speak
  const setVoiceAndSpeak = () => {
    const voices = speechSynthesis.getVoices();
    
    if (voices.length === 0) {
      // Voices not loaded yet, wait a bit
      setTimeout(() => setVoiceAndSpeak(), 100);
      return;
    }
    
    // Get selected voice from cookie
    const selectedVoiceName = getCookie('SELECTED_VOICE');
    
    if (selectedVoiceName) {
      const selectedVoice = voices.find(v => v.name === selectedVoiceName);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    } else {
      // Default: Try to find a good voice
      const preferredVoice = voices.find(v => 
        v.name.includes('Google') || 
        v.name.includes('Microsoft') ||
        v.name.includes('Samantha') ||
        v.name.includes('Daniel')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
    }
    
    // Add error handling
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
    };
    
    utterance.onend = () => {
      console.log('Speech finished');
    };
    
    // Speak
    speechSynthesis.speak(utterance);
  };
  
  // Start speaking
  setVoiceAndSpeak();
}

// Get available voices
export function getAvailableVoices(): SpeechSynthesisVoice[] {
  return speechSynthesis.getVoices();
}
