// utils / transpileJS

const {transform} = require('babel-core');

const config = require('../configs');

const {
  info,
  error,
} = require('./logger');

const transpile = (code) => {
  info('Transpiling with Babel...');
  let {
    error: err,
    code: output,
  } = transform(code, config.babel);

  info('Transpiling finished');
  if (err) {
    error(err);
  }
  return output;
};

module.exports = transpile;
