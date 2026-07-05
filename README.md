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
│       └── server.ts       # Express server entry point
├── package.json            # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Configuration

The server runs on port `3000` by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=5000 npm run dev
```

## Available Scripts

- `npm run dev` - Start the development server with ts-node
- `npm start` - Start the server with Node.js

## License

ISC
