import Ember from 'ember';
import NeedsWorld from 'phreaker-eyes/mixins/dans-world/utilities/needs-world.js';
import WaveFrontParser from 'phreaker-eyes/mixins/dans-world/utilities/wave-front-parser.js';

/**
 * An object that represents geometry.
 *
 * @class Geometry
 */
export default Ember.Object.extend(NeedsWorld, {
  objUrl: null,

  load: function () {
    if (this.get('isLoaded')) {
      return;
    }

    this.set('isLoaded', true);
    var meshes = {};
    var currentObject;

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
      meshes[currentObject].v.push(args);
    }).on('token_vt', function (args) {
      meshes[currentObject].vt.push(args);
    }).on('token_vn', function (args) {
      meshes[currentObject].vn.push(args);
    }).on('token_f', function (args) {
      meshes[currentObject].f.push(args);
    }).on('material', function (url, material) {
      var split = url.split('/');
      split[split.length - 1] = material.map_Kd[0];
      meshes[currentObject].textureUrl = split.join('/');
    }).load().then(function () {
      // TODO - this is where we
      // create the buffers
      console.log(meshes);
    });
  }
});
