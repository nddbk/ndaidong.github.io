// utils / pickOne

import {
  randint,
} from 'bellajs';

export default (arr = []) => {
  const vals = [...arr];
  const rand = randint(0, vals.length - 1);
  return vals[rand];
};
