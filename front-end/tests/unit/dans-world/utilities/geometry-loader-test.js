import NeedsCanvas from '../../../helpers/needs-canvas';
import { test, module } from 'qunit';
import { expect } from 'chai';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import Texture from 'phreaker-eyes/mixins/dans-world/utilities/texture';
import Geometry from 'phreaker-eyes/mixins/dans-world/utilities/geometry';
import Buffer from 'phreaker-eyes/mixins/dans-world/utilities/buffer';
import Shader from 'phreaker-eyes/mixins/dans-world/utilities/shader';
import Program from 'phreaker-eyes/mixins/dans-world/utilities/program';

test('exists', function (assert) {
  assert.ok(World);
});

var MockVertexShader = Shader.extend({
  type: Shader.VERTEX_SHADER,
  src: `
    attribute vec3 vertexPosition;
    attribute vec2 textureCoord;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    varying vec2 outTextureCoord;

    void main(void) {
        gl_Position = projectionMatrix *
          modelViewMatrix * vec4(vertexPosition, 1.0);
        outTextureCoord = textureCoord;
    }
  `
});

var MockFragmentShader = Shader.extend({
  type: Shader.FRAGMENT_SHADER,
  src: `
    precision mediump float;
    varying vec2 outTextureCoord;
    uniform sampler2D sampler;

    void main(void) {
        gl_FragColor = texture2D(sampler, vec2(outTextureCoord.s, outTextureCoord.t));
    }
  `
});

test('it creates buffers', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var MockWorld = World.extend({
      rotation: 0,

      webGLSupported: function () {
        var self = this;
        var gl = this.get('gl');
        var vertexShader = MockVertexShader.create({ world: this });
        var fragmentShader = MockFragmentShader.create({ world: this });
        gl.enable(gl.DEPTH_TEST);

        var program = Program.create({
          vertexAttributes: [
            'vertexPosition',
            'textureCoord'
          ],
          uniforms: [
            'modelViewMatrix',
            'projectionMatrix',
            'sampler'
          ],
          world: this,
          shaders: [
            vertexShader,
            fragmentShader
          ]
        });

        program.link();
        this.set('program', program);
        this.rotationRight = 0;

        var object = Geometry.create({
          world: this,
          objUrl: '/fixtures/wave-front/joel-cube/joel-cube-warped.wavefront'
        }).load().then(function (buffers) {
          expect(buffers.length).to.eql(1);
          expect(buffers[0].name).to.eql('Cube_Cube.001');
          expect(buffers[0].buffers.v instanceof Buffer).to.eql(true);
          expect(buffers[0].buffers.vn instanceof Buffer).to.eql(true);
          expect(buffers[0].buffers.vt instanceof Buffer).to.eql(true);
          expect(buffers[0].buffers.texture instanceof Texture).to.eql(true);
          assert.ok(buffers);
          self.set('joelCube', buffers[0].buffers);
          self.set('projectionMatrix', mat4.create());
          self.set('modelViewMatrix', mat4.create());
          self.startRenderLoop();

          setTimeout(function () {
            Ember.run(function () {
              self.stopRenderLoop();

              setTimeout(function () {
                Ember.run(function () {
                  self.destroyResources().then(done);
                });
              }, 1000);
            });
          }, 100);
        });
      },

      renderAnimationFrame: function (lastTime) {
        var gl = this.get('gl');

        // clear
        gl.viewport(0, 0, this.element.width, this.element.height);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // perspective
        var projectionMatrix = this.get('projectionMatrix');
        var modelViewMatrix = this.get('modelViewMatrix');
        this.rotationRight += 0.001 * lastTime;
        mat4.perspective(projectionMatrix, 45, this.element.width / this.element.height, 0.1, 100.0);
        mat4.identity(modelViewMatrix);
        mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -5.0]);
        mat4.rotateY(modelViewMatrix, modelViewMatrix, this.rotationRight);
        mat4.rotateX(modelViewMatrix, modelViewMatrix, this.rotationRight);
        mat4.rotateZ(modelViewMatrix, modelViewMatrix, this.rotationRight);

        // draw cube
        var program = this.get('program');
        var cube = this.get('joelCube');

        program.use();
        program.pointBuffer('vertexPosition', cube.v);
        program.pointBuffer('textureCoord', cube.vt);
        program.uniformMatrix4fv('projectionMatrix', false, projectionMatrix);
        program.uniformMatrix4fv('modelViewMatrix', false, modelViewMatrix);
        program.uniform1i('sampler', 0);
        cube.texture.bind();
        gl.drawArrays(gl.TRIANGLES, 0, cube.v.get('size'));
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