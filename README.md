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

The server will start on **http://localhost:3000**

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

## API Endpoints

| Method | Endpoint         | Description                                       |
|--------|------------------|---------------------------------------------------|
| GET    | `/`              | API status, message, and list of endpoints        |
| GET    | `/status`        | Health check with current timestamp               |
| GET    | `/products`      | Paginated list of all products                    |
| POST   | `/products`      | Add a new product                                 |
| GET    | `/products/:id`  | Get a single product by ID                        |
| GET    | `/search?=term`  | Fuzzy search for products by name                 |

### `GET /products`

Query params: `page` (default `1`), `limit` (default `10`).

```
GET localhost:3000/products?page=1&limit=10
```
```
curl "localhost:3000/products?page=1&limit=10"
```

### `POST /products`

Body (JSON):

```json
{
  "name": "Test Product",
  "category": "Test",
  "description": "A test description",
  "price": 10,
  "imageUrl": "http://example.com/image.png"
}
```

Or use the test-post.html file in the browser to add (before frontend is added).

All fields are required; `price` must be a non-negative number.

### `GET /products/:id`

```
GET localhost:3000/products/1
```

Returns `404` if no product matches the given ID.

### `GET /search`

Fuzzy search by product name using Damerau-Levenshtein distance, so small typos or
approximate spellings still return relevant matches. Query params: `term` (required),
`page` (default `1`), `limit` (default `10`).

```
GET localhost:3000/search?term=billi&page=1&limit=10
```
```
curl "localhost:3000/search?term=billi"
```

## Testing POST requests manually

`test-post.html` is a small standalone page with a form for sending `POST /products`
requests without a separate frontend. Open it directly in a browser while the server
is running.

## Configuration

The server runs on port `3000` by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=5000 npm run dev
```

## License

ISC
