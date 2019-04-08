// QUEST ------------------------------------------------------------
stateControllers.controller('QuestCtrl', ['$scope', '$http',
  function QuestCtrl($scope, $http) {
    // load json assets -- in this case, its only nav data
    $http.get('./states/partials/nav/navData.json').then(function(res){
      $scope.navTabs = res.data;
      $scope.activeTab = 4;
    });

    // ----------------------------------
    /* NOTES:
      Quest has 4 states.
      Tara has asked for qtState2 & qtState3 to be completed first.

        qtState0 (init state. menu0) Menu State: 'Select Word Quest or Syll Quest' (In the future this state can hold saved quest configs for the user to choose from)
        qtState1  (menu1)  Menu State: Settings Config for Quest
        qtState2 (qtNoBF)  Activity State: Quest with no wave
        qtState3 (qtBF)  Activity State: Quest with wave
    */

    // init some vars needed work on qtState2 & qtState3 before qtStates 0-1
    $scope.qtState = 0;
    $scope.qtStateDesc = '';
    $scope.qtType = 'syllable'; // DEBUG var. empty str for LIVE
    $scope.numTrials = 100; // DEBUG var.

    //user -------------------------------------------------------
    $scope.authUser = { firstName: 'Helen', lastName: 'Carey', };
    $scope.userFlag = true;

    // TEMPLATE SETUP ==============================

    // General TOOLBAR fx --------------
    // mostly TEMP for future dev
    $scope.tbMenu = function() { $scope.setup_qtState0(); }
    $scope.tbSettings = function() { $scope.setup_qtState1(); }
    $scope.tbPhoto = function() { alert('Snapshot!'); }

    $scope.tbStop = function() { alert('Stop & Save Session btn clicked'); }

    $scope.tbHelp = function() {
      alert('Help for qtState' + $scope.qtState + '-' + $scope.qtStateDesc);
    }

    // =====================================================
    // QtState0 (init state. menu0) --------------
    $scope.setup_qtState0 = function() {
      $scope.qtState = 0;
      $scope.qtStateDesc = 'Quest Switchboard (Menu 01). Help content contains more info on Quest activity.';// debug var
      $scope.menu = true; //Denotes a menu state, not an active qt state.
      $scope.wave = null;
      $scope.pgTitle = 'QUEST MENU';
      $scope.rateBtns = false;
      $scope.sandbank = false;
      $scope.toolbar = {
        'menu': false,
        'settings': false,
        'photo': false,
        'stop': false,
        'help': true
      }


    } //end setup_qtState0
    // =====================================================

    // =====================================================
    // qtState1  (menu1) --------------
    $scope.setup_qtState1 = function(type) { // menu1
      $scope.qtState = 1;
      $scope.qtStateDesc = 'Quest Settings (Menu 02). Help content clarifies settings choices.';// debug var
      $scope.menu = true;
      $scope.wave = 'not set';
      // $scope.qtType = type; //#for Live
      $scope.pgTitle = $scope.qtType.toUpperCase() + ' QUEST SETTINGS';
      $scope.rateBtns = false;
      $scope.sandbank = false;

      // toolbar -------
      $scope.toolbar = {
        'menu': true,
        'settings': false,
        'photo': false,
        'stop': false,
        'help': true
      }

      // settings --------
      // $scope.numTrials = 50;
      // $scope.numTrialsChange = function() {}
      //
      // $scope.setTrials = function() {}
      $scope.waveViz = true;

      $scope.qtSettings = {
        allR: false,
        r1: false,
        r2: false,
        r3: false,
        r4: false,
        r5: false,
        numTrials: 50,
        waveViz: true
      };

    } // end setup_qtState1
    // =====================================================

    // =====================================================
    // qtState2 (qtNoBF) --------------
    $scope.setup_qtState2 = function() {
      $scope.qtState = 2;
      $scope.qtStateDesc = 'NoBF Quest (qtNoBF). Help content clarifies ratings & sandbank.';// debug var
      $scope.menu = false;
      $scope.wave = null; // bool for BF or NoBF in next state
      $scope.pgTitle = $scope.qtType.toUpperCase() + ' QUEST';
      $scope.rateBtns = true;
      $scope.sandbank = true;
      $scope.toolbar = {
        'menu': false,
        'settings': true,
        'photo': false,
        'stop': true,
        'help': true
      }
      $scope.startNewQt();


    } // end setup_qtState2 (qtNoBF)
    // =====================================================

    // =====================================================
    $scope.setup_qtState3 = function() { //qtBF
      $scope.qtState = 3;
      $scope.qtStateDesc = 'NoBF Quest (qtBF). Help content clarifies ratings and UI elements.';// debug var
      $scope.menu = false;
      $scope.wave = true;
      $scope.pgTitle = $scope.qtType.toUpperCase() + ' QUEST';
      $scope.rateBtns = true;
      $scope.sandbank = true;
      $scope.toolbar = {
        'menu': false,
        'settings': true,
        'photo': false,
        'stop': true,
        'help': true
      }

      $scope.hzStar = 1140;

      $scope.resetBtn = function() {
        alert('reset target btn');
      }

      $scope.startNewQt();
    } // end setup_qtState3 (qtBF)
    // =====================================================

    // INIT------------------------
    $scope.setup_qtState0();

    // end qtState setup fx ====================================
    // =========================================================



    // QUEST IN-GAME FX (qtState2 & qtState3 only) ==============================
    $scope.startNewQt = function() {
      $scope.tbStop = function() {
        $scope.setup_qtState0();
      }

      $scope.qtLog = {}; // data var.
      $scope.qtLog.qtType = $scope.qtType;

      $scope.activeTrial = 1;
      $scope.activeStack = 0;
      $scope.activeCoin = 0;
      $scope.qtComplete = false;
      $scope.qtData = [];

      $scope.scoreMax = $scope.numTrials * 2;
      $scope.score = 0; // sum of Rating points
      $scope.displayScore = 0; // % correct

      // coinStack setup
      $scope.numStack = $scope.numTrials/10;

      $scope.questCoins = [];
      for(let i=0; i<$scope.numStack; i++) {
        // let rotation =
        let stack = { id: i }
        $scope.questCoins.push(stack)
      }
    } // end startNewQt()


    /*
      const element =  document.querySelector('.my-element')
      element.classList.add('animated', 'bounceOutLeft')
    */

    $scope.rate = function(val) {
      // update coin
      let stackID = 'div#stack' + $scope.activeStack;
      let coinID = 'g#coin-' + $scope.activeCoin;
      let coinQ = stackID + ' ' + coinID;
      let sideQ = coinQ + ' g.side';
      let topQ = coinQ + ' ellipse.top';
      let coin = angular.element( document.querySelector( coinQ ) );
      let side = angular.element( document.querySelector( sideQ ) );
      let top = angular.element( document.querySelector( topQ ) );

      side.addClass('coinSide-' + val);
      top.addClass('coinTop-' +  + val);
      coin.removeClass('hidden');
      coin.addClass('animated', 'bounce');

      console.log(stackID + ', ' + coinID);

      // update score counters
      let trial = {};
      trial.id = $scope.activeTrial;
      trial.rate = val;
      $scope.qtData.push(trial);

      $scope.update(val);
    }

    $scope.update = function(val) {
      // incoming val = gold: 2, silver: 1, bronze: 0

      if ($scope.activeStack < $scope.numStack && $scope.activeCoin < 9) {
        $scope.score += val;
        $scope.activeCoin+= 1;
        $scope.activeTrial +=1;

        $scope.displayScore = Math.round( ($scope.score /($scope.activeTrial * 2) * 100) );
        // $scope.promptText = $scope.promptType + ' ' + $scope.currTrial;

      } else if ($scope.activeStack < ($scope.numStack - 1) && $scope.activeCoin === 9) {
        $scope.score += val;
        $scope.activeCoin = 0;
        $scope.activeStack += 1;
        $scope.activeTrial +=1;

        $scope.displayScore = Math.round( ($scope.score /($scope.activeTrial * 2) * 100) );
        //dia-break
        // $scope.promptText = '';

      } else if ($scope.activeStack === ($scope.numStack - 1) && $scope.activeCoin === 9) {
        $scope.score += val;
        console.log('END');
        $scope.rateBtns = false;
        $scope.qtComplete = true;

        // collect coins graphic
        // dia-results
        console.log($scope.qtData);
        // $scope.Menu();
      }
      //push promp txt & rating to sess log
    }

    //sandBank ---------------------------------------------
    //$scope.qtComplete
    $scope.sbIsOpen = false; // init val

    $scope.sbOpen = function() {
      $scope.sbIsOpen = true;
      console.log('clicked to OPEN sb');
    }

    $scope.sbClose = function() {
      $scope.sbIsOpen = false;
      console.log('clicked to CLOSE sb');
    }

    $scope.collectCoins = function() {
      console.log('collect dem coins!!!!');
    }


    // =======================================
    // PLACEHOLDER DATA FOR SANDBANK
    var sortNumbs = function(a, b) { return b - a; }
    var makeDataArr = function(min, max, amt) {
      let arr = []
      for (var i=0; i<amt; i++) {
        let numb = Math.floor(Math.random() * (+max - +min)) + +min;
        arr.push(numb);
      }
      arr.sort(sortNumbs);

      return arr;
    }

    $scope.sbStatsData = [
      {
        title: 'Total Quests Completed',
        stat: 32
      },
      {
        title: 'Total Points Earned',
        stat: 2048
      },
      {
        title: 'Total Gold Coins Earned',
        stat: 512
      },
      {
        title: 'Average Points per Quest',
        stat: 64
      },
      {
        title: 'Average Gold Coins per Quest',
        stat: 16
      }
    ];

    $scope.sbSuitesData = [
      {
        title: '3 Gold in a Row',
        achieved: true,
        imgClass: 'img-sb_badge-suite03',
        date: '6/24/2018'
      },
      {
        title: '5 Gold in a Row',
        achieved: true,
        imgClass: 'img-sb_badge-suite05',
        date: '6/24/2018'
      },
      {
        title: '8 Gold in a Row',
        achieved: true,
        imgClass: 'img-sb_badge-suite08',
        date: '6/24/2018'
      },
      {
        title: '10 Gold in a Row',
        achieved: true,
        imgClass: 'img-sb_badge-suite10',
        date: '6/24/2018'
      }
    ];

    $scope.sbBadgeData = [
      {
        id: 'hs',
        title: 'High Score',
        imgClass: 'img-sb_badge-hs',
      },
      {
        id: 'mg',
        title: 'Most Gold',
        imgClass: 'img-sb_badge-hsib',
      },
      {
        id: 'hsib',
        title: 'High Score in Block',
        imgClass: 'img-sb_badge-mg',
      },
      {
        id: 'mgib',
        title: 'Most Gold in Block',
        imgClass: 'img-sb_badge-mgib',
      }
    ];

    $scope.sbBadgeData[0].scores = makeDataArr(5,300,5);
    $scope.sbBadgeData[1].scores = makeDataArr(1,100,5);
    $scope.sbBadgeData[2].scores = makeDataArr(1,10,5);
    $scope.sbBadgeData[3].scores = makeDataArr(1,10,5);

    //console.log($scope.sbBadgeData);


    //dialogs
    //help
    //stop
    //break

    // end
    // console.log('quest controller');
}]);
