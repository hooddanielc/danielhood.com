import { test, module } from 'qunit';
import Ember from 'ember';
import NeedsWorld from 'phreaker-eyes/mixins/dans-world/utilities/needs-world';
import World from 'phreaker-eyes/mixins/dans-world/views/world.js';

module('phreaker-eyes/mixins/dans-world/utilities/needs-world');

test('exists', function (assert) {
  assert.ok(NeedsWorld);
  assert.ok(World);
});

test('intiailization', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var initialized = false;

    var Mock = Ember.Object.extend(NeedsWorld, {
      _testInitialized: function () {
        initialized = true;
      }.on('worldEntered')
    });

    var MockWorld = World.extend({
      webGLSupported: function () {
        assert.ok(Mock.create({
          world: this
        }));

        done();
      },

      webGLUnsupported: function (error) {
        assert.ok(error instanceof Error);
      }
    });

    var world = MockWorld.create().appendTo('#ember-testing');
  });
});

test('throws if world instance does not exist', function (assert) {
  Ember.run(function () {
    var initialized = false;

    var Mock = Ember.Object.extend(NeedsWorld, {
      _isInitialized: function () {
        initialized = true;
      }.on('worldEntered')
    });
    
    var failure = false;

    try {
      Mock.create();
    } catch (e) {
      failure = true;
    }

    assert.ok(failure);
    assert.ok(!initialized);
  });
});

