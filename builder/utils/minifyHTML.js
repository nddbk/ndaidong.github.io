// utils / minifyHTML

const {minify} = require('html-minifier');

const minifyHTML = (html) => {
  return minify(html, {
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeTagWhitespace: true,
  });
};

module.exports = minifyHTML;
