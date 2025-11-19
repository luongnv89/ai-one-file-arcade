# AI One-File Arcade 🎮

<div align="center">

![AI One-File Arcade](https://img.shields.io/badge/AI-One--File--Arcade-green)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.2-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-cyan)

A security-first showcase of AI-generated, single-HTML-file web games.

[Live Demo](#live-demo) • [Getting Started](#-getting-started) • [Contributing](#-contributing) • [Documentation](./devdocs/)

</div>

---

## 🌟 What is AI One-File Arcade?

AI One-File Arcade is an open-source, security-first showcase of AI-generated, single-HTML-file web games. It provides a transparent, educational, and contributor-friendly platform where all games are created by AI models using a single prompt, stored in a structured format, and displayed through a safe sandboxed interface.

Visit the in-app [About page](http://localhost:5173/about) to learn more about the mission, security guarantees, and roadmap.

### ✨ Key Features

- 🔐 **Security-First**: All games run in sandboxed iframes with strict security validation
- 🤖 **AI-Generated Only**: Every game is created by AI models (GPT, Claude, Llama, etc.)
- 📚 **Educational**: Full transparency with AI prompts included for every game
- 🎨 **Beautiful UI**: Clean, minimalist design with smooth interactions
- 🔍 **Search & Filter**: Find games by name, description, model, or tags
- 📱 **Responsive**: Works beautifully on desktop and mobile
- 🚀 **Fast**: Built with Vite for lightning-fast performance
- ✅ **Validated**: Automated security and schema validation for all submissions

## 🎯 Live Demo

**Coming Soon**: The arcade is currently in active development. Follow the setup instructions below to run it locally!

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/luongnv89/one-prompt-one-single-file-game.git
   cd one-prompt-one-single-file-game
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Generate the games manifest**

   ```bash
   npm run generate:manifest
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run check        # Run lint, format check, and build

# Game Management
npm run generate:manifest  # Regenerate games manifest
npm run validate:games     # Validate all games for security

# Pre-commit hooks
npm run prepare      # Setup Husky (done automatically on npm install)
```

## 📁 Project Structure

```
one-prompt-one-single-file-game/
├── public/
│   ├── games/              # All AI-generated games
│   │   └── sample-game/
│   │       ├── index.html  # Game file
│   │       ├── info.json   # Game metadata
│   │       └── prompt.md   # AI prompt used
│   └── games-manifest.json # Auto-generated game list
├── src/
│   ├── components/         # React components
│   │   ├── GameCard.jsx
│   │   ├── GameDetail.jsx
│   │   ├── SandboxIframe.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   └── Gallery.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── scripts/
│   ├── generate-manifest.js # Manifest generator
│   └── validate-games.js    # Security validator
├── templates/
│   └── game/               # Contributor template
│       ├── index.html
│       ├── info.json
│       └── prompt.md
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI
├── devdocs/                # Documentation
├── CONTRIBUTING.md         # Contribution guidelines
└── README.md
```

## 🎮 Adding a Game

1. **Fork the repository** on GitHub

2. **Copy the template**

   ```bash
   cp -r templates/game games/my-awesome-game
   ```

3. **Create your AI-generated game**
   - Edit `games/my-awesome-game/index.html` with your game
   - Edit `games/my-awesome-game/info.json` with metadata
   - Edit `games/my-awesome-game/prompt.md` with your AI prompt

4. **Validate your game**

   ```bash
   npm run validate:games
   ```

5. **Submit a Pull Request**
   - Push to your fork
   - Open a PR with your game
   - CI will automatically validate your submission

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions! When running the app locally, open `http://localhost:5173/contribute` (also linked in the site nav) for an interactive, step-by-step contributor guide covering the full quality checklist.

## 🔒 Security

We take security seriously. All games are validated for:

- ❌ **Prohibited**: POST requests, WebSockets, EventSource, tracking, analytics
- ✅ **Allowed**: Canvas, WebGL, keyboard/mouse input, approved CDNs only
- 🔐 **Isolation**: Games run in sandboxed iframes with no access to parent origin

The validation script automatically checks for security violations and will reject PRs that don't comply.

## 🤝 Contributing

We welcome contributions! Please read:

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines and game requirements
- [devdocs/todo-list.md](./devdocs/todo-list.md) - Sprint planning and task breakdown
- [devdocs/prd.md](./devdocs/prd.md) - Product requirements document
- [devdocs/brand_kit.md](./devdocs/brand_kit.md) - Brand guidelines

### Game Requirements

Every game must be:

1. ✅ AI-generated from a prompt
2. ✅ Single HTML file (index.html)
3. ✅ Include info.json with metadata
4. ✅ Include prompt.md with the AI prompt used
5. ✅ Pass all security validations
6. ✅ Be a complete, playable game

### Development Workflow

1. Make your changes
2. Run `npm run check` to ensure code quality
3. Run `npm run validate:games` to check security
4. Create a pull request
5. CI will automatically validate and test your changes

## 📚 Tech Stack

- **Frontend**: React 19.2.0
- **Build Tool**: Vite 7.2.2
- **Styling**: Tailwind CSS 4.1.17
- **Linting**: ESLint 9.39.1
- **Formatting**: Prettier 3.6.2
- **CI/CD**: GitHub Actions
- **Validation**: Custom Node.js scripts

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## 📈 Roadmap

### ✅ Completed (Sprint 1 - Phase 1)

- Base project structure with Vite + React + Tailwind
- Sample AI-generated game
- Sandbox iframe component
- Manifest generator
- Basic gallery (POC)

### 🚧 In Progress (Sprint 2 - Phase 2 MVP)

- [x] Full gallery with search
- [x] Game detail page with prompt viewer
- [x] Contributor template
- [x] Security validation
- [x] Pre-commit hooks
- [x] CI/CD pipeline
- [ ] MVP UI polish
- [ ] Documentation
- [ ] Seed games (3-5 examples)

### 📋 Upcoming (Phase 3+)

- PWA support for offline play
- Advanced tagging and filtering
- Featured games mechanism
- Educator packs
- Trust badges for verified games
- AI-powered metadata assistant

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/luongnv89/one-prompt-one-single-file-game)
![GitHub forks](https://img.shields.io/github/forks/luongnv89/one-prompt-one-single-file-game)
![GitHub issues](https://img.shields.io/github/issues/luongnv89/one-prompt-one-single-file-game)
![GitHub pull requests](https://img.shields.io/github/issues-pr/luongnv89/one-prompt-one-single-file-game)

## 🙏 Acknowledgments

- All games are generated by AI models from the community
- Built with modern web technologies for maximum compatibility
- Inspired by the creativity of AI and the open-source community

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 💬 Community

- [GitHub Issues](https://github.com/luongnv89/one-prompt-one-single-file-game/issues) - Report bugs or request features
- [GitHub Discussions](https://github.com/luongnv89/one-prompt-one-single-file-game/discussions) - Join the conversation
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute

---

<div align="center">

**Built with ❤️ by the community**

[Website](#) • [GitHub](https://github.com/luongnv89/one-prompt-one-single-file-game) • [Contribute](./CONTRIBUTING.md)

</div>
