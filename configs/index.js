import {
  genid,
} from 'bellajs';

import {
  name,
  version,
} from '../package.json';

import {
  warning,
} from '../utils/logger';


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
  ENV: env.NODE_ENV || 'dev',
  rev: genid(),
};

config.name = name;
config.version = version;

config.host = env.HOST || 'http://0.0.0.0';
config.port = env.PORT || '7856';
config.url = env.URL || `${config.host}:${config.port}`;

config.srcDir = 'src';
config.distDir = 'dist';
config.staticDir = 'src/static';
config.siteDataFile = 'site.conf.json';

export const getConfigs = () => {
  return Object.assign({}, config);
};
