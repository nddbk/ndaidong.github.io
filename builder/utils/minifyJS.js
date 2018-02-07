// utils / minifyJS

const {
  error,
} = require('./logger');

const {minify} = require('uglify-es');

const minifyJS = (jscode) => {
  let result = minify(jscode);
  let {
    error: err,
    code,
  } = result;

  if (err) {
    error(err);
  }
  return code;
};

module.exports = minifyJS;
