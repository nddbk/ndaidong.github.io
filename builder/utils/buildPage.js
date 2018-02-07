// utils / buildPage

const {
  basename,
} = require('path');

const {load} = require('cheerio');
const {
  createId,
} = require('bellajs');

const writeFile = require('./writeFile');

const {
  info,
} = require('./logger');

const {
  compileHTML,
} = require('./compiler');

const minifyHTML = require('./minifyHTML');

const extractHTML = require('./extractHTML');
const extractCSS = require('./extractCSS');
const extractJS = require('./extractJS');

const buildPage = async (fileSrc, srcDir, outputDir) => {
  info(`Handling pug file: ${fileSrc}`);

  let fileName = basename(fileSrc, '.pug');
  let outputHTMLFile = `${outputDir}/${fileName}.html`;

  let sHtml = await compileHTML(fileSrc);
  let {
    html,
    css,
    js,
  } = extractHTML(sHtml, srcDir);

  let rev = createId();
  let $ = load(html);

  let sCSS = await extractCSS(css);
  if (sCSS) {
    let outputCSSFile = `${outputDir}/css/${fileName}.css`;
    writeFile(outputCSSFile, sCSS);

    let styleTag = `<link rel="stylesheet" type="text/css" href="css/${fileName}.css?rev=${rev}">`;
    $('head').append(styleTag);
  }


  let sJS = await extractJS(js);
  if (sJS) {
    let outputJSFile = `${outputDir}/js/${fileName}.js`;
    writeFile(outputJSFile, sJS);

    let scriptTag = `<script type="text/javascript" src="js/${fileName}.js?rev=${rev}"></script>`;
    $('body').append(scriptTag);
  }

  let sHTML = minifyHTML($.html());

  writeFile(outputHTMLFile, sHTML);
};

module.exports = buildPage;
