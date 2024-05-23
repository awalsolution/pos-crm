import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@src': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: '../laravel-apps/awal-hr-admin-dashboard'
    }
  };
});
