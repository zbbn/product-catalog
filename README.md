# Product Catalog

A Node.js/Express product catalog application built with TypeScript.

## Prerequisites

- Node.js (v16 or higher)
- npm

## Installation

Install the project dependencies:

```bash
npm install
```

## Running the Server

### Development Mode

To run the server in development mode with hot-reloading:

```bash
npm run dev
```

The server will start on **http://localhost:3000**

### Production Mode

To run the server in production mode:

```bash
npm start
```

## Project Structure

```
product-catalog/
├── backend/
│   └── src/
│       └── data/
│           └── mockProducts.ts         # List of IKEA products to load into memory
│           └── productStorage.ts       # Add IKEA products + functions to get, add, count and search
│       └── routes/
│           └── products.ts             # API Methods 
│       └── search/
│           └── damerauLevenshtein.ts   # Fuzzy search algorithm
│       └── server.ts                   # Express server entry point
│       └── types.ts                    # Interface with product types      
├── package.json            # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```



## Available Scripts

- `npm run dev` - Start the development server with ts-node
- `npm start` - Start the server with Node.js

## How to use

- `localhost:$PORT` - See status, message, and endpoints of the API
- `localhost:$PORT/products` - See all products/post products
- `localhost:$PORT/products/$id` - See specific product based on id
- `localhost:$PORT/search?=term` - Search for a specific productname

## Configuration

The server runs on port `3000` by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=5000 npm run dev
```

## License

ISC
