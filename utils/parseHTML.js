// utils / parseHTML

import {normalize} from 'path';

import {load} from 'cheerio';
import pretty from 'pretty';
import {minify} from 'html-minifier';
import {compileFile} from 'pug';

import readFile from './readFile';
import isAbsoluteURL from './isAbsoluteURL';
import {getConfigs} from '../configs';


const minifyHTML = (html) => {
  return minify(html, {
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeTagWhitespace: true,
  });
};


export const compile = async (content, config) => {
  const rev = config.rev;

  const $ = load(content, {
    normalizeWhitespace: true,
  });

  const cssLinks = [];
  $('link[rel="stylesheet"]').each((k, el) => {
    const $el = $(el);
    const href = $el.attr('href') || '';
    if (href && !isAbsoluteURL(href)) {
      cssLinks.push(href);
      $el.remove();
    }
  });

  const jsLinks = [];
  $('script').each((k, el) => {
    const $el = $(el);
    const href = $el.attr('src') || '';
    if (href && !isAbsoluteURL(href)) {
      jsLinks.push(href);
      $el.remove();
    }
  });

  cssLinks.forEach((href) => {
    const fpath = href + '?v=' + rev;
    const subTag = `<link rel="subresource" href="${fpath}">`;
    $('head').append(subTag);
    const styleTag = `<link rel="stylesheet" type="text/css" href="${fpath}">`;
    $('head').append(styleTag);
  });

  jsLinks.forEach((href) => {
    const fpath = href + '?v=' + rev;
    const scriptTag = `<script type="text/javascript" src="${fpath}"></script>`;
    $('body').append(scriptTag);
  });

  const html = $.html();

  if (config.ENV == 'dev') {
    return pretty(html, {ocd: true});
  }
  return minifyHTML(html);
};


export default async (fileSrc) => {
  const config = getConfigs();
  const tmp = readFile(`${config.srcDir}/${config.siteDataFile}`);
  const tplData = JSON.parse(tmp);
  const {url, image} = tplData.meta;
  if (!isAbsoluteURL(image)) {
    const siteUrl = config.ENV === 'development' ? config.url : url;
    tplData.meta.image = normalize(siteUrl + '/' + image);
  }
  const content = fileSrc.endsWith('.pug') ?
    compileFile(fileSrc)(tplData) :
    readFile(fileSrc);
  const html = await compile(content, config);
  return html;
};
