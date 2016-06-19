/* jslint node: true*/
'use strict';

var tagger = require('./tag');
var finder = require('./find');

/**
 * attach - adds the methods to the gun instance
 *
 * @param  {Function} Gun - the gun constructor
 * @returns {Function} - the gun constructor
 */
function attach (Gun) {
  Gun.chain.init = Gun.chain.init || Gun.chain.set;
  tagger(Gun);
  finder(Gun);

  return Gun;
}

if (typeof window !== 'undefined' && window.Gun) {
  attach(window.Gun);
}

module.exports = attach;
