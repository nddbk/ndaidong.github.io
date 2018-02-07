// utils / compileHTML

const {
  compileFile,
} = require('pug');

const readFile = require('./readFile');

const {
  ENV,
  url: siteUrl,
  srcDir,
  siteDataFile,
} = require('../configs');

const compileHTML = async (fileSrc) => {
  let tplData = {ENV};

  if (siteDataFile) {
    let tmp = readFile(`${srcDir}/${siteDataFile}`);
    tplData = JSON.parse(tmp);
  }

  let meta = tplData.meta;

  if (ENV !== 'production') {
    meta.url = siteUrl;
  }

  let {
    image = '',
    url = '',
  } = meta;

  if (!image.startsWith('http')) {
    meta.image = `${url}${image}`;
  }

  tplData.meta = meta;

  let html = compileFile(fileSrc)(tplData);

  return html;
};

module.exports = compileHTML;
