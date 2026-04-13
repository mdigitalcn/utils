import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import preserveDirectives from './rollup-plugin-preserve-directives.js';

export default {
  input: {
    index: 'src/index.ts',
    'array/index': 'src/array/index.ts',
    'object/index': 'src/object/index.ts',
    'function/index': 'src/function/index.ts',
    'math/index': 'src/math/index.ts',
    'string/index': 'src/string/index.ts',
    'predicate/index': 'src/predicate/index.ts',
    'promise/index': 'src/promise/index.ts',
    'file/index': 'src/file/index.ts',
    'validation/index': 'src/validation/index.ts',
    'react/index': 'src/react/index.ts',
  },
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
      },
      exclude: ['**/*.test.ts', '**/*.test.tsx']
    }),
    terser({
      format: {
        comments: false
      }
    }),
    preserveDirectives()
  ]
};
