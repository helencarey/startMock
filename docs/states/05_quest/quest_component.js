'use strict';

angular.
  module('QuestModule').
  component('quest', {
    templateUrl: 'states/05_quest/quest_template.html',

    controller: function QuestCtrl() {

      console.log('quest controller here.')

      this.phones = [
        {
          name: 'Nexus S',
          snippet: 'Fast just got faster with Nexus S.'
        }, {
          name: 'Motorola XOOM™ with Wi-Fi',
          snippet: 'The Next, Next Generation tablet.'
        }, {
          name: 'MOTOROLA XOOM™',
          snippet: 'The Next, Next Generation tablet.'
        }
      ];
    } // end controller
  }); // end component def
