import Ember from 'ember';

/**
 * @class WaveFrontParser
 *
 * A helper type for parsing
 * wavefront 3d format.
 */
export default Ember.Object.extend({
  objFile: null,
  loadingPromise: null,
  _httpLoaderPromises: null,

  load: function () {
    var p = new Ember.RSVP.Promise(function () {
      // TODO
    });

    this.set('loadingPromise', p);
    return p;
  }
});
