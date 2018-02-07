// utils / minifyCSS

const postcss = require('postcss');
const cssclean = require('postcss-clean');
const stripCssComments = require('strip-css-comments');

const {
  error,
} = require('./logger');

const removeComments = (css) => {
  return stripCssComments(css, {
    preserve: false,
  });
};

const minifyCSS = async (css) => {
  try {
    let result = await postcss([
      cssclean({
        advanced: true,
      }),
    ]).process(css, {from: null});
    return removeComments(result.css);
  } catch (err) {
    error(err);
    return err;
  }
};

module.exports = minifyCSS;
