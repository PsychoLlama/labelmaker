/*jslint node: true*/
'use strict';

var scope = require('./scope');

module.exports = function find(Gun) {


  Gun.chain.tagged = function (name) {
    if (!name && typeof name !== 'string') {
      return this;
    }
    return this.get(scope + name);
  };

};
