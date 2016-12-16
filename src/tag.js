/* jslint node: true, nomen: true*/
'use strict';

const scope = require('./scope');
const log = require('gun/gun').log;

// check compatibility

/**
 * invalid - make sure the value is an object
 *
 * @param  {Mixed} value - any value
 * @returns {Boolean} - whether or not it's valid
 */
function invalid (value) {
  if (typeof value !== 'object') {
    log('Only objects can be tagged');
    return true;
  }
  return false;
}

/*
  Keep a master collection
  of every tag used.
*/

/**
 * pushTag - Push an object into the master tag set
 *
 * @param  {Gun} gun - the gun instance
 * @param  {String} tag - the name of the tag
 * @returns {undefined}
 */
function pushTag (gun, tag) {
  gun.get(scope + tag).val(function (group) {
    gun.get(`${scope}all tags`).init().path(tag).put(group);
  });
}

/*
  Take a list of tags and send
  them through, one at a time.
*/

/**
 * serialize - handles splat tags and ensures
 * only one tag is passed at a time.
 *
 * @param  {Gun} gun - the gun instance
 * @param  {Arguments} args - the arguments passed
 * to `.tag`
 * @returns {Gun} - the gun instance
 */
function serialize (gun, args) {
  // turn them into an array
  args = Array.prototype.slice.call(args);

  args.forEach(function (tag) {
    // run each tag
    gun.tag(tag);
  });

  return gun;
}

module.exports = function tag (Gun) {

  Gun.chain.tag = function (tag) {

    if (arguments.length !== 1) {
      return serialize(this, arguments);
    }

    return this.val(function (obj) {
      // filter non-objects
      if (invalid(obj)) {
        return;
      }

      // place the object under the tag
      this.get(scope + tag).init()
        .path(obj._['#']).put(obj);


      // place that tag under a master list of tags
      pushTag(this, tag);

    });
  };
};
