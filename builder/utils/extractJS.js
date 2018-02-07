// utils / extractJS

const rollupify = require('./rollupify');
const readFile = require('./readFile');
const isVendorAsset = require('./isVendorAsset');
const minifyJS = require('./minifyJS');

const {
  error,
  info,
} = require('./logger');

const extractJS = async (jsFiles) => {
  try {
    info('Handling javascript files...');
    let vendorJS = jsFiles.filter((file) => {
      return isVendorAsset(file);
    }).map(readFile);

    let promises = jsFiles.filter((file) => {
      return !isVendorAsset(file);
    }).map(rollupify);

    let siteJS = await Promise.all(promises);

    let js = vendorJS.concat(siteJS).join('\n');
    return minifyJS(js);
  } catch (err) {
    error(err);
    return null;
  }
};

module.exports = extractJS;
