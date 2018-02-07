// utils / buildPage

const {load} = require('cheerio');

const isAbsoluteURL = require('./isAbsoluteURL');

const extractHTML = (content, srcDir) => {
  let $ = load(content, {
    normalizeWhitespace: true,
  });

  let css = [];
  $('link[rel="stylesheet"]').each((k, el) => {
    let $el = $(el);
    let href = $el.attr('href') || '';
    if (href && !isAbsoluteURL(href)) {
      css.push(`${srcDir}/${href}`);
      $el.remove();
    }
  });

  let js = [];
  $('script').each((k, el) => {
    let $el = $(el);
    let src = $el.attr('src') || '';
    if (src && !isAbsoluteURL(src)) {
      js.push(`${srcDir}/${src}`);
      $el.remove();
    }
  });

  let html = $.html();

  return {
    html,
    css,
    js,
  };
};

module.exports = extractHTML;
