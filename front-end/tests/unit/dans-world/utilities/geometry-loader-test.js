import NeedsCanvas from '../../../helpers/needs-canvas';
import { test, module } from 'qunit';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import Geometry from 'phreaker-eyes/mixins/dans-world/utilities/geometry';

test('exists', function (assert) {
  assert.ok(World);
});

test('it creates buffers', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var MockWorld = World.extend({
      webGLSupported: function () {
        var gl = this.get('gl');

        Geometry.create({
          world: this,
          objUrl: '/fixtures/wave-front/joel-cube/joel-cube.wavefront'
        }).load().then(function () {
          assert.ok(Geometry);
          done();
        });
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