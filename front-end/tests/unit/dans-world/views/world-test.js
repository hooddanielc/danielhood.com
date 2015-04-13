import { test, module } from 'qunit';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
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

test('starting and stopping render loop', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var loopStarted = false;

    var Mock = World.extend({
      webGLSupported: function (gl) {
        var self = this;
        assert.equal(this.get('_eventLoopRunning'), false, 'event loop state should not be running');
        assert.equal(loopStarted, false);
        this.startRenderLoop();

        setTimeout(function () {
          assert.equal(loopStarted, true);
          assert.equal(self.get('_eventLoopRunning'), true, 'event loop state should be running after started');
          myWorld.stopRenderLoop();
          assert.equal(self.get('_eventLoopRunning'), false, 'event loop state should be stopped immendiately');
          done();
        }, 100);
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

