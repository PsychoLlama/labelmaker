/*jslint node: true, nomen: true*/
'use strict';

var scope = require('./scope');

// check compatibility
function invalid(value) {
  if (typeof value !== 'object') {
    console.log('Only objects can be tagged');
    return true;
  }
}

/*
  Keep a master collection
  of every tag used.
*/
function pushTag(gun, tag) {
  gun.get(scope + tag).val(function (group) {
    gun.get(scope + 'all tags').init().path(tag).put(group);
  });
}

/*
  Take a list of tags and send
  them through, one at a time.
*/
function serialize(gun, args) {
  // turn them into an array
  args = Array.prototype.slice.call(args);

  args.forEach(function (tag) {
    // run each tag
    gun.tag(tag);
  });

  return gun;
}

module.exports = function tag(Gun) {

  Gun.chain.tag = function (tag) {

    if (arguments.length !== 1) {
      return serialize(this, arguments);
    }

    return this.val(function (obj) {
      // filter non-objects
      if (invalid(obj)) {
        return this;
      }

      // place the object under the tag
      this.get(scope + tag).init()
        .path(obj._['#']).put(obj);


      // place that tag under a master list of tags
      pushTag(this, tag);

    });
  };
};
