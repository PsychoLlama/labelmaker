/*jslint node: true*/
'use strict';

var tagger = require('./lib/tag');
var finder = require('./lib/find');


function attach(Gun) {
  Gun.chain.init = Gun.chain.init || Gun.chain.set;
  tagger(Gun);
  finder(Gun);

  return Gun;
}

if (typeof window !== 'undefined' && window.Gun) {
  attach(window.Gun);
}

module.exports = attach;
