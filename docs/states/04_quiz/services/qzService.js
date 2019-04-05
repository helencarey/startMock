var qzService = angular.module('qzService', []);

qzService.factory('QzService', function()
{

  function Score() {
    this.qzScore = 0;
    this.gold = 0;
    this.silver = 0;
    this.bronze = 0;
  }

  const init_qzMenu = function() {
    return {
      "pgTitle": "QUIZ MENU",
      "qzState": {
        "menu": true,
        "syll": false,
        "qzSW": false,
        "qzLW": false
      },
      "toolbar": {
        "menu": false,
        "photo": false,
        "stop": false,
        "help": true
      },
      "score": new Score
    } // end return
  }; // end qzMenu

  const init_qzSyll = function() {
    return {
      "pgTitle": "SYLLABLE QUIZ",
      "qzState": {
        "menu": false,
        "syll": true,
        "qzSW": false,
        "qzLW": false
      },
      "toolbar": {
        "menu": false,
        "photo": false,
        "stop": true,
        "help": true
      },
      "score": new Score
    } //end return
  } // qzSyll

  const init_qzSW = function() {
    return {
      "pgTitle": "SHORT WORD QUIZ",
      "qzState": {
        "menu": false,
        "syll": false,
        "qzSW": true,
        "qzLW": false
      },
      "toolbar": {
        "menu": false,
        "photo": false,
        "stop": true,
        "help": true
      },
      "score": new Score
    } //end return
  }; // init_qzSW

  const init_qzLW = function() {
    return {
      "pgTitle": "WORD QUIZ",
      "qzState": {
        "menu": false,
        "syll": false,
        "qzSW": false,
        "qzLW": true
      },
      "toolbar": {
        "menu": false,
        "photo": false,
        "stop": true,
        "help": true
      },
      "score": new Score
    } //end return
  } // init_qzLW



  //resetScore:
  // SERVICE EXPORT ------------------------------------------
  return {
    logMe: function() { console.log('qzService works!'); },
    init_qzMenu: init_qzMenu,
    init_qzSyll: init_qzSyll,
    init_qzSW: init_qzSW,
    init_qzLW: init_qzLW

  }; //end return
}); // end service
