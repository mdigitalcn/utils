import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import preserveDirectives from './rollup-plugin-preserve-directives.js';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
    entryFileNames: 'esm/[name].js'
  },
  external: ['react', 'react-dom'],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      compilerOptions: {
        outDir: 'dist',
        declaration: true,
        declarationDir: 'dist/types'
      }
    }),
    terser({
      format: {
        comments: false
      }
    }),
    preserveDirectives()
  ]
};
