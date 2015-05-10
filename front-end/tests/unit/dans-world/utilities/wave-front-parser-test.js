import { test, module } from 'qunit';
import { expect } from 'chai';
import Ember from 'ember';
import WaveFrontParser from 'phreaker-eyes/mixins/dans-world/utilities/wave-front-parser';

test('exists', function (assert) {
  assert.ok(WaveFrontParser);
});

test('it loads a huge file while UI remains responsive to user :)', function (assert) {
  var done = assert.async();
  var eventsCalled = [];

  WaveFrontParser.create({
    objUrl: '/fixtures/wave-front/joel-cube/joel-cube-warped.wavefront'
  }).on('token', function (token, args) {
    eventsCalled[0] = 'token';
    expect(token).to.be.a('string');
    expect(args).to.be.a('array');
  }).on('token_f', function (args) {
    eventsCalled[1] = args;
    expect(args).to.be.a('array');
  }).on('material', function (url, args) {
    eventsCalled[2] = args;
    expect(url).to.be.a('string');
    expect(args).to.be.a('array');
  }).load().then(function () {
    expect(eventsCalled.length).to.eql(3);
    assert.ok(WaveFrontParser);
    done();
  }).catch(function (err) {
    throw err;
  });
});
