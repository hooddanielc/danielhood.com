import Ember from 'ember';

export default {
  canvas: null,

  /*
  * inserts a canvas element if it
  * does not exist in the testing container
  * so it can be reused with all world
  * instances.
  */
  ensureCanvasCreated: function () {
    var canvasElement = Ember.$('#ember-testing canvas');

    if (!canvasElement[0]) {
      Ember.$('#ember-testing').append("<canvas/>");
      this.canvas = Ember.$('#ember-testing canvas')[0];
    }
  }
};
