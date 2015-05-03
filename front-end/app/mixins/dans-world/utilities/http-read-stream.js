import Ember from 'ember';

/**
 * Incremently loads data over http.
 * Good to use if your use case doesn't
 * require ajax string to be fully
 * loaded before using.
 *
 * @class HttpReadStream
 */
export default Ember.Object.extend({
  url: null,

  read: function () {
    return new Ember.RSVP.Promise(function () {
      // TODO
    });
  }
});
