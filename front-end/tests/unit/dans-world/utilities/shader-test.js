import { test, module } from 'qunit';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import Shader from 'phreaker-eyes/mixins/dans-world/utilities/shader';
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
      // TODO
    });

    var MockWorld = World.extend({
      webGLSupported: function () {
       var shader = MockShader.create({
         world: this
       });

       assert.ok(shader);
       done();
      },

      WebGLUnsupported: function (error) {
        assert.ok(error instanceof Error, 'instance must be of type Error');
      }
    });

    MockWorld.create().appendTo('#ember-testing');
  });
});

