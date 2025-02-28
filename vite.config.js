import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import wasmNode from '@rollup/wasm-node';
// import requireTransform from "vite-plugin-require-transform";
import commonjs from 'vite-plugin-commonjs';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
    "process.browser": true
  },
  plugins: [vue(),
    // commonjs(),
    // nodePolyfills(),
  //   requireTransform({
  //   fileRegex: /.js$|.vue$/,
  // })
],
resolve: {
  alias: {
    stream: 'stream-browserify', 
    path: 'path-browserify',
  },
},
ssr: {
  noExternal: ['some-package-causing-issue'], // 这里替换成报错的依赖
},
})

