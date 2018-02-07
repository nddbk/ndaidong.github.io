// utils / rollupify

const {rollup} = require('rollup');

const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const cleanup = require('rollup-plugin-cleanup');

const {
  info,
  error,
} = require('./logger');

const transpileJS = require('./transpileJS');

const rollupify = async (input) => {
  info('Rollup start...');
  try {
    info('Generating code with bundle...');

    let bundle = await rollup({
      input,
      plugins: [
        nodeResolve({
          jsnext: true,
          main: true,
          extensions: [
            '.js',
            '.json',
          ],
        }),
        commonjs({
          include: 'node_modules/**',
          sourceMap: false,
        }),
        cleanup(),
      ],
    });

    let {code} = await bundle.generate({
      format: 'iife',
      indent: true,
      strict: false,
    });

    info('Rolling finished.');

    return transpileJS(code);
  } catch (err) {
    error(err);
    return err;
  }
};

module.exports = rollupify;
