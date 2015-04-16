import Ember from 'ember';
import Shader from 'phreaker-eyes/mixins/dans-world/utilities/shader.js';
import NeedsWorld from 'phreaker-eyes/mixins/dans-world/utilities/needs-world.js';

/**
 * A utility class for linking and
 * using a program.
 *
 * @class Program
 */
export default Ember.Object.extend(NeedsWorld, {
  compileSuccess: false,
  vertexAttributes: [],
  vertexAttributeLocations: Ember.Object.create(),

  initialize: function () {
    Ember.assert(this.get('shaders').length > 0, 'need at least one shader');
    this._program = this.get('gl').createProgram();
  }.on('init'),

  link: function () {
    var self = this;
    var gl = this.get('gl');
    var shaders = this.get('shaders');

    shaders.forEach(function (shader) {
      Ember.assert('Must be an array of shader objects', shader instanceof Shader);
      self.attachShader(shader);
    });

    gl.linkProgram(this._program);
    var success = gl.getProgramParameter(this._program, gl.LINK_STATUS);

    if (!success) {
      Ember.assert(
        'program failed to link: ' + gl.getProgramInfoLog(this._program),
        success
      );
    } else {
      this.set("compileSuccess", true);
      this.enableVertexAttributes();
    }
  },

  enableVertexAttributes: function () {
    if (this.get('compileSuccess')) {
      var self = this;
      var gl = this.get('gl');
      var attributes = this.get('vertexAttributes');
      var attributeLocations = this.get('vertexAttributeLocations');

      attributes.forEach(function (attribute) {
        var loc = gl.getAttribLocation(self._program, attribute);
        Ember.assert('attribute location probably doesn\'t exist: ' + attribute, loc !== -1);
        attributeLocations.set(attribute, loc);
      });
    }
  },

  use: function () {
    this.get('gl').useProgram(this._program);
  },

  attachShader: function (shader) {
    var gl = this.get('gl');
    gl.attachShader(this._program, shader._shader);
  }
});

