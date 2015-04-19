import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';

export default Ember.Mixin.create(Ember.Evented, {
  resourceType: "arbitrary",
  _assertWorldOk: function () {
    var world = this.get('world');

    if (!world || !(world instanceof World)) {
      throw new Error('object must be initialized with world instance');
    }

    if (!(world.get('gl') instanceof WebGLRenderingContext)) {
      throw new Error('world attribute must have a valid opengl rendering context');
    }

    this.trigger('worldEntered');
  }.on('init'),

  _addToWorldResources: function () {
    var resourceType = this.get('resourceType');
    var resourceRoot = this.get('world.resources');

    if (!resourceRoot.get(resourceType)) {
      resourceRoot.set(resourceType, []);
    }

    var resourceArray = resourceRoot.get(resourceType);
    resourceArray.push(this);
  }.on('init'),

  gl: function () {
    Ember.assert('world must be defined. Did you forget to use create instead of new operator?', this.get('world'));
    return this.get('world').get('gl');
  }.property('world.gl')
});
