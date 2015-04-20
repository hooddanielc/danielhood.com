import { test, module } from 'qunit';
import { expect } from 'chai';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import Shader from 'phreaker-eyes/mixins/dans-world/utilities/shader';
import Program from 'phreaker-eyes/mixins/dans-world/utilities/program';
import NeedsCanvas from '../../../helpers/needs-canvas';

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

    varying vec4 color;

    void main(void) {
      gl_Position = projectionMatrix * modelViewMatrix *
        vec4(vertexPosition, 1.0);
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
        var vals = program.get('vertexAttributeLocations').getProperties('vertexPosition', 'vertexColor');
        var uls =  program.get('uniformLocations').getProperties('modelViewMatrix', 'projectionMatrix');
        expect(vals.vertexPosition).to.be.a('number');
        expect(vals.vertexColor).to.be.a('number');
        assert.ok(uls.modelViewMatrix instanceof window.WebGLUniformLocation);
        assert.ok(uls.projectionMatrix instanceof window.WebGLUniformLocation);
        assert.ok(program);
        this.startRenderLoop();
        var self = this;

        setTimeout(function () {
          Ember.run(function () {
            self.stopRenderLoop();
            self.destroyResources().then(done);
          });
        }, 100);
      },

      WebGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        done();
      }
    });

    var myWorld = MockWorld.create({
      element: NeedsCanvas.canvas
    });
  });
});
