import { test, module } from 'qunit';
import { expect } from 'chai';
import Ember from 'ember';
import WaveFrontParser from 'phreaker-eyes/mixins/dans-world/utilities/wave-front-parser';

test('exists', function (assert) {
  assert.ok(WaveFrontParser);
});

test('it loads a huge file', function (assert) {
  var done = assert.async();

  WaveFrontParser.create({
    objUrl: "/fixtures/wave-front/joel-cube/joel-cube-warped.wavefront"
  }).on("token_v", function () {

  }).on("token_vt", function () {

  }).load().then(function () {
    assert.ok(WaveFrontParser);
    done();
  }).catch(function (err) {
    throw err;
  });
});
