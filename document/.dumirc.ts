import { defineConfig } from 'dumi';
import { nav } from './config/config';

export default defineConfig({
  themeConfig: {
    name: 'umi-plugin-extensions',
    nav,
  },
  base: '/',
  publicPath: '/',
  mfsu: false,
});
