// utils / index

const logger = require('./logger');
const renderer = require('./renderer');

const readFile = require('./readFile');
const writeFile = require('./writeFile');
const delFile = require('./delFile');

module.exports = {
  logger,
  renderer,
  readFile,
  writeFile,
  delFile,
};
