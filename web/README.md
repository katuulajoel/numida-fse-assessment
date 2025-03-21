# Numida Loan Dashboard

![Numida](./src/assets/logo.numida.png)

## Environment Setup

This project uses environment variables for configuration. Before running the application, you need to set up your environment:

1. Create the necessary environment files:
  ```bash
  cp .env.example .env
  cp .env.development.example .env.development
  cp .env.production.example .env.production
  ```

2. Update the `.env.development` and `.env.production` files with the appropriate values for your environment.

## Running the Application

### Development Mode
To run the application in development mode, use:
```bash
npm run dev
```
This will load the environment variables from `.env.development`.

### Production Mode
To build and preview the application in production mode, use:
```bash
npm run build
npm run preview
```
This will load the environment variables from `.env.production`.

### Running Development Server with Production Variables
If you want to run the development server with production variables, use:
```bash
npm run dev -- --mode production
```

## Building the Application
To build the application for production, use:
```bash
npm run build
```

## Testing
To run tests, use:
```bash
npm run test
```

## Linting
To lint the codebase, use:
```bash
npm run lint
```
