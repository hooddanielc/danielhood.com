import Ember from 'ember';
import NeedsWorld from 'phreaker-eyes/mixins/dans-world/utilities/needs-world';

/**
 * A utility class for compiling a shader
 * 
 * @class Shader
 */
var Shader = Ember.Object.extend(NeedsWorld, {
  initialize: function () { var gl = this.get('gl');
    var shader = gl.createShader(this.get('type'));
    gl.shaderSource(shader, this.get('src'));
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      this.compileError(gl.getShaderInfoLog(shader));
      return;
    } else {
      this._shader = shader;
    }
  }.on('init'),

  compileError: function(error) {
    throw error;
  }
});

function getWebGLValue(key) {
  return window.WebGLRenderingContext ? WebGLRenderingContext[key] : null;
}

Shader.VERTEX_SHADER = getWebGLValue('VERTEX_SHADER');
Shader.FRAGMENT_SHADER = getWebGLValue('FRAGMENT_SHADER');

Shader.reopen({
  type: getWebGLValue('VERTEX_SHADER'),

  src: `
    attribute vec3 vertexPos;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    void main(void) {
      gl_Position = projectionMatrix *
        modelViewMatrix *
        vec4(vertexPos, 1.0);
    }
  `
});

export default Shader;

