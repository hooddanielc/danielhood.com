import NeedsCanvas from '../../../helpers/needs-canvas';
import { test, module } from 'qunit';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import Program from 'phreaker-eyes/mixins/dans-world/utilities/program';
import Shader from 'phreaker-eyes/mixins/dans-world/utilities/shader';
import Texture from 'phreaker-eyes/mixins/dans-world/utilities/texture';
import Buffer from 'phreaker-eyes/mixins/dans-world/utilities/buffer';

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

test('exists', function (assert) {
  assert.ok(World);
});

test('creates a opengl rendering context', function (assert) {
  var done = assert.async();
  
  Ember.run(function () {
    var Mock = World.extend({
      webGLSupported: function (gl) {
        assert.ok(gl instanceof window.WebGLRenderingContext, 'give back rendering context');
        this.destroyResources().then(done);
      },

      webGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        done();
      }
    });

    var myWorld = Mock.create({
      element: NeedsCanvas.canvas
    });
  });
});

test('loading a valid texture', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var Mock = World.extend({
      webGLSupported: function (gl) {
        var self = this;

        var texture = Texture.create({
          world: this
        });

        texture.bufferData('/fixtures/nxedigitalrainbow.jpg').then(function () {
          assert.ok(texture.get('image') instanceof window.Image);
          assert.ok(texture._imageLoaded);
          self.startRenderLoop();

          setTimeout(function () {
            Ember.run(function (xhr) {
              assert.ok(texture);
              self.destroyResources().then(done);
            });
          }, 100);
        }, function () {
          assert.ok(false);
          throw new Error("texture image rejected: /fixtures/nxeddigitalrainbow.jpg");
        });
      },

      webGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        myWorld.destroyResources().then(done);
        done(); 
      }
    });

    var myWorld = Mock.create({
      element: NeedsCanvas.canvas
    });
  });
});

test('loading an invalid texture', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var Mock = World.extend({
      webGLSupported: function (gl) {
        var self = this;

        var texture = Texture.create({
          world: this
        });

        texture.bufferData('/fixtures/does-not-exist.jpg').then(function () {
          assert.ok(false);
          throw new Error("texture image not rejected: /fixtures/does-not-exist.jpg");
        }, function () {
          assert.ok(texture);
          self.destroyResources().then(done);
        });
      },

      webGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        myWorld.destroyResources().then(done);
        done(); 
      }
    });

    var myWorld = Mock.create({
      element: NeedsCanvas.canvas
    });
  });
});

test('rendering some inspiration', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var Mock = World.extend({
      webGLSupported: function (gl) {
        var self = this;
        var vertexShader = MockVertexShader.create({ world: this });
        var fragmentShader = MockFragmentShader.create({ world: this });

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

        var rainbowTexture = Texture.create({
          world: this
        });

        var hugFeelsTexture = Texture.create({
          world: this
        });

        var feelsGoodTexture = Texture.create({
          world: this
        });

        Ember.RSVP.Promise.all([
          rainbowTexture.bufferData('/fixtures/nxedigitalrainbow.jpg'),
          hugFeelsTexture.bufferData('/fixtures/inspiration-1.png'),
          feelsGoodTexture.bufferData('/fixtures/inspiration-2.png')
        ]).then(function (results) {
          var squareVertices = [
            // top left face
            -1.0, 1.0, 0.0,
            -1.0, -1.0, 0.0,
            1.0, 1.0, 0.0,

            // bottom right face
            1.0, -1.0, 0.0,
            1.0, 1.0, 0.0,
            -1.0, -1.0, 0.0
          ];

          var squareTextureCoordinates = [
            // top left face
            0.0, 0.0,
            0.0, 1.0,
            1.0, 0.0,

            // bottom right face
            1.0, 1.0,
            1.0, 0.0,
            0.0, 1.0
          ];

          var squareVertexPositionsBuffer = Buffer.create({
            world: self,
            type: gl.ARRAY_BUFFER,
            usage: gl.STATIC_DRAW,
            dimensions: 3,
            size: 6
          });

          squareVertexPositionsBuffer.bind();
          squareVertexPositionsBuffer.bufferData(new Float32Array(squareVertices));

          var squareTextureCoordsBuffer = Buffer.create({
            world: self,
            type: gl.ARRAY_BUFFER,
            usage: gl.STATIC_DRAW,
            dimensions: 2,
            size: 6
          });

          squareTextureCoordsBuffer.bind();
          squareTextureCoordsBuffer.bufferData(new Float32Array(squareTextureCoordinates));
          self.set('squareTextureCoordsBuffer', squareTextureCoordsBuffer);
          self.set('squareVertexPositionsBuffer', squareVertexPositionsBuffer);
          self.set('projectionMatrix', mat4.create());
          self.set('modelViewMatrix', mat4.create());
          self.set('program', program);
          self.set('rainbowTexture', rainbowTexture);
          self.set('hugFeelsTexture', hugFeelsTexture);
          self.set('feelsGoodTexture', feelsGoodTexture);
          self.startRenderLoop();

          setTimeout(function () {
            Ember.run(function () {
              assert.ok(program);
              self.stopRenderLoop();

              setTimeout(function () {
                Ember.run(function () {
                  self.destroyResources().then(done);
                });
              }, 1000);
            });
          }, 99999999);
        }).catch(function (err) {
          throw err;
        });
      },

      rotationRight: 0,
      rotationLeft: 0,

      renderAnimationFrame: function (lastTime) {
        var gl = this.get('gl');
        var projectionMatrix = this.get('projectionMatrix');
        var modelViewMatrix = this.get('modelViewMatrix');
        var squareVertices = this.get('squareVertexPositionsBuffer');
        var squareTextureCoords = this.get('squareTextureCoordsBuffer');
        var rainbowTexture = this.get('rainbowTexture');
        var hugFeelsTexture = this.get('hugFeelsTexture');
        var feelsGoodTexture = this.get('feelsGoodTexture');
        var program = this.get('program');
        mat4.perspective(projectionMatrix, 45, this.element.width / this.element.height, 0.1, 100.0);

        // clear
        gl.viewport(0, 0, this.element.width, this.element.height);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // draw the rainbow background
        mat4.identity(modelViewMatrix);
        mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -16.0]);
        mat4.scale(modelViewMatrix, modelViewMatrix, [16.0, 9.0, 1.0]);
        program.pointBuffer('vertexPosition', squareVertices);
        program.pointBuffer('textureCoord', squareTextureCoords);
        program.uniformMatrix4fv('projectionMatrix', false, projectionMatrix);
        program.uniformMatrix4fv('modelViewMatrix', false, modelViewMatrix);
        program.uniform1i('sampler', 0);
        rainbowTexture.bind();
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // draw the hugs
        this.rotationRight += 0.001 * lastTime;
        mat4.identity(modelViewMatrix);
        mat4.translate(modelViewMatrix, modelViewMatrix, [2.0, 0.0, -5.0]);
        mat4.rotateY(modelViewMatrix, modelViewMatrix, this.rotationRight);
        mat4.rotateX(modelViewMatrix, modelViewMatrix, this.rotationRight);
        mat4.rotateZ(modelViewMatrix, modelViewMatrix, this.rotationRight);
        program.pointBuffer('vertexPosition', squareVertices);
        program.pointBuffer('textureCoord', squareTextureCoords);
        program.uniformMatrix4fv('projectionMatrix', false, projectionMatrix);
        program.uniformMatrix4fv('modelViewMatrix', false, modelViewMatrix);
        program.uniform1i('sampler', 0);
        hugFeelsTexture.bind();
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // draw the feels
        this.rotationLeft -= 0.001 * lastTime;
        mat4.identity(modelViewMatrix);
        mat4.translate(modelViewMatrix, modelViewMatrix, [-2.0, 0.0, -5.0]);
        mat4.rotateY(modelViewMatrix, modelViewMatrix, this.rotationLeft);
        mat4.rotateX(modelViewMatrix, modelViewMatrix, this.rotationLeft);
        mat4.rotateZ(modelViewMatrix, modelViewMatrix, this.rotationLeft);
        program.pointBuffer('vertexPosition', squareVertices);
        program.pointBuffer('textureCoord', squareTextureCoords);
        program.uniformMatrix4fv('projectionMatrix', false, projectionMatrix);
        program.uniformMatrix4fv('modelViewMatrix', false, modelViewMatrix);
        program.uniform1i('sampler', 0);
        feelsGoodTexture.bind();
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      },

      webGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        myWorld.destroyResources().then(done);
        done();
      }
    });

    var myWorld = Mock.create({
      element: NeedsCanvas.canvas
    });
  });
});
