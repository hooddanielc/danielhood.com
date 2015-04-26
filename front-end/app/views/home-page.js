import World from 'phreaker-eyes/mixins/dans-world/views/world';

export default World.extend({
  classNames: ['main-page-renderer'],

  initialize: function () {
    this.startRenderLoop();
  }.on('init'),

  renderAnimationFrame: function () {
    var gl = this.get('gl');

    // clear
    gl.viewport(0, 0, this.element.offsetWidth, this.element.offsetHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }
});
