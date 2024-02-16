import {rollupPluginHTML as html} from '@web/rollup-plugin-html'
import esbuild from 'rollup-plugin-esbuild'
import {nodeResolve} from '@rollup/plugin-node-resolve'

export default {
  input: 'index.html',
  output: {dir: 'dist'},
  plugins: [nodeResolve(), esbuild({ target: 'es2022' }), html({input: 'index.html'})],
}
