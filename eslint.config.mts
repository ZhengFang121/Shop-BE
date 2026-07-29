import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist'],
  },
  {
    // 調整 eslint 的規則 (去忽略暫時沒用到的東西)
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          // ^ 表示開頭 (正則表達式)，^_ 表示開頭是 _ 的名字
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
])
