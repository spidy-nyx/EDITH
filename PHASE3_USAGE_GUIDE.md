# 📖 Phase 3 Usage Guide - Advanced Features

## 🔍 Web Search

### How to Search
1. Click microphone or type in text input
2. Type: `/search <your query>`
3. Wait for results
4. Get summarized answer with links

### Examples
```
/search Spider-Man origin story
/search how to make web fluid
/search Tony Stark inventions
/search latest Marvel news
```

### What You Get
- Main result with description
- Related topics (up to 3)
- Source URLs
- Voice summary

### Tips
- Be specific with queries
- Use quotes for exact phrases: `/search "Iron Man suit"`
- Works for any topic
- Results from DuckDuckGo

---

## 🌤️ Weather

### How to Get Weather
1. Click microphone or type
2. Type: `/weather`
3. Allow location access (first time)
4. Get current weather

### What You Get
- Current temperature (°F)
- Weather condition
- Wind speed
- Weather icon
- Your location name

### Weather Icons
- ☀️ Clear/Sunny
- ⛅ Partly Cloudy
- 🌫️ Foggy
- 🌦️ Drizzle
- 🌧️ Rain
- ❄️ Snow
- ⛈️ Thunderstorm

### Tips
- Allow location for accurate weather
- Weather updates each time you ask
- Works on mobile and desktop
- No API key needed

### Troubleshooting
- **"Location access blocked"** - Enable in browser settings
- **"Couldn't get weather"** - Check internet connection
- **Wrong location** - Browser might be using IP location

---

## 📰 News

### How to Get News
1. Click microphone or type
2. Type: `/news` or `/news <category>`
3. Wait for articles
4. Get top story summary

### Categories
- `general` - Top headlines (default)
- `tech` - Technology news
- `science` - Science news
- `business` - Business news
- `sports` - Sports news

### Examples
```
/news
/news tech
/news science
/news business
/news sports
```

### What You Get
- Top story headline
- Brief description
- Source name
- Number of additional stories

### Tips
- Use categories for targeted news
- News updates in real-time
- Multiple sources available
- Free RSS feeds

---

## 📅 Reminders

### How to Create Reminders

#### Method 1: Natural Language
```
/remind me to call mom in 2 hours
/remind me to meeting tomorrow
/remind me to buy groceries in 30 minutes
/remind me to workout at 6:00
```

#### Method 2: Simple Format
```
/remind me to [task] in [time]
```

### Supported Time Formats
- **Hours:** "in 2 hours", "in 1 hour"
- **Minutes:** "in 30 minutes", "in 15 minutes"
- **Tomorrow:** "tomorrow" (defaults to 9 AM)
- **Specific Time:** "at 6:00", "at 14:30"
- **Default:** Just task (defaults to 1 hour)

### Check Reminders
```
/reminders
```

Shows:
- Overdue reminders (red)
- Upcoming reminders (blue)
- Time until each reminder

### Manage Reminders

#### View Reminders Panel
1. Click "📊 Dashboard" button
2. Scroll to Reminders section
3. See all reminders organized

#### Complete a Reminder
- Click ✓ button next to reminder
- Moves to completed section
- Shows with strikethrough

#### Delete a Reminder
- Click ✕ button next to reminder
- Permanently removes reminder

#### Show Completed
- Click "Show Completed" toggle
- View all completed reminders
- Hidden by default

### Notifications

#### Enable Notifications
1. Browser will ask for permission
2. Click "Allow"
3. Get alerts when reminders are due

#### Notification Timing
- Only notifies within 24 hours
- Exact time notification
- Shows reminder title
- E.D.I.T.H icon

### Reminder States

#### ⚠️ Overdue (Red)
- Past due date
- Shows "Overdue" label
- Red border
- Needs attention

#### 📅 Upcoming (Blue)
- Future reminders
- Shows time until
- Blue section
- Sorted by date

#### ✅ Completed (Green)
- Finished tasks
- Strikethrough text
- Green checkmark
- Hidden by default

### Examples

#### Example 1: Quick Reminder
```
User: "/remind me to call Peter in 1 hour"
E.D.I.T.H: "✅ Reminder set: 'call Peter' at 11/24/2025, 4:30 PM"

[1 hour later]
Notification: "E.D.I.T.H Reminder: call Peter"
```

#### Example 2: Tomorrow Reminder
```
User: "/remind me to team meeting tomorrow"
E.D.I.T.H: "✅ Reminder set: 'team meeting' at 11/25/2025, 9:00 AM"
```

#### Example 3: Check Status
```
User: "/reminders"
E.D.I.T.H: "📅 Next reminder in 2 hours: call Peter. You have 3 total reminders."
```

---

## 🎯 Combined Usage Examples

### Morning Routine
```
1. /weather
   → "☀️ Weather in New York: 68°F and Clear"

2. /news
   → "Top story: New Tech Breakthrough..."

3. /remind me to lunch meeting in 3 hours
   → "✅ Reminder set: 'lunch meeting' at 12:00 PM"
```

### Research Session
```
1. /search quantum computing basics
   → "Here's what I found: Quantum computing uses..."

2. /search latest quantum news
   → "Top result: IBM Announces New Quantum Chip"

3. /remind me to read quantum paper tomorrow
   → "✅ Reminder set for tomorrow 9:00 AM"
```

### News Catch-Up
```
1. /news tech
   → "Top tech story: AI Breakthrough..."

2. /news science
   → "Top science story: Mars Discovery..."

3. /news business
   → "Top business story: Market Update..."
```

---

## 💡 Pro Tips

### Search Tips
- Use specific keywords
- Try different phrasings if no results
- Check related topics for more info
- URLs provided for deep dives

### Weather Tips
- Check weather before going out
- Allow location for accuracy
- Weather updates each request
- Works offline after first load

### News Tips
- Use categories for focused news
- Check multiple categories
- News updates throughout day
- Free and unlimited

### Reminder Tips
- Be specific with task names
- Use natural language
- Check `/reminders` regularly
- Enable notifications
- Complete tasks to stay organized

---

## 🔒 Privacy & Permissions

### Location Permission
- **Used for:** Weather only
- **When:** Only when you use `/weather`
- **Stored:** Not stored, used once
- **Revoke:** Browser settings

### Notification Permission
- **Used for:** Reminder alerts
- **When:** When reminders are due
- **Stored:** Permission only
- **Revoke:** Browser settings

### Data Storage
- **Reminders:** Stored in browser cookies
- **No server:** Everything is local
- **Privacy:** No data sent to servers
- **Secure:** HTTPS connections only

---

## 📱 Mobile Usage

### Mobile Features
- Touch-friendly interface
- Mobile geolocation
- Mobile notifications
- Responsive layout

### Mobile Tips
- Tap Dashboard to toggle
- Swipe to scroll reminders
- Enable location for weather
- Enable notifications for reminders
- Use text input for commands

---

## 🐛 Common Issues

### "Location access blocked"
**Solution:** 
1. Click lock icon in address bar
2. Allow location access
3. Refresh page
4. Try `/weather` again

### "Search returned no results"
**Solution:**
- Check internet connection
- Try different search terms
- Wait a moment and retry
- DuckDuckGo might be rate-limited

### "News not loading"
**Solution:**
- Check internet connection
- Try different category
- RSS feed might be down
- Wait and retry

### "Reminder not notifying"
**Solution:**
1. Check notification permissions
2. Enable in browser settings
3. Reminders only notify within 24 hours
4. Check system notifications enabled

---

## 🎨 Visual Guide

### Dashboard with Reminders
```
┌─────────────────────────────────────────────┐
│  E.D.I.T.H          [📊 Dashboard] [●] READY│
└─────────────────────────────────────────────┘

[Click Dashboard Button]

┌─────────────────────────────────────────────┐
│  📊 Dashboard              🦾 Tony Stark    │
│  [Stats Cards]                              │
│  Quick Commands: /weather /search /news...  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  🎭 AI Personality                          │
│  [Personality Cards]                        │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  📅 Reminders              [Show Completed] │
│                                             │
│  ⚠️ Overdue (1)                            │
│  • Call mom - Overdue                  ✓ ✕ │
│                                             │
│  📅 Upcoming (2)                           │
│  • Team meeting - 2h 30m               ✓ ✕ │
│  • Buy groceries - 5h                  ✓ ✕ │
│                                             │
│  💡 Use /remind me to [task] in [time]     │
└─────────────────────────────────────────────┘
```

---

## 🚀 Quick Reference

### All Phase 3 Commands
```
/weather              - Get local weather
/search <query>       - Search the web
/news [category]      - Get latest news
/remind me to <task>  - Create reminder
/reminders            - Check reminders
```

### News Categories
```
general, tech, science, business, sports
```

### Reminder Time Formats
```
in X hours
in X minutes
tomorrow
at HH:MM
```

---

**Need More Help?**
- Type `/help` for all commands
- Check PHASE3_COMPLETE.md for technical details
- See README.md for full documentation

**Enjoying Phase 3?** Phase 4 coming soon with Spider-Man themed features!
