import Ember from 'ember';
import NeedsWorld from 'phreaker-eyes/mixins/dans-world/utilities/needs-world';
import WaveFrontParser from 'phreaker-eyes/mixins/dans-world/utilities/wave-front-parser';
import Buffer from 'phreaker-eyes/mixins/dans-world/utilities/buffer';
import Texture from 'phreaker-eyes/mixins/dans-world/utilities/texture';

/**
 * An object that represents geometry.
 *
 * @class Geometry
 */
export default Ember.Object.extend(NeedsWorld, {
  objUrl: null,
  asyncTick: 1,

  load: function () {
    if (this.get('isLoaded')) {
      return;
    }

    this.set('isLoaded', true);
    var meshes = {};
    var currentObject;
    var self = this;

    return WaveFrontParser.create({
      objUrl: this.get('objUrl')
    }).on('token_o', function (args) {
      currentObject = args[0];

      meshes[currentObject] = {
        v: [],
        vt: [],
        vn: [],
        f: []
      };
    }).on('token_v', function (args) {
      meshes[currentObject].v.push(self._numerize(args));
    }).on('token_vt', function (args) {
      meshes[currentObject].vt.push(self._numerize(args));
    }).on('token_vn', function (args) {
      meshes[currentObject].vn.push(self._numerize(args));
    }).on('token_f', function (args) {
      meshes[currentObject].f.push(args);
    }).on('material', function (url, material) {
      var split = url.split('/');
      split[split.length - 1] = material.map_Kd[0];
      meshes[currentObject].textureUrl = split.join('/');
    }).load().then(function () {
      var promises = [];

      for (var x in meshes) {
        promises.push(this._loadBuffers(x, meshes[x]));
      }

      return Ember.RSVP.Promise.all(promises);
    }.bind(this)).then(function (results) {
      self.set('loadedBuffers', results);
      return results;
    });
  },

  _numerize: function (args) {
    var newArgs = [];

    args.forEach(function (item) {
      newArgs.push(parseFloat(item));
    });

    return newArgs;
  },

  _loadBuffers: function (name, rawObjData) {
    var self = this;
    var v = [];
    var vt = [];
    var vn = [];

    var vDim = 0;
    var vnDim = 0;
    var vtDim = 0;
    var texture;

    return new Ember.RSVP.Promise(function (resolve) {
      async.mapLimit(rawObjData.f, 2000, function (face, cb) {
        face.forEach(function (vertex) {
          var indexes = vertex.split('/');
          var _v = indexes[0] - 1;
          var _vt = indexes[1] - 1;
          var _vn = indexes[2] - 1;

          if (!isNaN(_v)) {
            vDim = rawObjData.v[_v].length;

            for (var i = 0; i < vDim; ++i) {
              v.push(rawObjData.v[_v][i]);
            }
          }

          if (!isNaN(_vt)) {
            vtDim = rawObjData.vt[_vt].length;

            for (var j = 0; j < vtDim; ++j) {
              vt.push(rawObjData.vt[_vt][j]);
            }
          }

          if (!isNaN(_vn)) {
            vnDim = rawObjData.vn[_vn].length;

            for (var k = 0; k < vnDim; ++k) {
              vn.push(rawObjData.vn[_vn][k]);
            }
          }
        });

        setTimeout(function () {
          cb();
        }, self.get('asyncTick'));
      }, function () {
        resolve();
      });
    }).then(function () {
      if (rawObjData.textureUrl) {
        texture = Texture.create({
          world: self.get('world')
        });

        return texture.bufferData(rawObjData.textureUrl);
      }
    }).then(function () {
      var buffs = {};

      if (v.length > 0) {
        buffs.v = Buffer.create({
          world: self.get('world'),
          size: v.length / vDim,
          dimensions: vDim
        });

        buffs.v.bufferData(new Float32Array(v));
      }

      if (vn.length > 0) {
        buffs.vn = Buffer.create({
          world: self.get('world'),
          size: vn.length / vnDim,
          dimensions: vnDim
        });

        buffs.vn.bufferData(new Float32Array(vn));
      }

      if (vt.length > 0) {
        buffs.vt = Buffer.create({
          world: self.get('world'),
          size: vt.length / vtDim,
          dimensions: vtDim
        });

        buffs.vt.bufferData(new Float32Array(vt));
      }

      if (texture) {
        buffs.texture = texture;
      }

      return {
        name: name,
        buffers: buffs
      };
    });
  }
});
