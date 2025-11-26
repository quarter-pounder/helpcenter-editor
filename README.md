# Help Center Editor

A simple help center content editor built with SvelteKit, featuring a markdown editor powered by carta-md.

## Overview

A help center content editor application with the following features:

- **Rich text editing** with markdown support via carta-md
- **Category management** for organizing guides
- **Guide creation and editing** with full markdown support
- **Dark mode** support
- **Responsive design** with Tailwind CSS

## Configuration

The application connects to a backend API. Configure the API endpoint and editor key via environment variables:

- `PUBLIC_API_URL` - Backend API URL (defaults to `http://localhost:8000`)
- `PUBLIC_EDITOR_KEY` - Editor authentication key

These can be set in a `.env` file or as environment variables.

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
│   ├── api/           # API client functions
│   ├── components/    # Reusable UI components
│   ├── stores/        # State management
│   ├── theme/         # CSS theme files
│   └── types/         # TypeScript type definitions (domain, DTOs, mappers)
└── routes/            # SvelteKit routes
```


