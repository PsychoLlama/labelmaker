'use strict';

const eslint = exports;

// What environments the code runs in.
eslint.env = {
  node: true,
  browser: true,
  es6: true,
  commonjs: true,
};

eslint.extends = [
  'eslint:recommended',
  'llama',
];
