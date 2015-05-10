import Ember from 'ember';
import HttpReadStream from 'phreaker-eyes/mixins/dans-world/utilities/http-read-stream';

/**
 * @class WaveFrontParser
 *
 * A helper type for parsing
 * wavefront 3d format.
 */
var WaveFrontParser = Ember.Object.extend(Ember.Evented, {
  objUrl: null,
  popMaxRaw: 100000,
  popMaxLines: 10000,
  popMaxMaterials: 5,
  idleRawTick: 1,
  idleLineTick: 1,
  idleMaterialTick: 1,

  _initInstanceProps: function () {
    this.setProperties({
      _rawQueue: "",
      _lineQueue: [],
      _materialQueue: [],
      _queuesProcessing: 0,
      _objFileResolved: false,
      _materialPromises: []
    });

    this.idleParseMaterialTick();
    this.idleParseRawTick();
    this.idleParseLineTick();
  }.on('init'),

  _isDoneLoading: function () {
    var done = this.get("_queuesProcessing");

    if (done === 0 && this.get("_resolve")) {
      this.get("_resolve")();
      return true;
    } else {
      return false;
    }
  },

  _inc: function () {
    return this.incrementProperty('_queuesProcessing');
  },

  _dec: function () {
    return this.decrementProperty('_queuesProcessing');
  },

  /**
   * shifts an amount characters
   * off of the raw queue,
   * and turns them into lines
   */
  idleParseRawTick: function () {
    this._inc();

    setTimeout(function () {
      var raw = this.get("_rawQueue");

      if (raw.length > 0) {
        var limit = this.get("popMaxRaw");
        var work = raw.substring(0, limit);
        var lines = work.split(/\r?\n/);
        this.set('_rawQueue', lines.pop() + raw.substring(limit, raw.length));

        lines.forEach(function (line) {
          line = line.trim();

          if (line !== '') {
            this.get('_lineQueue').push(line);
          }
        }.bind(this));
      }

      this._dec();

      if (!this.get('_objFileResolved') || this.get('_rawQueue').length > 0) {
        this.idleParseRawTick();
      }

      this._isDoneLoading();
    }.bind(this), this.get("idleRawTick"));
  },

  /**
   * Shifts an amount of lines
   * off of the line queue
   * and invokes parse events.
   */
  idleParseLineTick: function () {
    this._inc();

    setTimeout(function () {
      var lines = this.get('_lineQueue');

      if (lines.length > 0) {
        var work = lines.splice(0, this.get('popMaxLines'));

        work.forEach(function (line) {
          var tokens = line.split(/\s+/);
          var first = tokens.shift();

          if (first.substring(0, 1) === '#') {
            this.trigger('token_comment', tokens);
          } else if (first === 'mtllib') {
            this.trigger('token', first, tokens);
            this.get('_materialQueue').push(tokens);
          } else {
            this.trigger('token', first, tokens);
            this.trigger('token_' + first, tokens);
          }
        }.bind(this));
      }

      this._dec();

      if (!this.get('_objFileResolved') || this.get('_rawQueue').length > 0 || this.get('_lineQueue').length > 0) {
        this.idleParseLineTick();
      }

      this._isDoneLoading();
    }.bind(this), this.get("idleLineTick"));
  },

  /**
   * Shifts an amount of
   * materials to start
   * parsing through
   */
  idleParseMaterialTick: function () {
    this._inc();

    setTimeout(function () {
      var materials = this.get('_materialQueue');

      if (materials.length > 0) {
        var work = materials.splice(0, this.get("popMaxMaterials"));
        var promises = [];

        work.forEach(function (material) {
          var materialResult = {};
          var objUrl = this.get('objUrl').split('/');
          objUrl[objUrl.length - 1] = material[0];
          var materialUrl = objUrl.join('/');

          var p = WaveFrontParser.create({
            objUrl: materialUrl
          }).on('token', function (token, args) {
            materialResult[token] = args;
          }).load().then(function () {
            this.trigger('material', materialUrl, materialResult);
          }.bind(this), function (reason) {
            this.trigger('material_failed', materialUrl, reason);
          }.bind(this));

          promises.push(p);
        }.bind(this));

        var _materialPromises = this.get('_materialPromises');

        var all = Ember.RSVP.Promise.all(promises).then(function () {
          _materialPromises.pop();
          this._dec();
          this.idleParseMaterialTick();
        }.bind(this), function () {
          this._dec();
          this.idleParseMaterialTick();
          _materialPromises.pop();
        }.bind(this));

        _materialPromises.push(all);
        this.set('_materialPromises', _materialPromises);
      } else {
        this._dec();

        if (this.get('_materialPromises').length > 0 || this.get('_lineQueue').length > 0 || !this.get('_objFileResolved')) {
          this.idleParseMaterialTick();
        }

        this._isDoneLoading();
      }
    }.bind(this), this.get("idleMaterialTick"));
  },

  load: function () {
    return this.read(HttpReadStream.create({
      url: this.get("objUrl")
    }));
  },

  read: function (reader) {
    var p = new Ember.RSVP.Promise(function (resolve, reject) {
      this.set("_resolve", resolve);
      this.set("_reject", reject);
      this._inc();

      reader.on("data", function (data) {
        var raw = this.get("_rawQueue");
        this.set("_rawQueue", raw + data);
      }.bind(this)).read().then(function () {
        this.set('_objFileResolved', true);
        this._dec();
      }.bind(this), reject);
    }.bind(this));

    return p;
  }
});

export default WaveFrontParser;