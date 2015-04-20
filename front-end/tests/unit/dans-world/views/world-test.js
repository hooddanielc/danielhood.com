import { test, module } from 'qunit';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import NeedsCanvas from '../../../helpers/needs-canvas';

module('phreaker-eyes/mixins/dans-world/views/world', {
  beforeEach: NeedsCanvas.ensureCanvasCreated()
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
        this.destroyResources().then(done);
      }
    });

    var myWorld = Mock.create({
      element: NeedsCanvas.canvas
    });
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

          Ember.run(function () {
            self.destroyResources().then(done);
          });
        }, 100);
      },

      webGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        this.destroyResources().then(done);
      },

      renderAnimationFrame: function (timestamp) {
        loopStarted = true;
      }
    });

    var myWorld = Mock.create({
      element: NeedsCanvas.canvas
    });
  });
});

