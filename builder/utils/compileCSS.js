// utils / compileCSS

const postify = require('./postify');
const readFile = require('./readFile');
const isVendorAsset = require('./isVendorAsset');
const minifyCSS = require('./minifyCSS');

const compileCSS = async (fileSrc) => {
  if (isVendorAsset(fileSrc)) {
    let content = readFile(fileSrc);
    return minifyCSS(content);
  }
  let css = await postify(fileSrc);
  return css;
};

module.exports = compileCSS;
