# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Vue 3 weather application that fetches weather data from OpenWeatherMap API. Users select a city and country to retrieve current weather conditions.

## Development Commands

- **Start dev server**: `npm run dev`
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`

## Architecture

### MVVM Pattern

The app follows a Model-View-ViewModel architecture:

- **Models** (`src/models/`): Data classes with static factory methods
  - `Country`: Simple data model with `code` and `name` properties
  - `CurrentCoordinate`: Geocoding result with `fromApi()` static factory
  - `CurrentWeather`: Weather data with `fromApi()` static factory
  - Models use different factory patterns: `fromJSON()` for local data, `fromApi()` for external APIs

- **Views** (`src/components/`, `src/App.vue`): Vue 3 SFC components
  - All components use `<script setup>` composition API syntax
  - Form component uses v-model for two-way binding with parent formData
  - Alert component is a simple slot-based presentational component

- **ViewModels** (`src/viewmodels/`): Business logic composables
  - `useWeatherMapViewModel`: Orchestrates the two-step weather fetch process
  - Returns reactive state (formData, loading, errors) and actions (fetchWeather)
  - Coordinates between validation, async execution, and service calls

### Data Flow

The weather lookup is a two-step API process:

1. User submits form (city + country) → `fetchWeather()` in ViewModel
2. Validation via `useValidation().validateRequired()`
3. **Step 1**: `weatherMapService.getCoordsByCity()` → geocoding API → `CurrentCoordinate` with lat/lon
4. **Step 2**: `weatherMapService.getCurrentWeatherData(lat, lon)` → weather API → `CurrentWeather`
5. Both API calls wrapped in `useAsync().execute()` for loading/error state
6. Weather data available to View (currently only logged to console)

### Service Layer

`src/services/weatherMapService.js` handles all API interactions:
- Uses axios for HTTP requests
- Singleton instance exported as `weatherMapService`
- All API URLs built via `buildApiUrl()` helper from `src/constants/api.js`

### Composables (Reusable Logic)

Located in `src/composables/utilities/`:

- **`useAsync()`**: Generic async operation wrapper
  - Provides `loading` ref, `error` ref, and `execute()` function
  - `execute()` takes an async function, manages loading state, catches errors
  - Returns the result of the async function (or undefined on error)

- **`useValidation()`**: Form validation utilities
  - Provides `errors` reactive object and `hasErrors` computed
  - `validateRequired()`: Checks all form fields are non-empty
  - `setError()` / `clearErrors()`: Manual error management

### API Configuration

API setup in `src/constants/api.js`:
- **Environment variable required**: `VITE_API_WEATHERMAP` (OpenWeatherMap API key)
- Base URL: `http://api.openweathermap.org`
- Endpoints:
  - Geocoding: `/geo/1.0/direct` (city name → coordinates)
  - Current weather: `/data/2.5/weather` (coordinates → weather data)
- Helper: `buildApiUrl(endpoint, params)` constructs full URLs with query params

### Constants

- `src/constants/countries.js`: Array of `Country` instances for supported countries
- Currently includes: US, Mexico, Argentina, Colombia, Costa Rica, Spain, Peru

## Environment Setup

Create `.env.local` in project root:
```
VITE_API_WEATHERMAP=your_openweathermap_api_key
```

Get API key from: https://openweathermap.org/api

## Important Implementation Notes

### Current State
- Weather data is fetched successfully but only logged to console (src/viewmodels/useWeatherMapViewModel.js:41)
- No UI currently displays the weather results - this is incomplete functionality

### Known Bugs
- **Critical**: `CurrentWeather` constructor doesn't assign parameters to `this.*` properties (src/models/CurrentWeather.js:2-3)
  - Constructor receives 8 parameters but doesn't assign them
  - `toJSON()` method references undefined properties

- **Critical**: `useWeatherMapViewModel.js:37-39` - Missing `return` before `await execute()`
  - Second API call result is lost, not stored in `currentWeather` ref
  - This prevents weather data from being accessible to the view
