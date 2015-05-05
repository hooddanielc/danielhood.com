import { test, module } from 'qunit';
import { expect } from 'chai';
import Ember from 'ember';
import HttpReadStream from 'phreaker-eyes/mixins/dans-world/utilities/http-read-stream';

test('exists', function (assert) {
  assert.ok(HttpReadStream);
});

test('it creates an XMLHttpRequest object', function (assert) {
  var done = assert.async();

  HttpReadStream.create({
    url: '/fixtures/wave-front/joel-cube/joel-cube-warped.wavefront'
  }).on("XMLHttpRequestCreated", function (req) {
    expect(req instanceof window.XMLHttpRequest).to.eql(true);
    assert.ok(req);
  }).read().then(function () {
    done();
  }).catch(function (err) {
    throw err;
  });
});

test('it loads text through data event', function (assert) {
  var done = assert.async();
  var text = '';

  HttpReadStream.create({
    url: '/fixtures/wave-front/joel-cube/joel-cube-warped.wavefront'
  }).on('data', function (data) {
    assert.ok(data);
    text += data;
  }).read().then(function () {
    expect(text).to.be.a('string');
    done();
  }).catch(function (err) {
    throw err;
  });
});
