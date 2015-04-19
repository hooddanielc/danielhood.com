import { test, module } from 'qunit';
import { expect } from 'chai';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import Shader from 'phreaker-eyes/mixins/dans-world/utilities/shader';
import Program from 'phreaker-eyes/mixins/dans-world/utilities/program';
import Buffer from 'phreaker-eyes/mixins/dans-world/utilities/buffer';
var world;
module('phreaker-eyes/mixins/dans-world/utilities/program');

test('exists', function (assert) {
  assert.ok(World);
  assert.ok(Shader);
});

var MockVertexShader = Shader.extend({
  type: Shader.VERTEX_SHADER,

  src: `
    attribute vec3 vertexPosition;
    attribute vec4 vertexColor;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    varying vec4 vColor;

    void main(void) {
      gl_Position = projectionMatrix * modelViewMatrix *
        vec4(vertexPosition, 1.0);
      vColor = vertexColor;
    }
  `
});

var MockFragmentShader = Shader.extend({
  type: Shader.FRAGMENT_SHADER,

  src: `
    precision mediump float;
    varying vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
  `
});

test('intiailization', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var MockWorld = World.extend({
      webGLSupported: function () {
        var gl = this.get('gl');
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        var vertexShader = MockVertexShader.create({ world: this });
        var fragmentShader = MockFragmentShader.create({ world: this });

        var program = Program.create({
          vertexAttributes: [
            'vertexPosition',
            'vertexColor'
          ],
          uniforms: [
            'modelViewMatrix',
            'projectionMatrix'
          ],
          world: this,
          shaders: [
            vertexShader,
            fragmentShader
          ]
        });

        program.link();

        var pyramidVertices = [
          // Front face
           0.0,  1.0,  0.0,
          -1.0, -1.0,  1.0,
           1.0, -1.0,  1.0,

          // Right face
           0.0,  1.0,  0.0,
           1.0, -1.0,  1.0,
           1.0, -1.0, -1.0,

          // Back face
           0.0,  1.0,  0.0,
           1.0, -1.0, -1.0,
          -1.0, -1.0, -1.0,

          // Left face
           0.0,  1.0,  0.0,
          -1.0, -1.0, -1.0,
          -1.0, -1.0,  1.0
        ];

        var pyramidColors = [
          // Front face
          1.0, 0.0, 0.0, 1.0,
          0.0, 1.0, 0.0, 1.0,
          0.0, 0.0, 1.0, 1.0,

          // Right face
          1.0, 0.0, 0.0, 1.0,
          0.0, 0.0, 1.0, 1.0,
          0.0, 1.0, 0.0, 1.0,

          // Back face
          1.0, 0.0, 0.0, 1.0,
          0.0, 1.0, 0.0, 1.0,
          0.0, 0.0, 1.0, 1.0,

          // Left face
          1.0, 0.0, 0.0, 1.0,
          0.0, 0.0, 1.0, 1.0,
          0.0, 1.0, 0.0, 1.0
        ];

        var pyramidColorsBuffer = Buffer.create({
          world: this,
          type: gl.ARRAY_BUFFER,
          usage: gl.STATIC_DRAW,
          dimensions: 4,
          size: 12
        });

        pyramidColorsBuffer.bind();
        pyramidColorsBuffer.bufferData(new Float32Array(pyramidColors));

        var pyramidVerticesBuffer = Buffer.create({
          world: this,
          type: gl.ARRAY_BUFFER,
          usage: gl.STATIC_DRAW,
          dimensions: 3,
          size: 12
        });

        pyramidVerticesBuffer.bind();
        pyramidVerticesBuffer.bufferData(new Float32Array(pyramidVertices));
        this.set('pyramidVerticesBuffer', pyramidVerticesBuffer);
        this.set('pyramidColorsBuffer', pyramidColorsBuffer);
        this.set('program', program);
        this.set('projectionMatrix', mat4.create());
        this.set('modelViewMatrix', mat4.create());
        this.startRenderLoop();
        var self = this;

        setTimeout(function () {
          Ember.run(function () {
            assert.ok(program);
            self.stopRenderLoop();
            self.destroy();
            done();
          });
        }, 100);
      },

      renderAnimationFrame: function () {
        var gl = this.get('gl');
        var pyramidVertices = this.get('pyramidVerticesBuffer');
        var pyramidColors = this.get('pyramidColorsBuffer');
        var program = this.get('program');
        var projectionMatrix = this.get('projectionMatrix');
        var modelViewMatrix = this.get('modelViewMatrix');
        mat4.perspective(projectionMatrix, 45, this.element.width / this.element.height, 0.1, 100.0);
        mat4.identity(modelViewMatrix);
        mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -5.0]);
        gl.viewport(0, 0, this.element.width, this.element.height);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        program.pointBuffer('vertexPosition', pyramidVertices);
        program.pointBuffer('vertexColor', pyramidColors);
        program.uniformMatrix4fv('projectionMatrix', false, projectionMatrix);
        program.uniformMatrix4fv('modelViewMatrix', false, modelViewMatrix);
        gl.drawArrays(gl.TRIANGLES, 0, 12);
      },

      WebGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        done();
      }
    });

    MockWorld.create().appendTo('#ember-testing');
  });
});
