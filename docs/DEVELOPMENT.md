# Development Guide - Space Portfolio

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📋 Available Scripts

### Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle
- `npm run start` - Start production server

### Code Quality

- `npm run lint` - Run ESLint for code analysis
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is properly formatted
- `npm run type-check` - Run TypeScript type checking
- `npm run pre-commit` - Run lint-staged (automatically runs on commit)

### Versioning & Releases

- `npm run release` - Auto-bump version based on conventional commits
- `npm run release:patch` - Force patch version bump (0.1.0 → 0.1.1)
- `npm run release:minor` - Force minor version bump (0.1.0 → 0.2.0)
- `npm run release:major` - Force major version bump (0.1.0 → 1.0.0)
- `npm run release:pre` - Create pre-release version (0.1.0 → 0.1.1-0)
- `npm run release:alpha` - Create alpha pre-release (0.1.0 → 0.1.1-alpha.0)
- `npm run release:beta` - Create beta pre-release (0.1.0 → 0.1.1-beta.0)

## 🛠️ Development Environment

### VS Code Setup

The project includes comprehensive VS Code configuration:

- **Settings**: Automatic formatting, linting, and code actions
- **Extensions**: Recommended extensions for optimal development
- **Debugging**: Pre-configured launch configurations for Next.js
- **Tasks**: Quick access to common development tasks

### Required VS Code Extensions

Essential extensions (auto-suggested when opening the project):

- Prettier - Code formatter
- ESLint - Code linting
- Tailwind CSS IntelliSense
- GitHub Copilot
- GitLens

## 🔧 Code Quality Tools

### ESLint Configuration

- **Base**: Next.js TypeScript configuration
- **Style**: Prettier integration for consistent formatting
- **Rules**: React, TypeScript, and general code quality rules
- **Auto-fix**: Runs on save and pre-commit

### Prettier Configuration

- **Single quotes**: Preferred over double quotes
- **No semicolons**: Clean TypeScript style
- **2 spaces**: Consistent indentation
- **Tailwind plugin**: Automatic class sorting

### Husky Git Hooks

- **Pre-commit**: Runs lint-staged for staged files
- **Commit-msg**: Validates commit messages with commitlint

### Lint-staged

Automatically runs on staged files:

- ESLint fix for `.js,.jsx,.ts,.tsx` files
- Prettier formatting for all supported files

## 📝 Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

### Commit Types

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Reverting previous commits

### Examples

```bash
feat: add space navigation component
fix: resolve mobile menu visibility issue
docs: update installation instructions
style: format button component
refactor: extract reusable space animation hook
```

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

## 🏷️ Versioning & Releases

This project follows [Semantic Versioning](https://semver.org/) (SemVer):

### Version Format

- **MAJOR.MINOR.PATCH** (e.g., 1.2.3)
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Process

1. **Automatic Versioning**: Use `npm run release` for automatic version bumping based on commit messages
2. **Manual Versioning**: Use specific release commands for manual control
3. **Changelog**: Automatically generated from conventional commit messages
4. **Git Tags**: Automatically created and pushed with each release

### Release Workflow

```bash
# Make your changes and commit with conventional messages
git add .
git commit -m "feat: add new space component"

# Create a release (auto-detects version bump needed)
npm run release

# Or manually specify version type
npm run release:minor  # for new features
npm run release:patch  # for bug fixes
npm run release:major  # for breaking changes
```

### Pre-releases

For testing purposes, you can create pre-release versions:

```bash
npm run release:pre    # 1.0.0 → 1.0.1-0
npm run release:alpha  # 1.0.0 → 1.0.1-alpha.0
npm run release:beta   # 1.0.0 → 1.0.1-beta.0
```

### What Happens During Release

1. **Version Bump**: Updates version in `package.json`
2. **Changelog Update**: Generates/updates `CHANGELOG.md` with beautiful formatting
3. **Git Tag**: Creates annotated git tag (e.g., `v1.0.0`)
4. **Git Commit**: Commits the changes with release message

### Changelog Features

The generated changelog includes:

- **🚀 Beautiful header** with space theme
- **📊 Categorized sections** with emojis for easy scanning:
  - ✨ New Features
  - 🐛 Bug Fixes
  - ⚡ Performance Improvements
  - ♻️ Code Refactoring
  - 💎 Styling & UI
  - 📚 Documentation
  - 🧪 Tests
  - 🏗️ Build System
  - 🔧 Continuous Integration
  - 🔨 Maintenance
  - ⏪ Reverts
- **🔗 Clickable commit links** for easy navigation
- **📅 Release dates** and version comparisons
- **📝 Detailed descriptions** for major releases

## 🎨 Styling Guidelines

### Tailwind CSS

- Use utility classes for styling
- Follow mobile-first responsive design
- Utilize CSS variables from shadcn/ui theme

### shadcn/ui Components

- Prefer shadcn components over custom implementations
- Use component variants and sizes appropriately
- Maintain consistency with design system

### Space Theme

- Dark backgrounds with cosmic colors
- Subtle animations and transitions
- Modern typography with Geist fonts
- Responsive design for all devices

## 🔍 Debugging

### VS Code Debugging

Pre-configured debug configurations:

1. **Next.js: debug server-side** - Debug server-side code
2. **Next.js: debug client-side** - Debug in Chrome
3. **Next.js: debug full stack** - Debug both server and client

### Browser DevTools

- React Developer Tools for component inspection
- Network tab for API call debugging
- Console for error tracking and logging

## 📁 Project Structure

```
space-portfolio/
├── .vscode/                 # VS Code configuration
├── .husky/                  # Git hooks
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   └── ui/              # shadcn/ui components
│   ├── lib/                 # Utility functions
│   └── hooks/               # Custom React hooks
├── .copilot-instructions.md # AI coding guidelines
├── .prettierrc              # Prettier configuration
├── eslint.config.mjs        # ESLint configuration
├── commitlint.config.js     # Commit message linting
└── package.json             # Dependencies and scripts
```

## 🚨 Troubleshooting

### Common Issues

1. **ESLint errors on save**
   - Ensure ESLint extension is installed
   - Check VS Code settings for auto-fix on save

2. **Prettier not formatting**
   - Verify Prettier is set as default formatter
   - Check file associations in VS Code settings

3. **Commit message rejected**
   - Follow conventional commit format
   - Use appropriate commit type and description

4. **Type errors**
   - Run `npm run type-check` to see all TypeScript errors
   - Ensure proper type definitions for dependencies

### Getting Help

- Check the project README for updates
- Review VS Code problems panel for issues
- Use GitHub Copilot for code suggestions and help
