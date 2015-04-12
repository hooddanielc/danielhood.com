import { test, module } from 'qunit';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
var world;

module('phreaker-eyes/mixins/dans-world/views/world', {
  beforeEach: function () {
    Ember.run(function () {
      world = new World({
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

test('it exists', function (assert) {
  assert.ok(world);
});

test('it creates a opengl rendering context', function (assert) {
  var done = assert.async();
  
  Ember.run(function () {
    var Mock = World.extend({
      webGLSupported: function (gl) {
        assert.ok(gl instanceof window.WebGLRenderingContext, 'give back rendering context');
        myWorld.destroy();
        done(); 
      },

      webGLUnsupported: function (error) {
        assert.ok(!error, 'it needs webgl to be supported');
        myWorld.destroy();
        done(); 
      }
    });

    var myWorld = new Mock({
      controller: Ember.Object.create(),
    });

    myWorld.appendTo('#ember-testing');
  });
});

