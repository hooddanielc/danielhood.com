import Ember from 'ember';
import NeedsWorld from 'phreaker-eyes/mixins/dans-world/utilities/needs-world.js';
import ObjParser from 'phreaker-eyes/mixins/dans-world/utilities/wave-front-parser.js';

/**
 * An object that represents geometry.
 *
 * @class Geometry
 */
export default Ember.Object.extend(NeedsWorld, {
  objFile: null,
  loadingPromise: null,

  load: function () {
    var p = ObjParser.create({
      objFile: "/public/fixtures/wave-front/v-for-vendetta-mask/vmask.obj"
    }).load();

    this.set('loadingPromise', p);
  },

  getBuffers: function () {
    return new Ember.RSVP.Promise(function () {
      // TODO : load the geometry
      // to gpu, and return 
      // an object that also has
      // an `mat4 mvp` property
      // with all instances of the
      // buffers with a bind method
    });
  },

  intialize: function () {
    console.log('TODO');
  }.on('init')
});
