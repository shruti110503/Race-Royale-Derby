# 🏇 Race Royale Derby

> **The Ultimate Horse Racing Experience** - Choose your champion, place strategic bets, and experience the thrill of live horse racing action!

[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 About

Race Royale Derby is an immersive horse racing simulation game that combines the excitement of live racing with strategic betting mechanics. Players can select from unique horses with different stats, place bets, and watch thrilling races unfold in real-time.

### ✨ Key Features

- 🐎 **6 Unique Horses** - Each with distinct speed, stamina, and performance characteristics
- 💰 **Strategic Betting System** - Place bets with varying odds and potential payouts
- 🏁 **Live Race Simulation** - Watch races unfold with realistic physics and animations
- 📊 **Detailed Horse Stats** - Analyze speed, stamina, and form before betting
- 🎮 **Multiple Race Types** - Derby Classic, Champions Stakes, Speed Sprint, and Endurance Challenge
- 💎 **Professional UI** - Modern glassmorphism design with smooth animations
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS with custom components
- **UI Components:** Shadcn/ui component library
- **State Management:** React Context API
- **Icons:** Lucide React
- **Notifications:** Sonner toast notifications
- **Build Tool:** Vite
- **Deployment:** Vercel/Netlify ready

## 📦 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/race-royale-derby.git
   cd race-royale-derby
   ```

2. **Install dependencies**
   ```
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

## 🎮 How to Play

### 1. 🏇 Choose Your Horse
- Browse through 6 unique horses in the selection screen
- Analyze each horse's stats: Speed, Stamina, and current Form
- Check the odds to understand potential payouts

### 2. 💵 Place Your Bet
- Enter your bet amount (within your available balance)
- Review potential winnings based on horse odds
- Confirm your selection to proceed

### 3. 🏁 Watch the Race
- Experience live race action with real-time commentary
- Watch your chosen horse compete against others
- See dynamic position updates and race progress

### 4. 🏆 Collect Winnings
- View detailed race results and final positions
- Collect your winnings if your horse wins
- Return to lobby for another race!

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── TitlePage.tsx    # Game title screen
│   ├── LobbyPage.tsx    # Race selection lobby
│   ├── HorseSelectionPage.tsx # Horse selection & betting
│   ├── RacePage.tsx     # Live race simulation
│   ├── ResultsPage.tsx  # Race results & payouts
│   └── InstructionsPage.tsx # Game instructions
├── context/             # React Context for state management
│   └── GameContext.tsx  # Main game state
├── pages/               # Page components
│   ├── Index.tsx        # Main game router
│   └── NotFound.tsx     # 404 error page
└── App.tsx             # Root application component
```

## 🎨 Screenshots

### Title Screen
![Title Screen](screenshots/title-screen.png)

### Horse Selection
![Horse Selection](screenshots/horse-selection.png)

### Live Race
![Live Race](screenshots/live-race.png)

### Results
![Results](screenshots/results.png)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```
VITE_APP_TITLE=Race Royale Derby
VITE_API_URL=your-api-url (if applicable)
```

### Customization

- **Horse Data:** Modify horse stats in `src/context/GameContext.tsx`
- **Race Types:** Add new race categories in `src/components/LobbyPage.tsx`
- **Styling:** Customize colors and themes in `tailwind.config.js`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful component and variable names
- Add comments for complex game logic
- Ensure responsive design compatibility
- Test on multiple browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** - For the beautiful component library
- **Lucide React** - For the comprehensive icon set
- **Tailwind CSS** - For the utility-first CSS framework
- **React Team** - For the amazing framework

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? Please open an issue on GitHub:

- [Report Bug](https://github.com/yourusername/race-royale-derby/issues/new?template=bug_report.md)
- [Request Feature](https://github.com/yourusername/race-royale-derby/issues/new?template=feature_request.md)

## 📊 Roadmap

- [ ] 🎵 Add sound effects and background music
- [ ] 🏆 Implement tournament mode with multiple races
- [ ] 👥 Add multiplayer betting functionality
- [ ] 📈 Create detailed statistics and betting history
- [ ] 🎨 Add more horse customization options
- [ ] 🌐 Implement backend API for persistent data

## 📞 Contact

**Developer:** Shruti Shukla
**Email:** shrutishukla297@gmail.com 

---



**⭐ Star this repository if you enjoyed the game! ⭐**

Made with ❤️ and lots of ☕


```

## Additional Files to Create

You should also create these additional files in your repository:

### `.gitignore`
```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
```

### `LICENSE`
```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

