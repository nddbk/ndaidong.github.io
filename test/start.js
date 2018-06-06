/**
 * Import specs
 */

const {
  existsSync,
  readdirSync,
} = require('fs');

const {
  join,
  extname,
} = require('path');

const dirs = ['http', 'built'];

dirs.forEach((dir) => {
  let where = './test/specs/' + dir;
  if (existsSync(where)) {
    readdirSync(where).forEach((file) => {
      if (extname(file) === '.js') {
        require(join('.' + where, file));
      }
    });
  }
});

