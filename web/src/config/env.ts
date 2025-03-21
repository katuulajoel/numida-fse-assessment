/**
 * Environment configuration
 * Access to all environment variables should go through this file
 */

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  appTitle: process.env.VITE_APP_TITLE || 'Default App Title',
  apiUrl: process.env.VITE_API_URL || 'http://localhost:3000',
  graphqlUrl: process.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql',
  get: (key: string, fallback: string = ''): string => {
    return process.env[`VITE_${key}`] || fallback;
  },
};

export default env;
