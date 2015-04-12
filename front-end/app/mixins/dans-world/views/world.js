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
   * WebGL rendering context is created
   * after view has been added to
   * the DOM. Remains null if
   * WebGL is not supported. 
   *
   * @property gl
   * @type WebGLRenderingContext
   * @default null
   */
  gl: null,
 
  /**
   * Indicates the state of the
   * event loop. Do not manually
   * modify this property
   */
  _eventLoopRunning: false,

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
      this.webGLUnsupporetd();
      return;
    }

    this.webGLSupported(gl);
    this._startRenderLoop();
    this.gl = gl;
  }.on('didInsertElement'),

  _startRenderLoop: function () {
    var self = this;
    self.set('_eventLoopRunning', true);

    function step() {
      if (self.get('_eventLoopRunning') !== true) {
        return;
      }

      window.requestAnimationFrame(function (timestamp) {
        self.renderAnimationFrame.call(self, timestamp);
        step();
      });
    }

    step();
  },

  /**
   * Listens for window resize event
   *
   * @method _resizeListener
   */
  _resizeListener: function () {
    // TODO - add window resize event
  }.on('didInsertElement'),

  /**
   * Stop listening to all browser
   * events
   *
   * @method _destroyEvents
   */
  _destroyEvents: function () {
    // TODO - remove window resize event
    this.set('_eventLoopRunning',  false);
  }.on('willDestroyElement'),

  /**
   * Resizes the WebGL viewport
   *
   * @method resize
   */
  resize: function () {
    if (!this.gl || !this.element) {
      return;
    }

    this.gl.viewport(
      0,
      0,
      this.element.width,
      this.element.height
    );
  },

  /**
   * Called when WebGL feature
   * has been detected as
   * supported.
   *
   * @method webGLSupported
   * @param {WebGLRenderingContext} gl Rendering context created
   */
  webGLSupported: function () {},

  /**
   * Called when WebGL feature
   * has been detected as
   * unsupported.
   *
   * @method webGLUnsupported
   * @param {Error} error Error instance 
   */
  webGLUnsupported: function () {},
 
  /**
   * Override this method to implement
   * your drawing logic
   *
   * @method renderAnimationFrame
   */
  renderAnimationFrame: function () {
    var gl = this.gl;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
});

