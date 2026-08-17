# Cook With AI

## Product Requirements Document (PRD)

**Version:** 1.0
**Project Type:** First React Native + Expo project
**Target Development Time:** 3–4 days
**Platform:** Android first, iOS-compatible architecture
**Framework:** React Native with Expo SDK 54
**Routing:** Expo Router
**Language:** TypeScript
**Product Type:** AI-powered recipe recommendation app

---

# 1. Product Overview

## 1.1 Product Name

**Cook With AI**

## 1.2 Tagline

> **Tell us what you have. We'll tell you what to cook.**

## 1.3 Product Vision

Cook With AI helps users decide what to cook based only on the ingredients they currently have.

Instead of searching through hundreds of recipes and checking whether they have the required ingredients, users simply provide their available ingredients.

The AI analyses those ingredients and recommends recipes that can be prepared using them.

---

# 2. Problem Statement

People often have ingredients available at home but do not know what meals they can prepare with them.

For example, a user may have:

```text
Chicken
Egg
Onion
Garlic
Rice
```

But they may not know what they can cook.

The app solves this problem by converting:

```text
Available Ingredients
        ↓
       AI
        ↓
Possible Recipes
        ↓
Detailed Cooking Instructions
```

---

# 3. Target Users

The MVP targets:

- Students
- Beginners who do not know what to cook
- People cooking with limited ingredients
- Busy users who want quick meal ideas
- Anyone who wants to reduce food waste

---

# 4. MVP Goal

The MVP must allow a user to:

1. Open the application.
2. Enter ingredients they currently have.
3. Submit the ingredients.
4. Send those ingredients to an AI service.
5. Receive several recipe recommendations.
6. View recipe details.
7. See which ingredients are available and which are missing.
8. Follow step-by-step cooking instructions.

The user should be able to complete the entire process without authentication.

---

# 5. Development Philosophy

Because this is your first Expo project and the target is only 3–4 days, the application must remain intentionally small.

## Build

```text
Ingredient input
        ↓
AI recipe generation
        ↓
Recipe list
        ↓
Recipe details
```

## Do NOT build in MVP

Do not add:

- Authentication
- User profiles
- Social features
- Comments
- Reviews
- Complex meal planning
- Grocery delivery
- Payment
- Push notifications
- Admin dashboard
- Recipe community
- Advanced nutrition tracking
- Complex database
- Offline AI
- Image recognition of ingredients

These can become future versions.

---

# 6. Core User Flow

The main user journey should be:

```text
Launch App
    ↓
Home Screen
    ↓
Enter Ingredients
    ↓
Add Ingredients
    ↓
Review Ingredients
    ↓
Tap "Find Recipes"
    ↓
Loading / AI Processing
    ↓
Recipe Results
    ↓
Select Recipe
    ↓
Recipe Details
    ↓
Cook
```

---

# 7. Application Screens

The MVP should contain four primary screens.

```text
1. Home
2. Recipe Results
3. Recipe Details
4. Settings / About
```

The first three are mandatory.

Settings/About can remain very simple.

---

# 8. Screen 1 — Home

## Purpose

The Home screen is the starting point of the application.

It should immediately explain what the application does.

## UI Structure

```text
┌──────────────────────────────┐
│          🍳                  │
│      Cook With AI            │
│                              │
│  Tell us what you have.      │
│  We'll tell you what to cook.│
│                              │
│  What ingredients do you     │
│  have?                       │
│                              │
│  ┌────────────────────────┐  │
│  │ e.g. chicken, egg...   │  │
│  └────────────────────────┘  │
│                              │
│       + Add Ingredient       │
│                              │
│  Your ingredients            │
│  [Chicken] [Egg] [Onion]    │
│  [Garlic]                    │
│                              │
│  ┌────────────────────────┐  │
│  │     Find Recipes 🍳    │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

## Required Elements

### App Branding

Display:

**Cook With AI**

And:

**Tell us what you have. We'll tell you what to cook.**

### Ingredient Input

User should be able to type one ingredient.

Example:

```text
Chicken
```

### Add Ingredient

When the user taps **Add Ingredient**, the ingredient should appear as a chip/tag.

Example:

```text
[Chicken ×]
[Egg ×]
[Onion ×]
```

### Ingredient Validation

Do not allow:

- Empty ingredient
- Only spaces
- Duplicate ingredient

Example:

```text
Chicken
Chicken
```

should only create one `Chicken` chip.

### Find Recipes Button

The button should be disabled when:

```text
ingredients.length === 0
```

The button becomes active when at least one ingredient exists.

---

# 9. Ingredient Input Behavior

There should be two possible ways to enter ingredients.

## Method 1 — One by one

User enters:

```text
Chicken
```

Tap:

```text
+ Add Ingredient
```

Then:

```text
[Chicken]
```

## Method 2 — Comma-separated input

Allow:

```text
Chicken, Egg, Onion, Garlic
```

The application can parse this into:

```text
[Chicken]
[Egg]
[Onion]
[Garlic]
```

This is useful because it makes the app faster to use.

---

# 10. Home Screen Empty State

Before the user enters ingredients:

```text
What do you have in your kitchen?

Add at least one ingredient to discover
what you can cook.
```

---

# 11. Home Screen Example

Example input:

```text
Chicken
Egg
Rice
Onion
Garlic
```

The screen should show:

```text
Your ingredients

[Chicken ×]
[Egg ×]
[Rice ×]
[Onion ×]
[Garlic ×]
```

Then:

```text
        Find Recipes
```

---

# 12. Screen 2 — Recipe Results

## Purpose

Display AI-generated recipes based on the user's ingredients.

Example:

```text
Recipe Ideas

Based on:
Chicken • Egg • Rice • Onion • Garlic


┌─────────────────────────────┐
│ Chicken Fried Rice          │
│                             │
│ 90% ingredients available   │
│ ⏱ 20 min    Easy            │
│                             │
│ Chicken, rice, egg...       │
│                             │
│ View Recipe →               │
└─────────────────────────────┘


┌─────────────────────────────┐
│ Garlic Chicken Rice         │
│                             │
│ 80% ingredients available   │
│ ⏱ 30 min    Medium          │
│                             │
│ View Recipe →               │
└─────────────────────────────┘
```

---

# 13. Recipe Result Requirements

Each recipe card must display:

- Recipe name
- Short description
- Match percentage
- Cooking time
- Difficulty
- Number of servings
- View Recipe action

Example:

```text
Chicken Fried Rice

90% Match

⏱ 20 minutes
Difficulty: Easy
Serves: 2

A quick fried rice using chicken,
egg and the ingredients you already have.
```

---

# 14. Match Percentage

The AI should return a percentage representing how well the user's ingredients match the recipe.

Example:

```text
Available:
Chicken
Rice
Egg
Onion

Recipe requires:
Chicken
Rice
Egg
Onion
Garlic

Match:
80%
```

The percentage does not have to represent strict mathematical accuracy in the MVP.

The backend should calculate it consistently using:

```text
available required ingredients
------------------------------
total required ingredients
```

Example:

```text
4 / 5 = 80%
```

---

# 15. Missing Ingredient Display

If the recipe requires ingredients the user does not have:

```text
Missing Ingredients

• Garlic
• Soy Sauce
```

The user should immediately understand what they need to buy.

---

# 16. Screen 3 — Recipe Details

## Purpose

Show everything the user needs to cook the selected recipe.

Structure:

```text
Chicken Fried Rice

20 minutes
Easy
Serves 2

────────────────────

Ingredients

✓ Chicken
✓ Rice
✓ Egg
✓ Onion

⚠ Garlic
⚠ Soy Sauce

────────────────────

Instructions

1. Heat oil in a pan.
2. Add onion and garlic.
3. Add chicken and cook thoroughly.
4. Add rice.
5. Add egg and mix well.
6. Add soy sauce and seasonings.
7. Cook for another 2–3 minutes.

────────────────────

Chef Tip

Use cold cooked rice for better
fried rice texture.
```

---

# 17. Recipe Detail Requirements

Each recipe must contain:

### Basic Information

```text
name
description
cookingTime
difficulty
servings
```

### Ingredients

Each ingredient should contain:

```text
name
quantity
available
optional
```

Example:

```text
{
  "name": "Chicken",
  "quantity": "250g",
  "available": true
}
```

### Instructions

The AI must return ordered instructions.

Example:

```text
[
  "Heat oil in a pan.",
  "Add onion and garlic.",
  "Add chicken..."
]
```

The UI should render them as numbered steps.

---

# 18. Ingredient Substitution

This feature should be included because it gives the AI integration more value without significantly increasing development complexity.

Example:

```text
Missing ingredient:
Butter

Possible substitute:
Cooking oil
```

Another example:

```text
Missing:
Soy sauce

Alternative:
Salt + a small amount of vinegar
```

The AI should only recommend reasonable substitutions.

---

# 19. AI Responsibilities

The AI should:

1. Analyse the user's ingredients.
2. Generate realistic recipes.
3. Avoid recipes that require many unavailable ingredients.
4. Clearly identify missing ingredients.
5. Generate cooking instructions.
6. Provide cooking time.
7. Provide difficulty.
8. Provide servings.
9. Provide substitutions when useful.
10. Return structured JSON.

---

# 20. AI Output Rules

The AI must NOT return normal conversational text.

Bad:

```text
Sure! You can make fried rice...
```

Good:

```json
{
  "recipes": [...]
}
```

This is important because the mobile application needs predictable data.

---

# 21. Recommended AI Response Structure

```json
{
  "recipes": [
    {
      "id": "recipe-1",
      "name": "Chicken Fried Rice",
      "description": "A quick fried rice made with chicken, egg and rice.",
      "matchPercentage": 90,
      "cookingTime": 20,
      "difficulty": "Easy",
      "servings": 2,
      "ingredients": [
        {
          "name": "Chicken",
          "quantity": "250g",
          "available": true,
          "optional": false
        },
        {
          "name": "Rice",
          "quantity": "2 cups",
          "available": true,
          "optional": false
        },
        {
          "name": "Garlic",
          "quantity": "2 cloves",
          "available": false,
          "optional": false
        }
      ],
      "instructions": [
        "Heat oil in a pan.",
        "Add onion and garlic.",
        "Add chicken and cook thoroughly.",
        "Add rice and egg.",
        "Season and stir-fry for 3 minutes."
      ],
      "substitutions": [
        {
          "missingIngredient": "Soy sauce",
          "alternative": "Salt and a small amount of vinegar"
        }
      ],
      "chefTip": "Cold cooked rice gives better texture."
    }
  ]
}
```

---

# 22. Number of Recipes

For the MVP, generate:

```text
3–5 recipes
```

Do not generate 10–20 recipes.

Too many recipes will make the experience slower and cluttered.

Recommended:

```text
3 recipes minimum
5 recipes maximum
```

---

# 23. Recipe Ranking

Recipes should be ordered approximately like this:

```text
1. Highest ingredient match
2. Fewer missing ingredients
3. Easier recipes
4. Faster recipes
```

Example:

```text
Chicken Fried Rice
95% match

Chicken Curry
80% match

Chicken Pasta
60% match
```

---

# 24. AI Prompt Requirements

The backend should send a controlled system prompt to the AI.

The AI should be instructed:

```text
You are a cooking assistant.

The user will provide ingredients that they currently have.

Generate 3 to 5 realistic recipes that can be prepared primarily
using those ingredients.

Prefer recipes requiring the fewest additional ingredients.

Clearly identify:
- required ingredients
- available ingredients
- missing ingredients
- cooking time
- difficulty
- servings
- instructions
- useful substitutions

Do not invent ingredients as available.

Return only valid JSON matching the required schema.

Do not return markdown.
Do not return conversational text.
```

Then provide:

```text
User ingredients:
Chicken
Egg
Rice
Onion
Garlic
```

---

# 25. Important AI Safety / Quality Rule

The AI should not assume that the user has common ingredients unless your product explicitly decides to allow pantry basics.

For example, avoid automatically assuming:

```text
salt
pepper
oil
water
```

are available.

For the MVP, use this rule:

**Only ingredients explicitly entered by the user are considered available.**

This makes the match percentage more trustworthy.

You can later add:

```text
Common pantry ingredients available
```

as an optional setting.

---

# 26. Backend Architecture

Do NOT put the AI API key directly inside the Expo application.

Correct architecture:

```text
React Native / Expo
        │
        │ HTTPS
        ▼
Backend API
        │
        │ API key
        ▼
AI Provider
        │
        ▼
Structured Recipe JSON
        │
        ▼
Backend
        │
        ▼
Expo App
```

The API key stays on the server.

---

# 27. Suggested Backend

Because you already understand JavaScript/TypeScript and Express, use:

```text
Node.js
Express
TypeScript
```

Keep the backend extremely small.

You only need one major endpoint.

```text
POST /api/recipes/generate
```

---

# 28. API Request

Endpoint:

```http
POST /api/recipes/generate
```

Request body:

```json
{
  "ingredients": ["chicken", "egg", "rice", "onion", "garlic"]
}
```

---

# 29. API Validation

Backend should validate:

```text
ingredients exists
ingredients is an array
array is not empty
maximum number of ingredients = 30
each ingredient is a non-empty string
```

Example:

```text
Minimum:
1 ingredient

Maximum:
30 ingredients
```

This prevents accidental or abusive requests.

---

# 30. API Response

Success:

```json
{
  "success": true,
  "data": {
    "recipes": [...]
  }
}
```

Error:

```json
{
  "success": false,
  "message": "Unable to generate recipes."
}
```

---

# 31. Error Handling

The app must handle:

### Empty input

```text
Please add at least one ingredient.
```

### Network error

```text
We couldn't connect to the recipe service.

Please check your internet connection
and try again.
```

### AI error

```text
We couldn't generate recipes right now.

Please try again.
```

### Invalid AI response

Backend should validate the AI response before sending it to the mobile app.

Never blindly trust AI-generated JSON.

---

# 32. Loading State

When user taps:

```text
Find Recipes
```

show:

```text
Finding recipes...

AI is checking what you can cook.
```

Use:

- Loading spinner
- Disabled submit button
- Optional animated cooking icon

Do not let the user repeatedly submit requests.

---

# 33. No Results State

Although the AI should normally generate results, handle this case.

Example:

```text
No good recipes found.

Try adding a few more ingredients
to get better suggestions.
```

Button:

```text
← Add More Ingredients
```

---

# 34. Navigation

Use Expo Router.

Recommended structure:

```text
app/
├── _layout.tsx
├── index.tsx
├── recipes.tsx
├── recipe/
│   └── [id].tsx
└── settings.tsx
```

Expo Router uses file-based routing, and the SDK 54 documentation specifically lists Expo Router as the routing solution for SDK 54.

Navigation:

```text
index.tsx
   ↓
recipes.tsx
   ↓
recipe/[id].tsx
```

---

# 35. Recommended Project Structure

```text
cook-with-ai/
│
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── recipes.tsx
│   ├── recipe/
│   │   └── [id].tsx
│   └── settings.tsx
│
├── components/
│   ├── IngredientInput.tsx
│   ├── IngredientChip.tsx
│   ├── RecipeCard.tsx
│   ├── RecipeIngredient.tsx
│   ├── LoadingState.tsx
│   └── EmptyState.tsx
│
├── services/
│   └── recipeService.ts
│
├── types/
│   └── recipe.ts
│
├── constants/
│   └── theme.ts
│
├── hooks/
│   └── useRecipes.ts
│
├── utils/
│   └── ingredients.ts
│
├── assets/
│
├── .env
├── app.json
├── package.json
└── tsconfig.json
```

---

# 36. Data Types

Create a central TypeScript type.

```ts
export interface RecipeIngredient {
  name: string;
  quantity: string;
  available: boolean;
  optional: boolean;
}

export interface RecipeSubstitution {
  missingIngredient: string;
  alternative: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  matchPercentage: number;
  cookingTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  substitutions: RecipeSubstitution[];
  chefTip?: string;
}
```

---

# 37. State Management

Do not introduce Redux for this project.

The application is too small to justify it.

Use:

```text
useState
useContext if necessary
```

For server/API state, a simple service function is enough.

Example:

```text
generateRecipes(ingredients)
```

No need to over-engineer the project.

---

# 38. Styling

You can use:

```text
React Native StyleSheet
```

or:

```text
NativeWind
```

For your first Expo project, I recommend keeping the styling system simple.

Priority:

```text
Clean UI
Consistent spacing
Readable typography
Good cards
Clear buttons
Good loading state
```

Do not spend half the project trying to build an advanced design system.

---

# 39. Suggested Design Direction

The visual identity should feel:

```text
Fresh
Warm
Friendly
Modern
Minimal
Food-focused
```

Recommended design hierarchy:

```text
App logo
↓
Large heading
↓
Helpful description
↓
Ingredient input
↓
Ingredient chips
↓
Primary CTA
```

Recipe cards should feel visually appetizing but remain lightweight.

---

# 40. Color Strategy

Use a small design system instead of randomly choosing colors.

Define:

```text
primary
background
surface
text
mutedText
border
success
warning
error
```

Example conceptual palette:

```text
Primary: Warm orange
Background: Warm off-white
Surface: White
Text: Dark charcoal
Muted: Gray
Success: Green
Warning: Amber
Error: Red
```

Exact hex values can be finalized during UI implementation.

---

# 41. Typography

Use a maximum of:

```text
Display
Heading
Body
Caption
Button
```

Avoid using many font families.

---

# 42. Home Screen UX Rules

The user should understand the application within approximately 3 seconds.

The first screen must answer:

```text
What is this?
```

Answer:

```text
AI tells you what you can cook
with the ingredients you already have.
```

---

# 43. Recipe Results UX Rules

The user should not need to open every recipe to know whether it is useful.

Therefore the card must immediately show:

```text
Recipe
Match %
Time
Difficulty
Missing ingredients
```

---

# 44. Recipe Details UX Rules

The user should be able to start cooking immediately.

The detail page should prioritize:

```text
Recipe title
Time / difficulty
Ingredients
Instructions
```

The UI should not bury cooking instructions beneath unnecessary information.

---

# 45. Settings Screen

Keep this extremely small.

Display:

```text
Cook With AI

Version 1.0.0

Powered by AI

About
```

Optional:

```text
Privacy
Terms
```

Do not build account settings for MVP.

---

# 46. Persistence

Do not create a database for MVP unless required.

The basic application can work without persistent storage.

However, you may store the latest ingredients locally.

Optional:

```text
AsyncStorage
```

Example:

```text
Last ingredients:
Chicken
Egg
Rice
```

This is a nice-to-have.

---

# 47. Favorites

**Not required for MVP.**

Do not build a full favorites system.

A simple local favorite feature can be added only if everything else is already finished.

Priority remains:

```text
Ingredient → AI → Recipe → Instructions
```

---

# 48. API Service on Mobile

Create:

```text
services/recipeService.ts
```

It should contain only API-related logic.

Example responsibility:

```text
generateRecipes(ingredients)
```

The screen should NOT contain raw `fetch()` logic everywhere.

---

# 49. Environment Variables

Mobile application:

```text
EXPO_PUBLIC_API_URL
```

Backend:

```text
AI_API_KEY
```

Important:

**Never place the AI secret key in `EXPO_PUBLIC_*` variables.**

Anything exposed to the mobile bundle must be treated as public.

---

# 50. Backend Environment

Example:

```env
PORT=5000
AI_API_KEY=your-secret-key
```

The mobile app should only know:

```env
EXPO_PUBLIC_API_URL=https://your-api.com
```

---

# 51. Security Requirements

MVP security should include:

### API key protection

AI key stays on backend.

### Input limits

Maximum:

```text
30 ingredients
```

### Request validation

Reject malformed requests.

### Basic rate limiting

Recommended if the API is deployed publicly.

For example:

```text
10 requests/minute/IP
```

Exact limits can be adjusted depending on your AI provider and deployment.

---

# 52. AI Cost Control

Because AI requests may cost money, limit each request.

MVP:

```text
3–5 recipes
```

Use a controlled prompt.

Do not ask the AI to produce huge descriptions.

Keep instructions concise.

---

# 53. Performance Requirements

The app should:

- Avoid unnecessary re-renders.
- Disable submit while loading.
- Show loading immediately after submission.
- Avoid duplicate API requests.
- Use list rendering for multiple recipe cards.
- Keep recipe response reasonably small.

For 3–5 recipes, standard React Native list rendering is sufficient.

---

# 54. Accessibility

Minimum requirements:

- Buttons must have readable labels.
- Text must have sufficient contrast.
- Touch targets should be comfortable.
- Error messages should be understandable.
- Avoid relying only on color to communicate state.

---

# 55. Mobile Keyboard Behavior

On Home screen:

When the keyboard opens, the ingredient input must remain accessible.

Use:

```text
KeyboardAvoidingView
```

where appropriate.

Also allow the user to dismiss the keyboard easily.

---

# 56. Network Behavior

Before making an AI request:

```text
Check whether input exists.
```

During request:

```text
Disable button.
Show loading.
```

After success:

```text
Navigate to recipes screen.
```

After failure:

```text
Show error.
Keep ingredients intact.
Allow retry.
```

Do not erase the user's input after an API failure.

---

# 57. Empty Ingredient Handling

The app should trim whitespace.

Input:

```text
"   chicken   "
```

becomes:

```text
"chicken"
```

Duplicate matching should be case-insensitive.

Therefore:

```text
Chicken
chicken
CHICKEN
```

should be considered the same ingredient.

---

# 58. Recipe ID

The backend should provide a stable ID for each generated recipe.

Example:

```text
recipe-1
recipe-2
recipe-3
```

The frontend should use that ID to open:

```text
/recipe/recipe-1
```

For a small MVP, recipes can also be passed through local state/context if necessary, but route parameters plus stored result state should remain simple and reliable.

---

# 59. Acceptance Criteria — Home

Home screen is complete when:

- [ ] App name is visible.
- [ ] Tagline is visible.
- [ ] User can type an ingredient.
- [ ] User can add an ingredient.
- [ ] Ingredient appears as a chip.
- [ ] User can remove an ingredient.
- [ ] Duplicate ingredients are prevented.
- [ ] Empty ingredients are rejected.
- [ ] Find Recipes is disabled when no ingredients exist.
- [ ] Find Recipes starts the AI request.

---

# 60. Acceptance Criteria — AI

AI integration is complete when:

- [ ] Ingredients are sent to backend.
- [ ] Backend validates input.
- [ ] Backend calls AI provider.
- [ ] AI returns structured JSON.
- [ ] Backend validates AI response.
- [ ] Backend returns recipes to mobile.
- [ ] API failures are handled.
- [ ] Invalid AI responses are handled.

---

# 61. Acceptance Criteria — Recipe Results

- [ ] Recipes are displayed.
- [ ] 3–5 recipes can be shown.
- [ ] Recipe name is visible.
- [ ] Match percentage is visible.
- [ ] Cooking time is visible.
- [ ] Difficulty is visible.
- [ ] User can select a recipe.
- [ ] Loading state works.
- [ ] Empty/error state works.

---

# 62. Acceptance Criteria — Recipe Details

- [ ] Recipe title is visible.
- [ ] Description is visible.
- [ ] Cooking time is visible.
- [ ] Difficulty is visible.
- [ ] Servings are visible.
- [ ] Ingredients are displayed.
- [ ] Available ingredients are identifiable.
- [ ] Missing ingredients are identifiable.
- [ ] Instructions are numbered.
- [ ] Substitutions can be displayed.
- [ ] Chef tip can be displayed.

---

# 63. Testing Checklist

## Input Testing

Test:

```text
Chicken
```

Test:

```text
Chicken, Egg, Rice
```

Test:

```text
chicken, CHICKEN, Chicken
```

Test:

```text
"     "
```

Test:

```text
empty
```

Test:

```text
30 ingredients
```

Test:

```text
31 ingredients
```

---

# 64. API Testing

Test:

```text
Valid ingredients
```

```text
Empty array
```

```text
Missing ingredients field
```

```text
Invalid data type
```

```text
AI API failure
```

```text
Network timeout
```

```text
Invalid AI JSON
```

---

# 65. UI Testing

Test:

```text
Small phone
Large phone
Keyboard open
Keyboard closed
Long ingredient names
Long recipe names
Long instructions
No internet
Slow internet
```

---

# 66. Main User Journey Test

Perform this exact test before calling the MVP complete:

```text
Open App
↓
Enter Chicken
↓
Add Egg
↓
Add Rice
↓
Add Onion
↓
Tap Find Recipes
↓
Loading appears
↓
Recipes appear
↓
Select Chicken Fried Rice
↓
Recipe details appear
↓
Available ingredients are shown
↓
Missing ingredients are shown
↓
Instructions are readable
```

This complete flow must work without crashes.

---

# 67. 4-Day Development Plan

# Day 1 — Expo Foundation + UI

## Step 1

Create the Expo SDK 54 application.

SDK 54 uses React Native 0.81 and React 19.1.

Use Expo Router for navigation; its SDK 54 documentation lists the recommended SDK-compatible Router version.

## Step 2

Set up:

```text
TypeScript
Expo Router
Project folders
Theme constants
```

## Step 3

Build Home screen.

## Step 4

Build:

```text
IngredientInput
IngredientChip
```

## Step 5

Implement:

```text
Add ingredient
Remove ingredient
Duplicate prevention
Validation
```

## Step 6

Build Recipe Card UI using mock data.

Do NOT start with AI.

First make the interface work using fake recipes.

---

# Day 1 Deliverable

At the end of Day 1:

```text
Home
   ↓
Ingredients
   ↓
Mock Recipes
   ↓
Recipe Details
```

should already work.

---

# Day 2 — Backend + AI

## Step 1

Create Express backend.

## Step 2

Create:

```text
POST /api/recipes/generate
```

## Step 3

Validate incoming ingredients.

## Step 4

Create the AI system prompt.

## Step 5

Call the AI API.

## Step 6

Validate returned JSON.

## Step 7

Return normalized recipe data.

## Step 8

Test backend with Postman before connecting Expo.

---

# Day 2 Deliverable

This must work:

```text
Postman
   ↓
POST /api/recipes/generate
   ↓
AI
   ↓
Structured JSON
```

---

# Day 3 — Connect App + Complete UX

## Step 1

Replace mock recipe data with API data.

## Step 2

Implement:

```text
Loading
Success
Error
Retry
```

## Step 3

Connect:

```text
Home
→ Results
→ Details
```

## Step 4

Implement:

```text
Available ingredients
Missing ingredients
Substitutions
Chef tip
```

## Step 5

Handle long content properly.

## Step 6

Improve UI spacing, typography and cards.

---

# Day 3 Deliverable

The full real flow must work:

```text
User
 ↓
Ingredients
 ↓
Backend
 ↓
AI
 ↓
Recipes
 ↓
Recipe details
```

---

# Day 4 — Polish + Testing + Build

## Step 1

Test every user flow.

## Step 2

Fix UI issues.

## Step 3

Fix API errors.

## Step 4

Test slow network.

## Step 5

Test no network.

## Step 6

Test different ingredient combinations.

Example:

```text
Egg + Onion
```

```text
Chicken + Rice + Onion
```

```text
Tomato + Potato
```

```text
Bread + Egg + Cheese
```

## Step 7

Remove unnecessary dependencies.

## Step 8

Remove console errors.

## Step 9

Add app icon/splash branding.

## Step 10

Create final Android build.

---

# 68. Final MVP Definition

The project is considered **complete** when a user can do this:

```text
"I have chicken, egg, rice and onion."
                    ↓
             Cook With AI
                    ↓
        AI understands ingredients
                    ↓
       Suggests suitable recipes
                    ↓
       Shows match percentage
                    ↓
      Shows missing ingredients
                    ↓
      Shows cooking instructions
                    ↓
             User cooks
```

That is the core product.

---

# 69. Features for Version 2

Do not implement these now, but keep them in mind:

```text
User authentication
Favorites
Recipe history
Ingredient history
Search recipes
Diet preferences
Vegetarian mode
Allergy preferences
Calories/nutrition
Meal planning
Shopping list
Pantry management
Recipe images
Voice input
Camera ingredient recognition
Barcode scanning
Personalized recommendations
```

---

# 70. Features for Version 3

Possible advanced features:

```text
AI vision

Take a photo of your refrigerator
        ↓
AI identifies ingredients
        ↓
Automatically generates recipes
```

Also:

```text
Voice:
"I have chicken, potatoes and onions."
        ↓
AI generates recipes
```

But these are explicitly outside the first 3–4 day project.

---

# 71. Definition of Success

The project succeeds if:

### User perspective

A new user can open the app and understand what it does immediately.

### Functional perspective

The core ingredient-to-recipe flow works reliably.

### Technical perspective

The Expo application communicates correctly with a backend and AI service.

### Portfolio perspective

The project demonstrates:

```text
React Native
Expo
Expo Router
TypeScript
API integration
Backend development
AI integration
Async state handling
Form validation
Responsive mobile UI
```

This makes it a strong first Expo project without becoming too large.

---

# 72. Final Technology Stack

```text
Frontend
──────────────
React Native
Expo SDK 54
React 19.1
React Native 0.81
TypeScript
Expo Router


Backend
──────────────
Node.js
Express
TypeScript


AI
──────────────
AI API
Structured JSON output


Networking
──────────────
fetch / Axios


Storage
──────────────
No database required for MVP
Optional AsyncStorage


Development
──────────────
VS Code
Git
GitHub
Postman
Expo Go
```

Expo's SDK 54 documentation confirms the SDK targets React Native 0.81 and React 19.1, and Expo Router is documented as the file-based routing solution for the SDK.

---

# 73. The Development Rule

During these 3–4 days, follow this order:

```text
UI first
  ↓
Mock data
  ↓
Backend
  ↓
AI
  ↓
Connect API
  ↓
Error handling
  ↓
Polish
  ↓
Testing
```

Do **not** start by trying to make the AI perfect.

First make the application work with fake data.

Then replace the fake data with real AI responses.

That approach will dramatically reduce debugging complexity for your first Expo application.

---

# 74. One-Sentence Product Definition

> **Cook With AI is a mobile AI cooking assistant that takes the ingredients users already have and recommends practical recipes they can make with them.**

# 75. MVP Priority

Everything should be prioritized according to:

```text
P0 — Must Have
Ingredient input
AI recipe generation
Recipe results
Recipe details
Loading/error handling
Backend API
AI key protection


P1 — Nice to Have
Comma-separated input
Substitutions
Chef tips
Local recent ingredients
Settings/About


P2 — Future
Favorites
Authentication
History
Nutrition
Voice
Camera recognition
Meal planning
Shopping list
```

**P0 must be finished before touching P1. P1 must be finished before touching P2.**

That is the scope boundary that will keep **Cook With AI** achievable within your 3–4 day target.
