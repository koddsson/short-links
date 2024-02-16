import {rollupPluginHTML as html} from '@web/rollup-plugin-html'
import esbuild from 'rollup-plugin-esbuild'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import postcss from 'postcss';

import postcssJitProps from 'postcss-jit-props';
import OpenProps from 'open-props';
import atImport from 'postcss-import';

import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default {
  input: 'index.html',
  output: {dir: 'dist'},
  plugins: [
    nodeResolve(),
    esbuild({target: 'es2022'}),
    html({
      input: 'index.html',
      transformAsset: [
        async (content, filePath) => {
          if (filePath.endsWith('.css')) {
            const from = relative(__dirname, filePath);

            const result = await (postcss([atImport(), postcssJitProps(OpenProps)])
              .process(content.toString('utf-8'), { from }))

            return result.css;
          }
        },
      ],
    }),
  ],
}
