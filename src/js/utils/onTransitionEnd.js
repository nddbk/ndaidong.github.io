// utils / onTransitionEnd

const getEventName = (elt) => {
  let t;

  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  for (t in transitions) {
    if (elt.style[t] !== undefined) { // eslint-disable-line no-undefined
      return transitions[t];
    }
  }

  return false;
};

export default (el, callback, timeout = 3000) => {
  const ev = getEventName(el);

  if (ev) {
    el.addEventListener(ev, callback);
    return ev;
  }
  return setTimeout(callback, timeout);
};


