# Cook With AI

An AI-powered recipe generator built with React Native and Expo. Tell the app what ingredients you have, and it suggests recipes ranked by ingredient match — powered by Google Gemini with Grok as fallback.

## Features

- **AI Recipe Generation** — dual provider (Gemini primary, Grok fallback) with structured JSON output
- **Ingredient Match Scoring** — each recipe shows what % of your ingredients it uses
- **Missing Ingredient Detection** — highlights what you're missing, suggests substitutions
- **Chef Tips** — optional pro tips for each recipe
- **Step-by-Step Instructions** — numbered cooking steps with ingredient amounts
- **Difficulty & Time** — recipes tagged with difficulty level and cooking duration

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Expo SDK 54, React Native 0.81, TypeScript |
| Navigation | expo-router v6 (file-based tabs) |
| Backend | Express 5, Vercel serverless |
| AI | Google Gemini (primary), Grok/x.ai (fallback) |
| Validation | Zod schemas on server |

## Project Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home — ingredient input
│   │   └── recipes.tsx        # AI-generated recipes list
│   └── recipe/[id].tsx        # Recipe detail view
├── components/
│   ├── IngredientInput.tsx    # Text input + add button
│   ├── IngredientChip.tsx     # Removable ingredient pill
│   ├── RecipeCard.tsx         # Recipe preview card
│   └── RecipeIngredient.tsx   # Ingredient row (available/missing)
├── contexts/
│   └── RecipeContext.tsx       # Global state management
├── services/
│   └── recipeService.ts       # API client
├── server/
│   └── src/
│       ├── app.ts             # Express setup
│       ├── routes/            # API routes
│       ├── controller/        # Request handlers
│       └── services/
│           ├── ai.service.ts  # Gemini + Grok dual provider
│           ├── prompts.ts     # AI prompt engineering
│           └── validators.ts  # Zod response validation
└── types/recipe.ts            # TypeScript interfaces
```

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g eas-cli`)
- Google Gemini API key (or Grok API key)

### Setup

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your API keys to .env

# Start dev server
npm start
```

### Environment Variables

```env
EXPO_PUBLIC_API_URL=https://your-vercel-url.vercel.app/
```

## Deployment

### Backend (Vercel)

```bash
cd server
vercel --prod
```

Set `GEMINI_API_KEY` and `GROK_API_KEY` in Vercel dashboard.

### Frontend (APK via EAS)

```bash
eas build --platform android --profile preview
```

Download the APK from the build link when complete.

## How It Works

1. User adds ingredients on the home screen
2. App sends ingredients to backend API
3. Backend calls Gemini API with structured prompt
4. AI returns 1-5 recipes as JSON (validated with Zod)
5. Recipes ranked by match %, missing count, difficulty, speed
6. User taps a recipe to see full details — ingredients, steps, substitutions, chef tips

## License

ISC
