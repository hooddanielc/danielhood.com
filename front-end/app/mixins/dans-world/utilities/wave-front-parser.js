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
  _rawQueue: null,
  _lineQueue: null,
  _state: null,
  _states: null,
  _popMaxRaw: 4000,
  _popMaxLines: 500,

  /**
   * shifts an amount characters
   * off of the raw queue,
   * and turns them into lines
   */
  idleParseRawTick: function () {
    // TODO
  },

  /**
   * Shifts an amount of lines
   * off of the line queue
   * and invokes parse events
   */
  idleParseLine: function () {
    // TODO
  },

  load: function () {
    var p = new Ember.RSVP.Promise(function () {
      // TODO
    });

    this.set('loadingPromise', p);
    return p;
  }
});
