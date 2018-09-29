module.exports = {
    root: true,
    extends: ['standard', 'plugin:vue/essential'],
    plugins: ['vue'],
    parserOptions: {
      ecmaVersion: 2017
    },
    rules: {
      'space-before-function-paren': ['error', 'never'], // prettier 和 eslint 冲突的规则
      'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
      curly: ['error', 'all']
    }
  }