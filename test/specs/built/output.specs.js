/**
 * Testing
 * @ndaidong
 */

const {
  existsSync,
  readdirSync,
} = require('fs');

const {
  extname,
  basename,
} = require('path');

const test = require('tap').test;

const config = require('../../../builder/configs');

const {
  srcDir,
  distDir,
} = config;

test('Check CSS/JS public dirs', (assert) => {
  [
    distDir,
    `${distDir}/js`,
    `${distDir}/css`,
  ].forEach((d) => {
    assert.ok(existsSync(distDir), `Directory "${d}" must be created`);
  });
  assert.end();
});

test('Check static contents', (assert) => {
  let staticDir = `${srcDir}/static`;
  if (existsSync(staticDir)) {
    readdirSync(staticDir).forEach((d) => {
      let gen = `${distDir}/${d}`;
      assert.ok(existsSync(gen), `File or folder "${gen}" must be cloned`);
    });
  }
  assert.end();
});

test('Check generated pages', (assert) => {
  let staticDir = `${srcDir}/pages`;
  readdirSync(staticDir).forEach((file) => {
    if (extname(file) === '.pug') {
      let gen = `${distDir}/${basename(file, '.pug')}.html`;
      assert.ok(existsSync(gen), `Page "${gen}" must be generated`);
    }
  });
  assert.end();
});
