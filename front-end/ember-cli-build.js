/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'sass'
    }
  });

  app.import('bower_components/skeleton/css/normalize.css');
  app.import('bower_components/skeleton/css/skeleton.css');

  return app.toTree();
};
