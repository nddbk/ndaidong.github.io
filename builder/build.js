#!/usr/bin/env node

const {
  execSync,
} = require('child_process');

const {
  readdir,
  statSync,
} = require('fs');

const {
  extname,
} = require('path');

const mkdirp = require('mkdirp').sync;
const copydir = require('copy-dir').sync;

const {
  srcDir,
  distDir,
} = require('./configs');

const {
  error,
} = require('./utils/logger');

const buildPage = require('./utils/buildPage');

const isFile = (f) => {
  let stats = statSync(f);
  return !stats.isDirectory();
};

const isTplFile = (f) => {
  return extname(f) === '.pug';
};

const build = () => {
  let staticDir = `${srcDir}/static`;
  let pageDir = `${srcDir}/pages`;

  let jsDir = `${distDir}/js`;
  let cssDir = `${distDir}/css`;

  execSync(`rm -rf ${distDir}`);

  [
    distDir,
    cssDir,
    jsDir,
  ].forEach((dir) => {
    mkdirp(dir);
  });

  copydir(staticDir, distDir);

  readdir(pageDir, 'utf8', (err, files) => {
    if (err) {
      error(err);
    }
    files.forEach((file) => {
      let f = `${pageDir}/${file}`;
      if (isFile(f) && isTplFile(f)) {
        return buildPage(f, srcDir, distDir);
      }
    });
  });
};

build();
