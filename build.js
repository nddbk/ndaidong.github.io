// start

import {execSync} from 'child_process';
import {readdir, statSync, existsSync} from 'fs';
import {extname} from 'path';

import {getConfigs} from './configs';
import {error} from './utils/logger';
import release from './utils/release';


const isFile = (f) => {
  const stats = statSync(f);
  return !stats.isDirectory();
};

const isTplFile = (f) => {
  return extname(f) === '.pug';
};

const build = () => {
  const conf = getConfigs();
  const {srcDir, distDir, staticDir} = conf;
  if (existsSync(distDir)) {
    execSync(`rm -rf ${distDir}`);
    execSync(`mkdir ${distDir}`);
  }
  execSync(`cp -r ${staticDir}/. ${distDir}`);
  execSync(`mkdir -p ${distDir}/css`);
  execSync(`mkdir -p ${distDir}/js`);

  const pageDir = `${srcDir}/pages`;
  readdir(pageDir, 'utf8', (err, files) => {
    if (err) {
      error(err);
    }
    files.forEach((file) => {
      const f = `${pageDir}/${file}`;
      if (isFile(f) && isTplFile(f)) {
        return release(f, srcDir, distDir);
      }
    });
  });
};

build();
