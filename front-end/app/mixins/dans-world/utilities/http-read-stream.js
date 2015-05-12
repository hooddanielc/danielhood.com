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
      var cursor = 0;
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf('MSIE ');
      var wint = ua.indexOf('Trident');

      req.onreadystatechange = function () {
        self.trigger('readystatechange', req);

        if (msie > 0 || wint > 0) {
          if (req.readyState === 4) {
            self.trigger('data', req.responseText);
            resolve();
          }
        } else {
          var text = req.responseText;

          if (cursor !== text.length) {
            var data = text.substring(cursor, text.length);
            cursor = text.length;
            self.trigger('data', data);
          }

          if (req.readyState === 4) {
            resolve();
          }
        }
      };

      req.onloadstart = function (progressEvent) {
        self.trigger('loadstart', progressEvent);
      };

      req.onprogress = function (progressEvent) {
        self.trigger('progress', progressEvent);
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
      };

      req.open("GET", self.get('url'), true);
      req.send();
    });
  }
});
