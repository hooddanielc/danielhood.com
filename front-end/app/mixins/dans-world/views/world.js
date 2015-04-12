import Ember from 'ember';

/**
 * The first step to creating a 
 * 3D applications is extending
 * this class. It represents all
 * the scenes that make up your
 * 3D world. You could look at it
 * as being a map
 *
 * @class World
 */
 
export default Ember.View.extend({
  tagName: 'canvas',
 
  /**
   * @property gl
   * @type WebGLRenderingContext
   * @default null
   */
  gl: null,
 
  /**
   * Initializes webgl context and
   * handles feature detection for
   * WebGL
   *
   * @method _initWebGL
   */
  _initWebGL: function () {
    var gl = null;

    try {
      gl = this.element.getContext('webgl') || this.element.getContext('experimental-webgl');

      if (!gl) {
        throw new Error('Unable to initialize WebGL. Your browser may not support it.');
      }
    } catch (e) {
      // TODO: implment handle for 
      // webgl unsupported
      alert('webgl is not supported on this browser');
      return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.gl = gl;
  }.on('didInsertElement'),

  /**
   * Listens for window resize event
   *
   * @method _resizeListener
   */
  _resizeListener: function () {
    this.$(window).on('resize', this.resize.bind(this));
  }.on('didInsertElement'),

  /**
   * Stop listening to all browser
   * events
   *
   * @method _destroyEvents
   */
  _destroyEvents: function () {
    this.$(window).off('resize', this.resize.bind(this));
  }.on('willDestroyElement'),

  /**
   * Resizes the WebGL viewport
   *
   * @method resize
   */
  resize: function () {
    if (!this.gl) {
      return;
    }

    this.gl.viewport(
      0,
      0,
      this.element.width,
      this.element.height
    );
  }
});

