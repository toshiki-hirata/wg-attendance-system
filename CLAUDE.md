# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + TypeScript attendance management system (勤怠管理アプリ) with time tracking and overtime management features.

## Commands

### Development
```bash
# Start mock server (required for API calls)
cd mock-server && npm run dev

# In a separate terminal, start the frontend
npm run dev  # Note: Currently has issues - use 'npx vite' instead

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
npm run lint:fix
```

### Known Issues
- `npm run dev` script references non-existent `npm run mock-server` command
- Missing `concurrently` dependency
- Mock server and frontend must be started separately

## Architecture

### State Management with Pinia
- All stores use session storage persistence via `pinia-plugin-persistedstate`
- Stores are namespaced: `attendance.loading`, `attendance.sidenav`, etc.
- Key stores:
  - `attendance.store.ts`: Manages attendance history and punch actions
  - `overTime.store.ts`: Manages overtime applications with month filtering
  - `loading.store.ts`: Global loading state
  - `sidenav.store.ts`: Navigation state

### API Integration Pattern
```typescript
// Centralized Axios instance: /src/api/axios.ts
// Repository pattern: /src/repositories/overTime.repository.ts
// Base URL: http://localhost:3000
```

### Component Conventions
- Components: `*.component.vue` naming
- Pages: `*Page.vue` naming
- All components use `<script setup>` with TypeScript
- Model binding uses `defineModel` for two-way data binding
- Props are strictly typed with TypeScript interfaces

### Mock API Endpoints
- `GET /attendances/history` - Fetch attendance records
- `POST /attendances` - Submit attendance action
- `GET /overtime/fetch` - Get overtime applications

### Important Patterns
1. **Date Handling**: Custom formatters in `/src/utils/dateFormatter.ts` handle JST timezone
2. **Form Validation**: VeeValidate is used for form handling (see `overTimeInputDialog.component.vue`)
3. **Japanese UI**: All user-facing text is in Japanese
4. **Import Paths**: Use absolute imports from root (e.g., `/src/components/...`)
5. **Button States**: Components use enums for state management (e.g., `BUTTON_CONDITION`)