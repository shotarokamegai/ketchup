'use strict';

// import DisableCover from 'controller/DisableCover';

/**
 * import Scroll from 'utils/Scroll';
 */

export default class Scroll {
  /**
   * @example Scroll.to(0,1,Power2.easeOut);
   */
  static to(y, time = .3, ease = Power3.easeInOut) {
    TweenMax.to([document.body, document.documentElement], time, { scrollTop: y, ease: ease });

    // DisableCover.timer(time);
  }

  /**
   * @example Scroll.set(0);
   */
  static set(y = 0) {
    let tgt;
    if ('scrollingElement' in document) tgt = document.scrollingElement;
    else if ('WebkitAppearance' in document.documentElement.style) tgt = document.body;
    else tgt = document.documentElement;

    tgt.scrollTop = y;
  }
}