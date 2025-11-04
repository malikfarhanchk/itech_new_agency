import js from '@eslint/js'
import next from '@next/eslint-plugin-next'

export default [
  js.configs.recommended,
  ...next.configs.recommended,
  {
    ignores: ['node_modules/**', '.next/**', 'out/**']
  }
]