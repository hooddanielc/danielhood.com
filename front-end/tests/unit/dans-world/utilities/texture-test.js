import NeedsCanvas from '../../../helpers/needs-canvas';
import { test, module } from 'qunit';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import Texture from 'phreaker-eyes/mixins/dans-world/utilities/texture';
var world;

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
