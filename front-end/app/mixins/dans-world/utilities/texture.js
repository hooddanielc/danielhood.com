import Ember from 'ember';
import Buffer from 'phreaker-eyes/mixins/dans-world/utilities/buffer';

export default Buffer.extend({
  type: window.WebGLRenderingContext ? window.WebGLRenderingContext.TEXTURE_2D : null,
  activeTexture: 0,
  image: null,

  initialize: function () {
    var gl = this.get('gl');
    this._imageLoaded = false;
    this._buffer = gl.createTexture();
  }.on('init'),

  bind: function () {
    var gl = this.get('gl');
    var activeTexture = 'TEXTURE' + this.get('activeTexture');
    Ember.assert('webgl texture variable must exist', gl[activeTexture]);
    gl.activeTexture(gl[activeTexture]);
    gl.bindTexture(this.get('type'), this._buffer);
  },

  unbind: function () {
    var gl = this.get('gl');
    gl.bindTexture(this.get('type'), null);
  },

  bindParameters: function () {
    var image = this.get('image');
    Ember.assert('bindParameters requires a valid loaded image', this._imageLoaded && image instanceof window.Image);
    var gl = this.get('gl');
    this.bind();
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    this.unbind();
  },

  bufferData: function (data) {
    var self = this;

    return new Ember.RSVP.Promise(function (resolve, reject) {
      var image = new Image();

      Ember.$(image).attr('src', data).load(function () {
        self.set('image', image);
        self._imageLoaded = true;
        self.bindParameters();
        resolve();
      }).error(reject);
    });
  }
});
