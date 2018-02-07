// utils / renderer

const {
  dirname,
  basename,
  extname,
  normalize,
} = require('path');

const {
  existsSync,
} = require('fs');

const {
  info,
  error,
} = require('./logger');

const {
  compileHTML,
  compileJS,
  compileCSS,
} = require('./compiler');

const render = async (req, res) => {
  let {path = ''} = req;

  let fileDir = dirname(path);
  let fileExt = extname(path) || '.pug';
  let fileName = basename(path, fileExt) || 'index';

  if (fileExt === '.pug') {
    fileDir += '/pages';
  }

  let fileSrc = normalize(`./src/${fileDir}/${fileName}${fileExt}`);

  if (!existsSync(fileSrc)) {
    let msg = `Could not find: ${fileSrc}`;
    error(msg);
    return res.end(msg);
  }

  info(`Start handling file "${fileSrc}"...`);

  if (fileExt === '.pug') {
    let html = await compileHTML(fileSrc);
    return res.status(200).send(html);
  }

  if (fileExt === '.js') {
    let js = await compileJS(fileSrc);
    return res.status(200).type('text/javascript').send(js);
  }

  if (fileExt === '.css') {
    let css = await compileCSS(fileSrc);
    return res.status(200).type('text/css').send(css);
  }

  let msg = `Ignore file with extension "${fileExt}".`;
  info(msg);

  return res.end(msg);
};

module.exports = render;
