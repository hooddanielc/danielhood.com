import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['adult-cat-finder', 'hidden-2'],
  name: 'pink',
  peakingMode: true,
  canPeek: false,
  switchAnimationInterval: 1500,
  userInput: '',
  messages: null,

  start: function () {
    console.log([
      '',
      'Welcome!',
      '',
      'Invoke the function `easter` in the console to begin!',
      '',
      'Example: `easter()`',
      '',
      ''
    ].join('\n'));

    window.easter = () => {
      Ember.run(() => {
        this.set('canPeek', true);
      });
    };

    this.set('messages', Ember.A([{
      you: false,
      text: 'Hello, you are cute!'
    }]));

    this.set('bot', new RiveScript());

    this.get('bot').loadFile([
      "adult-cat/about-aiden.rive",
      "adult-cat/begin.rive",
      "adult-cat/data-names.rive",
      "adult-cat/emoji-categories.rive",
      "adult-cat/emoji-sub.rive",
      "adult-cat/emoji.rive",
      "adult-cat/sarcasm.rive",
      "adult-cat/std-arrays.rive",
      "adult-cat/std-chat.rive",
      "adult-cat/std-learn.rive",
      "adult-cat/std-reductions.rive",
      "adult-cat/std-salutations.rive",
      "adult-cat/std-star.rive",
      "adult-cat/std-substitutions.rive"
    ], () => {
      this.get('bot').sortReplies();
    });
  }.on('init'),

  tick: function () {
    window.clearTimeout(this.currentTimeout);

    if (this.get('peakingMode')) {
      if (this.get('canPeek')) {
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
    },

    submit: function () {
      this.get('messages').addObject(Ember.Object.create({
        you: true,
        text: this.get('userInput')
      }));

      this.get('messages').addObject(Ember.Object.create({
        you: false,
        text: this.get('bot').reply('soandso', this.get('userInput'))
      }));

      this.set('userInput', '');

      Ember.run.later(() => {
        this.$('.dialogue').scrollTop(1000000000);
      }, 100);
    }
  }
});