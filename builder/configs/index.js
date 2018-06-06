/**
 * configs/index
 * @ndaidong
 **/

const {
  name,
  version,
} = require('../../package.json');

const {
  warning,
} = require('../utils/logger');

const env = process.env || {}; // eslint-disable-line no-process-env

[
  'NODE_ENV',
  'HOST',
  'PORT',
  'URL',
].forEach((envar) => {
  if (!env[envar]) {
    warning(`Environment variable ${envar} is missing, use default instead.`);
  }
});

const config = {
  ENV: env.NODE_ENV || 'development',
};

config.name = name;
config.version = version;

config.host = env.HOST || 'http://0.0.0.0';
config.port = env.PORT || '7856';
config.url = env.URL || `${config.host}:${config.port}`;

config.srcDir = 'src';
config.distDir = 'dist';
config.siteDataFile = 'site.conf.json';

module.exports = config;
