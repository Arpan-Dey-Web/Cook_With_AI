                         COOK WITH AI
                              │
                              ▼
                     ┌─────────────────┐
                     │   Home Screen   │
                     │    index.tsx    │
                     └────────┬────────┘
                              │
                              │ User enters
                              │ ingredients
                              ▼
                     ┌─────────────────┐
                     │   Ingredients   │
                     │   User Input    │
                     │                 │
                     │    Chicken      │
                     │      Egg        │
                     │      Rice       │
                     │     Onion       │
                     └────────┬────────┘
                              │
                              │ POST /api/recipes/generate
                              ▼
                     ┌─────────────────┐
                     │ recipeService   │
                     │     API         │
                     │  React Native   │
                     └────────┬────────┘
                              │
                              │ HTTP Request
                              ▼
                     ┌─────────────────┐
                     │    Backend      │
                     │ Node + Express  │
                     └────────┬────────┘
                              │
                     Generate Recipes
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
       ┌─────────────────┐         ┌─────────────────┐
       │    Gemini AI    │         │     Groq API    │
       │    PRIMARY      │         │    SECONDARY    │
       │                 │         │                 │
       │ Try first       │         │ Fallback        │
       └────────┬────────┘         └────────┬────────┘
                │                           │
                │ Success                   │ If Gemini fails
                └─────────────┬─────────────┘
                              ▼
                     ┌─────────────────┐
                     │   Recipe JSON   │
                     │                 │
                     │ recipes[]       │
                     │ title           │
                     │ description     │
                     │ match           │
                     │ ingredients     │
                     │ missing         │
                     │ instructions    │
                     └────────┬────────┘
                              │
                              │ JSON Response
                              ▼
                     ┌─────────────────┐
                     │  Expo Frontend  │
                     │                 │
                     │ recipes.tsx     │
                     └────────┬────────┘
                              │
                              │ User selects recipe
                              ▼
                     ┌─────────────────┐
                     │ Recipe Details  │
                     │    [id].tsx     │
                     └─────────────────┘