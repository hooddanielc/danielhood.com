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
  popMaxRaw: 10000,
  popMaxLines: 5000,
  idleRawTime: 1,
  idleLineTime: 1,
  _queuesProcessing: 0,
  _rawQueue: "",
  _lineQueue: null,
  _materialQueue: null,
  _doneLoading: false,

  _initInstanceProps: function () {
    this.setProperties({
      _rawQueue: [],
      _lineQueue: [],
      _materialQueue: []
    });
  }.on('init'),

  _isDoneLoading: function () {
    return (
      this.get("_rawQueue").length === 0 &&
      this.get("_lineQueue").length === 0 &&
      this.get("_materialQueue").length === 0 &&
      this.get("_queuesProcessing") === 0 &&
      this.get("_doneLoading")
    );
  },

  /**
   * shifts an amount characters
   * off of the raw queue,
   * and turns them into lines
   */
  idleParseRawTick: function () {
    if (this._isDoneLoading()) {
      return;
    } else {
      // TODO synchronous action here
    }
  }.on('init'),

  /**
   * Shifts an amount of lines
   * off of the line queue
   * and invokes parse events.
   */
  idleParseLine: function idleParseLine() {
    if (this._isDoneLoading()) {
      return;
    } else {
      // TODO synchronous action here
    }
  }.on('init'),

  /**
   * Shifts an amount of materials
   * off of the line queue and
   * invokes parse events.
   */
  idleParseMaterial: function () {
    if (this._isDoneLoading()) {
      return;
    } else {
      // TODO synchronous action here
    }
  }.on('init'),

  /**
   * Shifts an amount of
   * materials to start
   * parsing through
   */

  load: function () {
    var p = new Ember.RSVP.Promise(function () {
      // TODO
    });

    this.set('loadingPromise', p);
    return p;
  }
});
