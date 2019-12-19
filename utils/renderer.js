// utils --> renderer

import {
  dirname,
  basename,
  extname,
  normalize,
} from 'path';

import {existsSync} from 'fs';

import parseHTML from './parseHTML';
import parseCSS from './parseCSS';
import parseJS from './parseJS';
import {getConfigs} from '../configs';

import {
  info, error,
} from './logger';


export const render = async (req, res) => {
  const {path = ''} = req;

  const config = getConfigs();
  const srcDir = config.srcDir;

  const filePath = dirname(path);
  const fileExt = extname(path) || '.pug';
  const fileName = basename(path, fileExt) || 'index';

  const fileDir = filePath + (fileExt === '.pug' ? '/pages' : '');

  const fileSrc = normalize(`${srcDir}/${fileDir}/${fileName}${fileExt}`);

  if (!existsSync(fileSrc)) {
    const msg = `Could not find: ${fileSrc}`;
    error(msg);
    return res.end(msg);
  }

  info(`Start handling file "${fileSrc}"...`);

  if (['.pug', '.html', '.htm'].includes(fileExt)) {
    const content = await parseHTML(fileSrc);
    return res.status(200).send(content);
  }

  if (['.css', '.sass', '.less'].includes(fileExt)) {
    const content = await parseCSS(fileSrc);
    res.type('text/css');
    return res.status(200).send(content);
  }

  if (['.js', '.ejs', '.jsx'].includes(fileExt)) {
    const content = await parseJS(fileSrc);
    res.type('text/javascript');
    return res.status(200).send(content);
  }
  res.end(fileSrc);
};
