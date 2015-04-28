import NeedsCanvas from '../../../helpers/needs-canvas';
import { test, module } from 'qunit';
import Ember from 'ember';
import World from 'phreaker-eyes/mixins/dans-world/views/world';
import Geometry from 'phreaker-eyes/mixins/dans-world/utilities/geometry';

test('exists', function (assert) {
  assert.ok(World);
});

test('it loads json', function (assert) {
  // TODO - create a world instance
  assert.ok(Geometry);
});
