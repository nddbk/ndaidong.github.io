// utils / extractCSS

const postify = require('./postify');
const readFile = require('./readFile');
const isVendorAsset = require('./isVendorAsset');
const minifyCSS = require('./minifyCSS');

const {
  error,
  info,
} = require('./logger');

const extractCSS = async (cssFiles) => {
  try {
    info('Handling css files...');
    let vendorCSS = cssFiles.filter((file) => {
      return isVendorAsset(file);
    }).map(readFile);

    let promises = cssFiles.filter((file) => {
      return !isVendorAsset(file);
    }).map(postify);

    let siteCSS = await Promise.all(promises);

    let css = vendorCSS.concat(siteCSS).join('\n');
    return minifyCSS(css);
  } catch (err) {
    error(err);
    return null;
  }
};

module.exports = extractCSS;
