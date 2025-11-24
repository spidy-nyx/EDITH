# 🕷️ E.D.I.T.H - AI Assistant

**E**ven **D**ead, **I**'m **T**he **H**ero

A Spider-Man themed AI voice assistant built with React, TypeScript, and Electron. Inspired by Tony Stark's AI technology from the MCU.

![E.D.I.T.H](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6)

## ✨ Features

### Core Features
- 🎤 **Voice Recognition** - Click to speak, get AI responses
- 🤖 **Multiple AI Providers** - Groq (fastest), Google Gemini, or Demo mode
- 🎨 **Animated UI** - JARVIS-style visualization with dynamic animations
- 🕷️ **Hero Selection** - Choose between Spider-Man or Spider-Woman
- 🎵 **Sound Effects** - Interactive audio feedback
- 🔊 **Voice Selection** - Choose from available system voices
- 💾 **Persistent Storage** - Settings saved in browser cookies
- 📱 **Mobile Responsive** - Works on phones, tablets, and desktops
- ⚡ **Electron App** - Run as a desktop application

### Phase 2 Features ✨
- 🎭 **AI Personality Modes**
  - 🦾 **Tony Stark** - Sarcastic, witty, genius billionaire
  - 🕷️ **Peter Parker** - Friendly, nerdy, neighborhood hero
  - 💼 **Professional** - Formal, efficient, business-like
  - 🎉 **Fun Mode** - Playful, entertaining, full of jokes
- ⚡ **Quick Commands**
  - `/time` - Get current time instantly
  - `/date` - Get today's date
  - `/joke` - Random Spider-Man/Iron Man jokes
  - `/help` - Show all available commands
- 📊 **Dashboard & Stats**
  - Total messages & conversations tracked
  - Days active since first use
  - Average messages per day
  - Recent activity feed
  - Real-time personality indicator

### Phase 3 Features 🔥
- 🔍 **Web Search**
  - DuckDuckGo integration (free, no API key)
  - Real-time search results
  - Automatic summarization
  - Related topics
- 🌤️ **Weather**
  - Location-based weather data
  - Current temperature & conditions
  - Wind speed & weather icons
  - Open-Meteo API (free)
- 📰 **News**
  - Latest headlines from NY Times
  - Multiple categories (tech, science, business, sports)
  - Top 5 articles with summaries
  - RSS feed integration
- 📅 **Calendar & Reminders**
  - Natural language reminder creation
  - Browser notifications
  - Overdue & upcoming tracking
  - Complete/delete reminders
  - Visual reminder panel
  - Cookie-based persistence

### Phase 4 Features 🕷️ NEW!
- 🎬 **MCU Easter Eggs**
  - 10+ iconic MCU quotes with context
  - 10+ character facts (Spider-Man, Iron Man, E.D.I.T.H)
  - Hidden easter egg triggers in chat
  - Automatic detection and responses
  - Secret achievement unlocks
- 🎯 **Trivia & Facts**
  - Random quote generator
  - Random fact generator
  - Character-specific information
  - Movie context included
- 🎮 **MCU Trivia Game**
  - 15+ trivia questions
  - 3 difficulty levels (easy, medium, hard)
  - 4 categories (Spider-Man, Iron Man, MCU, E.D.I.T.H)
  - Multiple choice format
  - Instant feedback with fun facts
  - Score tracking & streak system
  - Accuracy percentage
- 🏆 **Achievements System**
  - 16 total achievements
  - 12 regular + 4 secret achievements
  - Progress tracking with percentage
  - Unlock timestamps
  - Visual achievement cards
  - Statistics display
  - Cookie-based persistence

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern browser (Chrome, Edge, or Safari for voice recognition)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/edith-ai-assistant.git
cd edith-ai-assistant/edith-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Run as Desktop App

```bash
npm run electron:dev
```

## 🎮 Usage

### First Time Setup

1. **Eye Animation** - Watch the Spider-Man eyes blink
2. **Welcome Screen** - See the "HEY THERE, THIS IS" animation
3. **Setup Form**:
   - Choose your hero (Spider-Man or Spider-Woman)
   - Select AI provider (Groq, Gemini, or Skip for demo)
   - Add API key (if not skipping)
   - Choose AI voice (optional)
4. Click **ACTIVATE E.D.I.T.H**

### Using E.D.I.T.H

1. **View Dashboard** - See your usage stats and current personality
2. **Select Personality** - Choose Tony, Peter, Professional, or Fun mode
3. **Click Microphone** - Press the 🎤 button to speak
4. **Speak Command** - Say your question or use quick commands
5. **Get Response** - E.D.I.T.H responds with voice and text
6. **Watch Animation** - Visualization reacts to different states

### Quick Commands

Type or say these commands for instant responses:

**Basic Commands:**
- `/time` - Current time
- `/date` - Today's date
- `/joke` - Random joke
- `/help` - All commands

**Phase 3 Commands:**
- `/weather` - Local weather
- `/search <query>` - Web search
- `/news [category]` - Latest news
- `/remind me to <task> in <time>` - Set reminder
- `/reminders` - Check reminders

### Getting Free API Keys

#### Groq (Recommended - Fastest)
1. Visit [console.groq.com/keys](https://console.groq.com/keys)
2. Sign up with Google (FREE, no credit card)
3. Click "Create API Key"
4. Copy and paste into E.D.I.T.H

#### Google Gemini
1. Visit [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with Google
3. Click "Create API Key"
4. Copy and paste into E.D.I.T.H

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Desktop**: Electron
- **Build Tool**: Vite
- **AI Integration**: Groq, Google Gemini, OpenAI
- **Voice**: Web Speech API

## 📁 Project Structure

```
edith-app/
├── src/
│   ├── components/
│   │   ├── BootSequence.tsx       # Welcome animation
│   │   ├── OnboardingFlow.tsx     # Setup wizard
│   │   ├── MainInterface.tsx      # Main app interface
│   │   ├── EdithVisualization.tsx # Animated visualization
│   │   ├── VoiceInput.tsx         # Voice control
│   │   └── SettingsModal.tsx      # Settings panel
│   ├── store/
│   │   └── edithStore.ts          # State management
│   ├── utils/
│   │   ├── cookies.ts             # Cookie storage
│   │   └── soundEffects.ts        # Audio effects
│   ├── App.tsx                    # Main app component
│   └── main.tsx                   # Entry point
├── electron/
│   └── main.js                    # Electron main process
└── public/                        # Static assets
```

## 🎨 Features in Detail

### Voice Recognition
- Click-to-speak interface
- Real-time speech-to-text
- Works on desktop and mobile browsers
- Automatic error handling

### AI Responses
- Multiple provider support (Groq, Gemini, OpenAI)
- Fallback to demo mode
- Context-aware responses
- Personality: Witty like Tony Stark, nerdy like Peter Parker

### Visualization States
- **READY**: Idle pulsing animation
- **LISTENING**: Expanding pulse rings
- **PROCESSING**: Spinning loader
- **SPEAKING**: Animated waveform bars

### Data Persistence
All settings stored in browser cookies:
- Hero selection (Spider-Man/Spider-Woman)
- API keys (encrypted in cookies)
- Voice preference
- User preferences

## 🔧 Configuration

### Environment Variables

Create a `.env` file (optional):

```env
VITE_GROQ_API_KEY=your_groq_key_here
VITE_GEMINI_API_KEY=your_gemini_key_here
VITE_OPENAI_API_KEY=your_openai_key_here
```

Note: You can also add keys through the UI during setup.

## 📱 Mobile Support

E.D.I.T.H is fully responsive and works on:
- 📱 iOS Safari (iPhone/iPad)
- 🤖 Android Chrome
- 💻 Desktop browsers
- 🖥️ Electron desktop app

## 🚢 Building for Production

### Web Build
```bash
npm run build
npm run preview
```

### Electron Build
```bash
npm run electron:build
```

This creates installers for your platform in the `dist` folder.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Tony Stark's E.D.I.T.H from Spider-Man: Far From Home
- Built with love for the Spider-Man and MCU community
- Thanks to all the open-source libraries that made this possible

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ and 🕷️ by Spider-Man fans**

*"With great power comes great responsibility"* - Uncle Ben
