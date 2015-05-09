import Ember from 'ember';
import HttpReadStream from 'phreaker-eyes/mixins/dans-world/utilities/http-read-stream';

/**
 * @class WaveFrontParser
 *
 * A helper type for parsing
 * wavefront 3d format.
 */
export default Ember.Object.extend(Ember.Evented, {
  objUrl: null,
  loadingPromise: null,
  popMaxRaw: 10000,
  popMaxLines: 5000,
  popMaxMaterials: 500,
  idleRawTick: 100,
  idleLineTick: 100,

  _initInstanceProps: function () {
    this.setProperties({
      _rawQueue: [],
      _lineQueue: [],
      _materialQueue: [],
      _queuesProcessing: 0,
      _incrementQueus: 0
    });

    this.idleParseMaterialTick();
    this.idleParseRawTick();
    this.idleParseLineTick();
  }.on('init'),

  _isDoneLoading: function () {
    var done = this.get("_queuesProcessing");

    if (done === 0 && this.get("_resolve")) {
      this.get("_resolve");
    } else {
      return false;
    }
  },

  _inc: function () {
    this.incrementProperty('_queuesProcessing');
  },

  _dec: function () {
    this.decrementProperty('_queuesProcessing');
  },

  /**
   * shifts an amount characters
   * off of the raw queue,
   * and turns them into lines
   */
  idleParseRawTick: function () {
    var q = this.get("_rawQueue");

    if (this._isDoneLoading()) {
      return;
    }

    setTimeout(function () {
      this.idleParseRawTick();
    }.bind(this), this.get("_idleRawTime"));

    if (q.length === 0) {
      return;
    }
  },

  /**
   * Shifts an amount of lines
   * off of the line queue
   * and invokes parse events.
   */
  idleParseLineTick: function () {
    var q = this.get("_lineQueue");

    if (this._isDoneLoading()) {
      return;
    }

    setTimeout(function () {
      this.idleParseLineTick();
    }.bind(this), this.get("_idleRawTime"));
  
    if (q.length === 0) {
      return;
    }
  },

  /**
   * Shifts an amount of
   * materials to start
   * parsing through
   */
  idleParseMaterialTick: function () {
    var q = this.get("_materialQueue");

    if (this._isDoneLoading()) {
      return;
    }

    setTimeout(function () {
      this.idleParseMaterialTick();
    }.bind(this), this.get("_idleRawTidleParseMaterialime"));

    if (q.length === 0) {
      return;
    }
  },

  load: function () {
    return this.read(HttpReadStream.create({
      url: this.get("objUrl")
    }));
  },

  read: function (reader) {
    var p = new Ember.RSVP.Promise(function (resolve, reject) {
      this._inc();

      if (this._isDoneLoading()) {
        reject();
      } else {
        this.set("_resolve", resolve);
        this.set("_reject", reject);
        this._inc();

        reader.on("data", function (data) {
          var raw = this.get("_rawQueue");
          raw += data;
          console.log(data);
        }).read().then(function () {
          this._dec();
        }.bind(this), reject);
      }
    }.bind(this));

    return p;
  }
});
