module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // 函数名后加空格
    'space-before-function-paren': 0,
    // http://eslint.org/docs/rules/semi
    "semi": [2, "always"],
    // http://eslint.org/docs/rules/semi-spacing
    "semi-spacing": [2, {
      "before": false,
      "after": true
    }],
    // 文件末尾不强制换行
    "eol-last": 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
