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

  /*
  * The resource property holds
  * all references to objects needing the
  * world instance. The resources are
  * destroyed when the `destroy` or
  * destroyResources is invoked.
  *
  * @property resources
  * @default Object
  */
  resources: Ember.Object.create(),

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

  _initWebGLIfCanvasExists: function () {
    if (this.get('element')) {
      this._initWebGL();
    }
  }.on('init'),

  /**
   * Initializes webgl context and
   * handles feature detection for
   * WebGL
   *
   * @method _initWebGL
   */
  _initWebGL: function () {
    if (window.WebGLRenderingContext && this.get('gl') instanceof WebGLRenderingContext) {
      return;
    }

    Ember.assert('init webgl requires a canvas element', this.get('element'));
    var gl = null;

    try {
      gl = this.element.getContext('webgl') || this.element.getContext('experimental-webgl');

      if (!gl) {
        throw new Error('Unable to initialize WebGL. Your browser may not support it.');
      }
    } catch (e) {
      this.webGLUnsupported();
      return;
    }

    this.set('gl', gl);
    this.webGLSupported(gl);
    this._resizeListener();
  }.on('didInsertElement'),

  startRenderLoop: function () {
    var self = this;

    if (self.get('_eventLoopRunning') === true) {
      return;
    }

    self.set('_eventLoopRunning', true);

    function step() {
      if (self.get('_eventLoopRunning') !== true) {
        self.trigger('renderLoopSuccessfullyStopped');
        return;
      }

      window.requestAnimationFrame(function (timestamp) {
        if (!self.gl || self.isDestroying || self.isDestroyed) {
          return;
        }

        self.renderAnimationFrame.call(self, timestamp);
        step();
      });
    }

    step();
  },

  stopRenderLoop: function () {
    var self = this;

    var promise = new Ember.RSVP.Promise(function (resolve) {
      if (self.get('_eventLoopRunning') === false) {
        resolve();
        return;
      } else {
        self.set('_eventLoopRunning', false);

        self.one('renderLoopSuccessfullyStopped', function () {
          resolve();
        }); 
      }
    });

    return promise;
  },

  /**
   * Listens for window resize event
   *
   * @method _resizeListener
   */
  _resizeListener: function () {
    this._boundResizeEventRef = this.resize.bind(this);
    window.addEventListener('resize', this._boundResizeEventRef);
  },

  /**
   * Stop listening to all browser
   * events
   *
   * @method _destroyEvents
   */
  _destroyEvents: function () {
    window.removeEventListener('resize', this._boundResizeEventRef);
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
  },

  /**
  * Removes all resources used inside
  * this world. This is useful
  * in case you would like to reuse the
  * the same WebGL context and canvas element.
  *
  * @method destroyAllResources
  */
  destroyResources: function () {
    var self = this;

    return this.stopRenderLoop().then(function () {
      return new Ember.RSVP.Promise(function (resolve) {
        var resources = self.get('resources');
        var valuesToDestroy = resources.get('arbitrary');

        if (!valuesToDestroy) {
          resolve();
        } else {
          valuesToDestroy.forEach(function (resource) {
            resource.destroy();
          });

          self._destroyEvents();
          resolve();
        }
      });
    });
  },

  willDestroy: function () {
    this.destroyResources();
  }
});
