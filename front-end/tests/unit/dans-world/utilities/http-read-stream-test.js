import NeedsCanvas from '../../../helpers/needs-canvas';
import { test, module } from 'qunit';
import Ember from 'ember';
import HttpReadStream from 'phreaker-eyes/mixins/dans-world/utilities/http-read-stream';

test('exists', function (assert) {
  assert.ok(HttpReadStream);
});

test('it loads json', function (assert) {
  // TODO - create a world instance
  assert.ok(HttpReadStream);
});
