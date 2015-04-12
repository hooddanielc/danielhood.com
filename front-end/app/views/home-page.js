import World from 'phreaker-eyes/mixins/dans-world/views/world';

export default World.extend({
  initialize: function () {
    console.log('home-page init');
  }.on('init')
});

