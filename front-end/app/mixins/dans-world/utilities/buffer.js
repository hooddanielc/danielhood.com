import Ember from 'ember';
import NeedsWorld from 'phreaker-eyes/mixins/dans-world/utilities/needs-world.js';

export default Ember.Object.extend(NeedsWorld, {
  type: window.WebGLRenderingContext ? window.WebGLRenderingContext.ARRAY_BUFFER : null,
  usage: window.WebGLRenderingContext ? window.WebGLRenderingContext.STATIC_DRAW : null,
  dimensions: 1,
  size: 3, 

  initialize: function () {
    var gl = this.get('gl');
    this._buffer = gl.createBuffer();
  }.on('init'),

  bind: function () {
    var gl = this.get('gl');
    gl.bindBuffer(this.get('type'), this._buffer);
  },

  bufferData: function (data, usage) {
    var gl = this.get('gl');
    gl.bufferData(this.get('type'), data, usage);
  }
});

