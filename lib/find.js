/* jslint node: true*/
'use strict';

var scope = require('./scope');

module.exports = function find (Gun) {

  Gun.chain.tagged = function (name, cb) {
    if (arguments.length === 0) {
      return this.get(scope + 'all tags');
    }
    if (!name && typeof name !== 'string') {
      return this;
    }
    return this.get(scope + name).map(cb, true);
  };

};
