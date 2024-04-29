import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/scss/_variables.scss";
        @import "./src/scss/_mixins.scss";
        `,
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      dts: true,
      include: [
        /.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /.vue$/,
        /.vue?vue/, // .vue
        /.md$/, // .md
      ],
      imports: ['vue', 'vue-router'],
    }),
    Components({
      dts: true,
    }),
  ],
});
