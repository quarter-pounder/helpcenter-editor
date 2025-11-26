# Help Center Editor

A simple help center content editor built with SvelteKit, featuring a markdown editor powered by carta-md.

## Overview

This is a sample/demo application showcasing a help center editor interface. The application includes:

- **Rich text editing** with markdown support via carta-md
- **Category management** for organizing guides
- **Guide creation and editing** with full markdown support
- **Dark mode** support
- **Responsive design** with Tailwind CSS

## Important Note

**The APIs and types in this project are legitimate and production-ready, tied to an actual backend**, but they are **not currently wired up** because this is a sample application. Instead, the application uses in-memory dummy data (`src/lib/stores/dummy-data.ts`) for demonstration purposes.

## Tech Stack

- **SvelteKit** - Full-stack framework
- **Svelte 5** - UI framework with runes
- **carta-md** - Markdown editor with syntax highlighting
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- pnpm >= 9.0.0

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Visit `http://localhost:5173` to see the application.

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
src/
├── lib/
│   ├── api/           # API client functions (ready to use, not wired up)
│   ├── components/    # Reusable UI components
│   ├── stores/        # State management (includes dummy-data.ts)
│   ├── theme/         # CSS theme files
│   └── types/         # TypeScript type definitions (domain, DTOs, mappers)
└── routes/            # SvelteKit routes
```

