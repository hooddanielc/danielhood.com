import Ember from 'ember';
import Buffer from 'phreaker-eyes/mixins/dans-world/utilities/buffer';
import Shader from 'phreaker-eyes/mixins/dans-world/utilities/shader';
import NeedsWorld from 'phreaker-eyes/mixins/dans-world/utilities/needs-world';

/**
 * A utility class for linking and
 * using a program.
 *
 * @class Program
 */
var Program = Ember.Object.extend(NeedsWorld, {
  compileSuccess: false,
  vertexAttributes: [],
  uniforms: [],
  vertexAttributeLocations: Ember.Object.create(),
  uniformLocations: Ember.Object.create(),

  initialize: function () {
    this.use();
    Ember.assert(this.get('shaders').length > 0, 'need at least one shader');
    this._program = this.get('gl').createProgram();
  }.on('init'),

  /**
  * Call when you want to link the shaders
  *
  * @method link
  */
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
      this.enableUniforms();
    }
  },

  /**
  * Gets attribute locations and fails
  * if program isn't linked yet. Method
  * is called during link()
  *
  * @method enableVertexAttributes
  */
  enableVertexAttributes: function () {
    if (this.get('compileSuccess')) {
      this.use();
      var self = this;
      var gl = this.get('gl');
      var attributes = this.get('vertexAttributes');
      var attributeLocations = this.get('vertexAttributeLocations');

      attributes.forEach(function (attribute) {
        var loc = gl.getAttribLocation(self._program, attribute);
        Ember.assert('program is not a program object', loc !== gl.INVALID_OPERATION);
        Ember.assert('attribute location probably doesn\'t exist: ' + attribute, loc !== -1);
        gl.enableVertexAttribArray(loc);
        attributeLocations.set(attribute, loc);
      });
    }
  },

  /**
  * Gets uniform locations and fails
  * if program isn't linked yet. Method
  * is called during link()
  *
  * @method enableUniforms
  */
  enableUniforms: function () {
    if (this.get('compileSuccess')) {
      this.use();
      var self = this;
      var gl = this.get('gl');
      var uniforms = this.get('uniforms');
      var uniformLocations = this.get('uniformLocations');

      uniforms.forEach(function (uniform) {
        var loc = gl.getUniformLocation(self._program, uniform);
        Ember.assert('could not enable uniform because program is not generated by webgl.', loc !== gl.INVALID_VALUE);
        Ember.assert('program is not a program object', loc !== gl.INVALID_OPERATION);
        Ember.assert('could not get uniform location because it does not exist: ' + uniform, loc !== -1);
        uniformLocations.set(uniform, loc);
      });
    }
  },

  /**
  * Calls gl.useProgram using the
  * webgl context from World instance
  *
  * @method use
  */
  use: function () {
    this.get('gl').useProgram(this._program);
  },

  /**
  * Attaches a shader using
  * gl.attachShader()
  *
  * @method attachShader
  * @param {uint} shader opengl shader instance
  */
  attachShader: function (shader) {
    var gl = this.get('gl');
    gl.attachShader(this._program, shader._shader);
  },

  /**
  * Calls gl.vertexAttribPointer
  *
  * @method pointBuffer
  */
  pointBuffer: function (attributeName, buffer, type, normalized, stride, offset) {
    Ember.assert('buffer needs to be of type buffer', buffer instanceof Buffer);
    var gl = this.get('gl');
    var loc = this.get('vertexAttributeLocations.' + attributeName);
    normalized = normalized || false;
    stride = stride || 0;
    offset = offset || 0;
    type = type || gl.FLOAT;
    buffer.bind();

    gl.vertexAttribPointer(
      loc,
      buffer.get('dimensions'),
      type,
      normalized,
      stride,
      offset
    );
  },

  /**
  * sets uniform float value
  *
  * @param {String} name uniform variable name
  * @param {Float} glFloatX uniform value
  * @method uniform1f
  */
  uniform1f: function (name, glFloatX) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform1f(loc, glFloatX);
  },

  /**
  * sets uniform float array value
  *
  * @param {String} name uniform variable name
  * @param {Float32Array} glFloatArray uniform value
  * @method uniform1fv
  */
  uniform1fv: function (name, glFloatArray) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform1fv(loc, glFloatArray);
  },

  /**
  * sets uniform integer value
  *
  * @param {String} name uniform variable name
  * @param {Integer} glIntX uniform value
  * @method uniform1i
  */
  uniform1i: function (name, glIntX) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform1i(loc, glIntX);
  },

  /**
  * sets uniform integer array value
  *
  * @param {String} name uniform variable name
  * @param {IntegerArray} glIntArray uniform value
  * @method uniform1iv
  */
  uniform1iv: function (name, glIntArray) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform1iv(loc, glIntArray);
  },

  /**
  * sets 2 dimensional uniform vector value
  *
  * @param {String} name uniform variable name
  * @param {Float} glFloatX uniform[0] value
  * @param {Float} glFloatY uniform[1] value
  * @method uniform2f
  */
  uniform2f: function (name, glFloatX, glFloatY) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform2f(loc, glFloatX, glFloatY);
  },

  /**
  * sets 2 dimensional uniform vector float array value
  *
  * @param {String} name uniform variable name
  * @param {Float32Array} glFloatArray uniform value
  * @method uniform2fv
  */
  uniform2fv: function (name, glFloatArray) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform2fv(loc, glFloatArray);
  },

  /**
  * sets 2 dimensional uniform vector integer value
  *
  * @param {String} name uniform variable name
  * @param {Integer} glIntX uniform[0] value
  * @param {Integer} glIntY uniform[1] value
  * @method uniform2i
  */
  uniform2i: function (name, glIntX, glIntY) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform2i(loc, glIntX, glIntY);
  },

  /**
  * sets 2 dimensional uniform vector integer array value
  *
  * @param {String} name uniform variable name
  * @param {IntegerArray} glIntArray uniform value
  * @method uniform2iv
  */
  uniform2iv: function (name, glIntArray) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform2iv(loc, glIntArray);
  },

  /**
  * sets 3 dimensional uniform vector float value
  *
  * @param {String} name uniform variable name
  * @param {Float} glFloatX uniform[0] value
  * @param {Float} glFloatY uniform[1] value
  * @param {Float} glFloatZ uniform[2] value
  * @method uniform3f
  */
  uniform3f: function (name, glFloatX, glFloatY, glFloatZ) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform3f(loc, glFloatX, glFloatY, glFloatZ);
  },

  /**
  * sets 3 dimensional uniform vector float array value
  *
  * @param {String} name uniform variable name
  * @param {Float32Array} glFloatArray uniform value
  * @method uniform3fv
  */
  uniform3fv: function (name, glFloatArray) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform3fv(loc, glFloatArray);
  },

  /**
  * sets 3 dimensional uniform vector integer value
  *
  * @param {String} name uniform variable name
  * @param {Integer} glIntX uniform[0] value
  * @param {Integer} glIntY uniform[1] value
  * @param {Integer} glIntZ uniform[2] value
  * @method uniform3i
  */
  uniform3i: function (name, glIntX, glIntY, glIntZ) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform3i(loc, glIntX, glIntY, glIntZ);
  },

  /**
  * sets 3 dimensional uniform vector integer array value
  *
  * @param {String} name uniform variable name
  * @param {Float32Array} glIntArray uniform value
  * @method uniform3iv
  */
  uniform3iv: function (name, glIntArray) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform3iv(loc, glIntArray);
  },

  /**
  * sets 3 dimensional uniform vector float value
  *
  * @param {String} name uniform variable name
  * @param {Float} glFloatX uniform[0] value
  * @param {Float} glFloatY uniform[1] value
  * @param {Float} glFloatZ uniform[2] value
  * @param {Float} glFloatW uniform[3] value
  * @method uniform4f
  */
  uniform4f: function (name, glFloatX, glFloatY, glFloatZ, glFloatW) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform4f(loc, glFloatX, glFloatY, glFloatZ, glFloatW);
  },

  /**
  * sets 3 dimensional uniform vector integer array value
  *
  * @param {String} name uniform variable name
  * @param {Float32Array} glFloatArray uniform value
  * @method uniform4fv
  */
  uniform4fv: function (name, glFloatArray) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform4fv(loc, glFloatArray);
  },

  uniform4i: function (name, glIntX, glIntY, glIntZ, glIntW) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform4i(loc, glIntX, glIntY, glIntZ, glIntW);
  },

  uniform4iv: function (name, glIntArray) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniform4iv(loc, glIntArray);
  },

  uniformMatrix2fv: function (name, transpose, glFloatArray) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniformMatrix2fv(loc, transpose, glFloatArray);
  },

  uniformMatrix3fv: function (name, transpose, glFloatArray) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniformMatrix3fv(loc, transpose, glFloatArray);
  },

  uniformMatrix4fv: function (name, transpose, glFloatArray) {
    var loc = this.get('uniformLocations.' + name);
    this.get('gl').uniformMatrix4fv(loc, transpose, glFloatArray);
  },

  willDestroy: function () {
    this.get('gl').deleteProgram(this._program);
  }
});

export default Program;

