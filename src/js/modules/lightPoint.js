// modules / lightPoint

import {
  add,
  get,
} from 'realdom';

import {
  randint,
} from 'bellajs';

import onTransitionEnd from '../utils/onTransitionEnd';
import pickOne from '../utils/pickOne';

let $space;

const getRandomColor = () => {
  const vals = ['fff', '6f6', 'ff8', '0f0', '0ff', 'f5f', 'ffd', 'aef', 'fed', '0f6', '3f0'];
  return `#${pickOne(vals)}`;
};

const getRandomTiming = () => {
  const vals = ['ease', 'ease-in-out', 'linear', 'ease-in-out', 'ease-in', 'ease-out', 'ease-in-out'];
  return pickOne(vals);
};

const animate = (elements, spaceWidth, spaceHeight) => {
  let t = 10;

  return elements.map((el) => {
    const x = randint(0, spaceWidth);
    const y = spaceHeight + randint(100, 200);
    const s = 0.1 + Math.random() * 4;
    const c = getRandomColor();
    el.style.zIndex = randint(5, 12);
    el.style.backgroundColor = c;
    el.style.boxShadow = `0px 0px 2px 1px ${c}`;
    el.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    return el;
  }).map((el) => {
    t += 5;
    setTimeout(() => {
      el.addClass('circle');

      const timer = randint(8, 16);
      const timing = getRandomTiming();
      el.style.transition = `transform ${timer}s ${timing}`;

      const x = randint(100, spaceWidth - 100);
      const y = randint(100, 200);
      const s = 0.5 + Math.random();
      el.setProperty({x, y, s});
      el.style.transform = `translate(${x}px, ${-y}px) scale(${s})`;
      onTransitionEnd(el, () => {
        el.destroy();
      });
    }, t);
  });
};

const makeDots = () => {
  const dots = [];
  const total = randint(1, 8);

  while (dots.length < total) {
    const c = add('DIV', $space);
    c.addClass('dot');
    dots.push(c);
  }

  const ow = $space.offsetWidth;
  const oh = $space.offsetHeight;
  animate(dots, ow, oh);
};

export const init = () => {
  $space = get('space');
  makeDots();
  setInterval(makeDots, 5e3);
};
