# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Numida Loan Dashboard

## Environment Setup

This project uses environment variables for configuration. Before running the application, you need to set up your environment:

1. Copy the example environment files:
   ```bash
   cp .env.example .env.development
   cp .env.example .env.production
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
