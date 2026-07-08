# Product Catalog - Frontend

A React frontend for the IKEA product catalog application built with TypeScript and Vite.

## Prerequisites

- Node.js (v16 or higher)
- npm
- Backend running on port 3000

## Installation

Install the project dependencies:

```bash
npm install
```

## Running the Server

### Development Mode

To run the frontend in development mode with HMR:

```bash
npm run dev
```

The server will start on **http://localhost:5173**

The Vite dev server proxies `/search`, `/products`, and `/status` to the backend at `localhost:3000`.

## Available Scripts

- `npm run dev` - Start the development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   └── components/
│       └── SearchBar.tsx           # Text input for product search
│       └── SearchBar.css
│       └── ProductList.tsx         # Responsive grid of product cards
│       └── ProductList.css
│       └── ProductCard.tsx         # Single product summary card
│       └── ProductCard.css
│       └── ProductDetail.tsx       # Full product view with back button
│       └── ProductDetail.css
│   └── hooks/
│       └── useDebounce.tsx         # Delays value updates to avoid spamming API
│   └── App.tsx                     # Main component, holds all state
│   └── App.css
│   └── index.css                   # Global styles, CSS variables, dark mode
│   └── main.tsx                    # React entry point
├── index.html
├── vite.config.ts                  # Vite config + API proxy setup
├── package.json
├── tsconfig.json
└── README.md                       # This file
```

## How it works

No router library - navigation is conditional rendering in `App.tsx`. If a product is selected it shows `ProductDetail`, otherwise shows search + product list.

State is just `useState` in App. Search is debounced (500ms) before hitting the API.

Types are shared with the backend via the `@product-catalog/shared` workspace package.

## Styling

Plain CSS with BEM-ish naming. IKEA colors (blue/yellow). Responsive grid. Dark mode via CSS custom properties.

## License

ISC
