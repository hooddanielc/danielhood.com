/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'sass' // compile the app.sass file instead of scss
    }
  });

  app.import('bower_components/skeleton/css/normalize.css');
  app.import('bower_components/skeleton/css/skeleton.css');

  return app.toTree();
};
