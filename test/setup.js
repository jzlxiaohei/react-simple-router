/* eslint-disable import/no-extraneous-dependencies */
import 'jsdom-global/register';
import dirtyChai from 'dirty-chai';
import chai from 'chai';

chai.use(dirtyChai);

if (typeof window !== 'undefined') {
  const matchMediaPolyfill = function matchMediaPolyfill(mediaQuery: string): MediaQueryList {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {
      },
      removeListener() {
      },
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}
