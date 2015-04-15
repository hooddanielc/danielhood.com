import { test, module } from 'qunit';
import { expect } from 'chai';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import Shader from 'phreaker-eyes/mixins/dans-world/utilities/shader';
import Program from 'phreaker-eyes/mixins/dans-world/utilities/program';
var world;
module('phreaker-eyes/mixins/dans-world/utilities/program');

test('exists', function (assert) {
  assert.ok(World);
  assert.ok(Shader);
});

var MockVertexShader = Shader.extend({
  type: Shader.VERTEX_SHADER,

  src: `
    attribute vec3 vertextPosition;
    attribute vec4 vertexColor;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    varying vec4 color;

    void main(void) {
      gl_Position = projectionMatrix * modelViewMatrix *
        vec4(vertextPosition, 1.0);
      color = vertexColor;
    }
  `
});

var MockFragmentShader = Shader.extend({
  type: Shader.FRAGMENT_SHADER,

  src: `
    precision mediump float;
    varying vec4 color;

    void main(void) {
      gl_FragColor = color;
    }
  `
});

test('intiailization', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var MockWorld = World.extend({
      webGLSupported: function () {
        var vertexShader = MockVertexShader.create({ world: this });
        var fragmentShader = MockFragmentShader.create({ world: this });

        var program = Program.create({
          world: this,
          shaders: [
            vertexShader,
            fragmentShader
          ]
        });

        program.link();
        assert.ok(program);
        done();
      },

      WebGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        done();
      }
    });

    MockWorld.create().appendTo('#ember-testing');
  });
});

// TODO : create functionality for
// getting and setting attributes
// and uniforms. 

