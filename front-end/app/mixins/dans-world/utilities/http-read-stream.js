import Ember from 'ember';

/**
 * Incremently loads data over http.
 * Good to use if your use case doesn't
 * require ajax string to be fully
 * loaded before using.
 *
 * @class HttpReadStream
 */
export default Ember.Object.extend(Ember.Evented, {
  url: null,

  read: function () {
    var self = this;

    return new Ember.RSVP.Promise(function (resolve) {
      Ember.assert('url is a truthy value', self.get('url'));
      var req = new window.XMLHttpRequest();
      self.trigger('XMLHttpRequestCreated', req);
      req.open("GET", self.get('url'), true);
      var cursor = 0;

      req.onloadstart = function (progressEvent) {
        self.trigger('loadstart', progressEvent);
      };

      req.onprogress = function (progressEvent) {
        var data = progressEvent.currentTarget.responseText.substring(
          cursor,
          progressEvent.loaded
        );

        cursor = progressEvent.loaded;
        self.trigger('progress', progressEvent);
        self.trigger('data', data);
      };

      req.onabort = function (progressEvent) {
        self.trigger('abort', progressEvent);
      };

      req.onerror = function (progressEvent) {
        self.trigger('error', progressEvent);
      };

      req.onload = function (progressEvent) {
        self.trigger('load', progressEvent);
      };

      req.ontimeout = function (progressEvent) {
        self.trigger('timeout', progressEvent);
      };

      req.onloadend = function (progressEvent) {
        self.trigger('loadend', progressEvent);
        resolve();
      };

      req.send();
    });
  }
});
