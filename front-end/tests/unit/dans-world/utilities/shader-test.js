import { test, module } from 'qunit';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import Shader from 'phreaker-eyes/mixins/dans-world/utilities/shader';
import NeedsCanvas from '../../../helpers/needs-canvas';
var world;

module('phreaker-eyes/mixins/dans-world/utilities/shader');

test('exists', function (assert) {
  assert.ok(World);
  assert.ok(Shader);
});

test('intiailization', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var MockShader = Shader.extend({
      compileError: function (error) {
        throw error;
      }
    });

    var MockWorld = World.extend({
      webGLSupported: function () {
        var shader = MockShader.create({
          world: this
        });

        assert.ok(!isNaN(Shader.VERTEX_SHADER));
        assert.ok(!isNaN(Shader.FRAGMENT_SHADER));
        assert.ok(Shader.VERTEX_SHADER === shader.get('type'));
        this.destroyResources().then(done);
      },

      WebGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        this.destroyResources().then(done);
      }
    });

    var myWorld = MockWorld.create({
      element: NeedsCanvas.canvas
    });
  });
});

test('error handling', function (assert) {
  var done = assert.async();
  var errored = false;

  Ember.run(function () {
    var MockShader = Shader.extend({
      src: 'asdfasdfasdf',

      compileError: function (error) {
        assert.ok(error);
        errored = true;
      }
    });

    var MockWorld = World.extend({
      webGLSupported: function () {
        var shader = MockShader.create({
          world: this
        });

        assert.ok(errored);
        this.destroyResources().then(done);
      },

      WebGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
        this.destroyResources().then(done);
      }
    });

    var myWorld = MockWorld.create({
      element: NeedsCanvas.canvas
    });
  });
});

