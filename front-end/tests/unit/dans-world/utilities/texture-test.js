import { test, module } from 'qunit';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import Texture from 'phreaker-eyes/mixins/dans-world/utilities/texture';
var world;

module('phreaker-eyes/mixins/dans-world/views/world', {
  beforeEach: function () {
    Ember.run(function () {
      world = World.create({
        controller: Ember.Object.create()
      });

      world.appendTo('#ember-testing');
    });
  },

  afterEach: function () {
    Ember.run(function () {
      world.destroy();
    });
  }
});

test('exists', function (assert) {
  assert.ok(world);
});

test('creates a opengl rendering context', function (assert) {
  var done = assert.async();
  
  Ember.run(function () {
    var Mock = World.extend({
      webGLSupported: function (gl) {
        assert.ok(gl instanceof window.WebGLRenderingContext, 'give back rendering context');
        myWorld.destroy();
        done(); 
      },

      webGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        myWorld.destroy();
        done(); 
      }
    });

    var myWorld = Mock.create({
      controller: Ember.Object.create(),
    });

    myWorld.appendTo('#ember-testing');
  });
});

test('loading a valid texture', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var loopStarted = false;

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
              self.destroy();
              done();
            });
          }, 100);
        }, function () {
          assert.ok(false);
          throw new Error("texture image rejected: /fixtures/nxeddigitalrainbow.jpg");
        });
      },

      webGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        myWorld.destroy();
        done(); 
      },

      renderAnimationFrame: function (timestamp) {
        loopStarted = true;
      }
    });

    var myWorld = Mock.create({
      controller: Ember.Object.create() 
    });

    myWorld.appendTo('#ember-testing');
  });
});

test('loading an invalid texture', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var loopStarted = false;

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
          self.destroy();
          done();
        });
      },

      webGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        myWorld.destroy();
        done(); 
      },

      renderAnimationFrame: function (timestamp) {
        loopStarted = true;
      }
    });

    var myWorld = Mock.create({
      controller: Ember.Object.create() 
    });

    myWorld.appendTo('#ember-testing');
  });
});

