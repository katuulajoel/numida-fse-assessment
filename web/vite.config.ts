import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (e.g., development, production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env': {
        NODE_ENV: env.NODE_ENV,
        VITE_APP_TITLE: env.VITE_APP_TITLE,
        VITE_API_URL: env.VITE_API_URL,
        VITE_GRAPHQL_URL: env.VITE_GRAPHQL_URL,
      },
    },
  };
});
