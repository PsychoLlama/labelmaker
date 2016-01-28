/*global describe, it, expect, jasmine, beforeEach, afterAll*/
/*jslint node: true, nomen: true*/
'use strict';

/*
  Warning:
  These tests are written for
  gun@v0.3, and may not work
  for older versions.
*/

// Squelch gun peer connection warnings
console.log = (function () {
  var log = console.log;
  return function (name) {

    if (name && name.match(/Warning!/i)) {
      return;
    }

    log.apply(console, arguments);
  };
}());


// set the default timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

var tagger = require('../index');
var scope = require('../lib/scope');
var Gun = require('gun');
tagger(Gun);

describe('The tagger function', function () {
  var gun, tag;

  beforeEach(function () {
    // generate a new tag each test
    tag = Gun.text.random(10);

    // make a new gun instance
    gun = new Gun({
      file: 'tag.spec-data.json'
    });
  });

  it('should export a "tag" method', function () {
    expect(Gun.chain.tag).toEqual(jasmine.any(Function));
  });

  it('should export a "tagged" method', function () {
    expect(Gun.chain.tagged).toEqual(jasmine.any(Function));
  });


  describe('tag method', function () {

    it('should index data', function (done) {
      gun.put({
        name: 'success'
      }).tag(tag).get(scope + tag).map().val(done);
    });

    it('should not pseudo-merge nodes', function (done) {
      gun.put({
        data: true
      }).tag(tag).get(scope + tag).map().val(function (val) {
        expect(val.name).toBe(undefined);
        expect(val.data).toBe(true);
        done();
      });
    });

    it('should be able to take multiple tags', function (done) {
      gun.put({
        test: true
      }).tag(tag, 'custom');
      gun.tagged('custom').val(done);
    });

  });

  describe('tagged method', function () {

    it('should be able to find tags', function (done) {
      gun.put({
        data: true
      }).tag(tag);
      gun.tagged(tag).map().val(done);
    });

    it('should be able to find every tag', function (done) {
      gun.tagged().map().val(done);
    });

  });

});

afterAll(function () {
  require('fs').unlink(__dirname + '/../tag.spec-data.json');
});
