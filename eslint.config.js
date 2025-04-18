// @ts-check
import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default tseslint.config(
  { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
  {
    files: ['**/*.{js,ts,vue}'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...pluginVue.configs['flat/recommended'],
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  prettierRecommended
)
