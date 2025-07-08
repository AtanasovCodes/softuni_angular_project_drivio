/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
// eslint.config.cjs
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('@angular-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
// const angularTemplate = require('@angular-eslint/eslint-plugin-template');
// const angularTemplateParser = require('@angular-eslint/template-parser');

module.exports = [
  {
    ignores: ['**/node_modules/**', '**/.angular/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@angular-eslint': angular,
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'sibling', 'index'],
          pathGroups: [
            { pattern: '@angular/**', group: 'external', position: 'before' },
            {
              pattern: '**/constants/**',
              group: 'internal',
              position: 'before',
            },
            { pattern: '**/types/**', group: 'internal', position: 'before' },
            { pattern: '**/interface/**', group: 'internal', position: 'before' },
            { pattern: '**/utils/**', group: 'internal', position: 'before' },
            {
              pattern: '**/components/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
    },
  },
  // {
  // files: ["**/*.html"],
  //   languageOptions: {
  //     parser: angularTemplateParser,
  //   },
  //   plugins: {
  //     '@angular-eslint/template': angularTemplate,
  //   },
  //   rules: {
  //     ...angularTemplate.configs.recommended.rules,
  //     ...angularTemplate.configs.accessibility.rules,
  //   },
  // },
];
