/**
 * Environment configuration
 * Access to all environment variables should go through this file
 */

export const env = {
  // General
  NODE_ENV: import.meta.env.MODE || 'development',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // Application
  appTitle: import.meta.env.VITE_APP_TITLE as string,
  
  // API
  apiUrl: import.meta.env.VITE_API_URL as string,
  graphqlUrl: import.meta.env.VITE_GRAPHQL_URL as string,
  
  // Return variable with fallback
  get: (key: string, fallback: string = ''): string => {
    return (import.meta.env[`VITE_${key}`] as string) || fallback;
  }
};

export default env;
