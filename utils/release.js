
import URL from 'url';
import {parse, normalize} from 'path';
import {existsSync} from 'fs';

import {load} from 'cheerio';

import isAbsoluteURL from './isAbsoluteURL';
import parseHTML from './parseHTML';
import parseCSS from './parseCSS';
import parseJS from './parseJS';
import writeFile from './writeFile';

import {info} from './logger';

const releaseCSS = async (fpath, srcDir, distDir) => {
  const url = URL.parse(fpath);
  const srcPath = normalize(`${srcDir}/${url.pathname}`);
  const distPath = normalize(`${distDir}/${url.pathname}`);
  if (!existsSync(distPath)) {
    info(`Parsing CSS file "${srcPath}"`);
    const cssContent = await parseCSS(srcPath);
    writeFile(distPath, cssContent);
    info(`Release CSS file to "${distPath}"`);
  }
};

const releasJS = async (fpath, srcDir, distDir) => {
  const url = URL.parse(fpath);
  const srcPath = normalize(`${srcDir}/${url.pathname}`);
  const distPath = normalize(`${distDir}/${url.pathname}`);
  if (!existsSync(distPath)) {
    info(`Parsing JS file "${srcPath}"`);
    const cssContent = await parseJS(srcPath);
    writeFile(distPath, cssContent);
    info(`Release JS file to "${distPath}"`);
  }
};

export default async (tplFile, srcDir, distDir) => {
  info(`Parsing HTML file "${tplFile}"`);

  const content = await parseHTML(tplFile);
  const $ = load(content, {
    normalizeWhitespace: true,
  });

  $('link[rel="stylesheet"]').each((k, el) => {
    const $el = $(el);
    const href = $el.attr('href') || '';
    if (href && !isAbsoluteURL(href)) {
      releaseCSS(href, srcDir, distDir);
    }
  });

  $('script').each((k, el) => {
    const $el = $(el);
    const href = $el.attr('src') || '';
    if (href && !isAbsoluteURL(href)) {
      releasJS(href, srcDir, distDir);
    }
  });
  const htmlFileName = parse(tplFile).name;
  const htmlFilePath = normalize(`${distDir}/${htmlFileName}.html`);
  writeFile(htmlFilePath, content);
  info(`Release HTML file to "${htmlFilePath}"`);
};
