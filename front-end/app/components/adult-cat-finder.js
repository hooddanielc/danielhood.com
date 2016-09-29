import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['adult-cat-finder', 'hidden-2'],
  name: 'pink',
  peakingMode: true,
  canPeak: false,
  delayRender: 15000,
  switchAnimationInterval: 1500,

  start: function () {
    window.theThis = this;

    setTimeout(() => {
      if (!this.get('isDestroyed')) {
        this.set('canPeak', true);
      }
    }, this.get('delayRender'));
  }.on('init'),

  tick: function () {
    window.clearTimeout(this.currentTimeout);

    if (this.get('peakingMode')) {
      if (this.get('canPeak')) {
        if (this.$().hasClass('hidden-1')) {
          this.$().removeClass('hidden-1').addClass('hidden-2');
        } else {
          this.$().removeClass('hidden-2').addClass('hidden-1');
        }
      }

      this.currentTimeout = setTimeout(() => {
        this.tick();
      }, this.get('switchAnimationInterval'));
    } else {
      this.$().removeClass('hidden-1').removeClass('hidden-2');
    }
  }.on('init').observes('peakingMode'),

  actions: {
    open: function () {
      this.toggleProperty('peakingMode');
    }
  }
});