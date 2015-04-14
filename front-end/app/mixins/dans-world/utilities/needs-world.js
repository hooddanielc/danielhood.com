import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';

export default Ember.Mixin.create(Ember.Evented, {
  _assertWorldOk: function () {
    var world = this.get('world');

    if (!(world instanceof World)) {
      throw new Error('object must be initialized with world instance');
    }

    if (!(world.get('gl') instanceof WebGLRenderingContext)) {
      throw new Error('world attribute must have a valid opengl rendering context');
    }

    this.trigger('worldEntered');
  }.on('init'),

  gl: function () {
    return this.get('world').get('gl');
  }.property('world.gl')
});

