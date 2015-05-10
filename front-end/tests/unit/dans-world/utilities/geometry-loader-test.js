import NeedsCanvas from '../../../helpers/needs-canvas';
import { test, module } from 'qunit';
import { expect } from 'chai';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import Texture from 'phreaker-eyes/mixins/dans-world/utilities/texture';
import Geometry from 'phreaker-eyes/mixins/dans-world/utilities/geometry';
import Buffer from 'phreaker-eyes/mixins/dans-world/utilities/buffer';

test('exists', function (assert) {
  assert.ok(World);
});

test('it creates buffers', function (assert) {
  var done = assert.async();

  Ember.run(function () {
    var MockWorld = World.extend({
      webGLSupported: function () {
        var gl = this.get('gl');

        var object = Geometry.create({
          world: this,
          objUrl: '/fixtures/wave-front/joel-cube/joel-cube-warped.wavefront'
        }).load().then(function (buffers) {
          expect(buffers.length).to.eql(1);
          expect(buffers[0].name).to.eql('Cube_Cube.001');
          expect(buffers[0].buffers.v instanceof Buffer).to.eql(true);
          expect(buffers[0].buffers.vn instanceof Buffer).to.eql(true);
          expect(buffers[0].buffers.vt instanceof Buffer).to.eql(true);
          expect(buffers[0].buffers.texture instanceof Texture).to.eql(true);
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