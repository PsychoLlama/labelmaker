/* global describe, it, expect, jasmine, beforeEach, afterAll*/
/* eslint-disable no-console*/
'use strict';

const tagger = require('../src/index');
const scope = require('../src/scope');
const fs = require('fs');
const path = require('path');

// Squelch gun peer connection warnings
console.log = (function () {
  const log = console.log;
  return function (name) {

    if (name && name.match(/Warning!/i)) {
      return;
    }

    if (name && name.match(/Hello wonderful person/)) {
      return;
    }

    log.apply(console, arguments);
  };
}());

const Gun = require('gun');

// set the default timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

tagger(Gun);

describe('The tagger function', function () {
  let gun, tag;

  beforeEach(function () {
    // generate a new tag each test
    tag = Gun.text.random(10);

    // make a new gun instance
    gun = new Gun({
      file: 'tag.spec-data.json',
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
        name: 'success',
      }).tag(tag).get(scope + tag).map().val(done);
    });

    it('should not pseudo-merge nodes', function (done) {
      gun.put({
        data: true,
      }).tag(tag).get(scope + tag).map().val(function (val) {
        expect(val.name).toBe(undefined);
        expect(val.data).toBe(true);
        done();
      });
    });

    it('should be able to take multiple tags', function (done) {
      gun.put({
        test: true,
      }).tag(tag, 'custom');
      gun.tagged('custom').val(done);
    });

  });

  describe('tagged method', function () {

    it('should be able to find tags', function (done) {
      gun.put({
        data: true,
      }).tag(tag);
      gun.tagged(tag).val(done);
    });

    it('should be able to find every tag', function (done) {
      gun.tagged().map().val(done);
    });

  });

});

afterAll(function () {
  const file = path.join(
		__dirname,
		'..',
		'tag.spec-data.json'
	);
  fs.unlink(file);
});
