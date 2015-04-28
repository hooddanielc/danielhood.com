import Ember from 'ember';
import NeedsWorld from 'phreaker-eyes/mixins/dans-world/utilities/needs-world.js';

/**
 * An object that represents geometry.
 *
 * @class Geometry
 */
export default Ember.Object.extend(NeedsWorld, {
  objFile: "/assets/world.json",

  load: function () {
    return new Ember.RSVP.Promise(function () {
      // TODO : load object file
      // including images
    });
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
