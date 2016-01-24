/*global describe, it, expect, jasmine*/
/*jslint node: true*/
'use strict';

var tagger = require('../index');
var Gun = require('gun/gun');

describe('Tagger', function () {

  it('should be a function', function () {
    expect(tagger).toEqual(jasmine.any(Function));

    tagger(Gun);
  });

  it('should export a "tag" method', function () {
    expect(Gun.chain.tag).toEqual(jasmine.any(Function));
  });

  it('should export a "find" method', function () {
    expect(Gun.chain.find).toEqual(jasmine.any(Function));
  });

});
