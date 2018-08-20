var stateControllers = angular.module('stateControllers', []);

// PROFILES ------------------------------------------------------------
stateControllers.controller('ProfileCtrl', ['$scope', '$http',
  function ProfileCtrl($scope, $http) {
    $scope.state = 'profiles';
    $scope.pgTitle = 'PROFILES';

    //user -------------------------------------------------------
    $scope.authUser = { firstName: 'Helen', lastName: 'Carey', }
    $scope.userFlag = false;

    //navState ---------------------------------------------
    $scope.activeTab = 0;
    $http.get('./states/partials/navData.json').then(function(res){
      $scope.navTabs = res.data;
    });

    //toolbar ---------------------------------------------
    $scope.toolbar = false;

    // end
    // console.log('profile controller');
}]);

// TUTORIAL ------------------------------------------------------------
stateControllers.controller('TutorialCtrl', ['$scope', '$http',
  function TutorialCtrl($scope, $http) {
    $scope.state = 'tutorial';
    $scope.pgTitle = 'TUTORIAL';

    //user -------------------------------------------------------
    $scope.authUser = { firstName: 'Walter', lastName: 'White', }
    $scope.userFlag = true;

    //navState ---------------------------------------------
    $scope.activeTab = 1;
    $http.get('./states/partials/navData.json').then(function(res){
      $scope.navTabs = res.data;
    });

    //toolbar ---------------------------------------------
    $scope.toolbar = {
      'photo': false,
      'stop': true,
      'help': true
    }

    // end
    // console.log('tutorial controller');
}]);

// FREE PLAY ------------------------------------------------------------
stateControllers.controller('FreeCtrl', ['$scope', '$http',
  function FreeCtrl($scope, $http) {
    $http.get('./states/partials/navData.json').then(function(res){
      $scope.navTabs = res.data;
    });
    $scope.activeTab = 2;
    $scope.state = 'freePlay';

    //user -------------------------------------------------------
    // $scope.authUser = false; // no authUser will display anonFlag

    // persistent UI elems ----------------------------------
    $scope.userFlag = true;
    $scope.pgTitle = 'FREE PLAY';
    $scope.toolbar = {
      'photo': true,
      'stop': false,
      'help': true
    }
    $scope.rateBtns = false;

    // end
    //console.log('free play controller');
}]);

// QUIZ ------------------------------------------------------------
stateControllers.controller('QuizCtrl', ['$scope', '$http',
  function QuizCtrl($scope, $http) {
    $http.get('./states/partials/navData.json').then(function(res){
      $scope.navTabs = res.data;
    });
    $scope.activeTab = 3;
    $scope.state = 'quiz';

    //user -------------------------------------------------------
    $scope.authUser = {
      firstName: 'Tara',
      lastName: 'McAllister'
    }

    // persistent UI elems ----------------------------------
    $scope.userFlag = true;
    $scope.pgTitle = 'QUIZ MENU';
    $scope.toolbar = {
      'menu': true,
      'photo': false,
      'stop': true,
      'help': true
    }
    $scope.diaStop = false;
    $scope.rateBtns = true;

    $scope.Stop = function() {
      $scope.diaStop = true;
    }
    $scope.closeStopDia = function() {
      $scope.diaStop = false;
    }


    // -----------------------------------------------------
    // page content ----------------------------------------
    // qzStates = qzMenu, qzSyll, qzSW, qzLW

    //qzMenu: init state
    $scope.Menu = function() {
      $scope.menu = true;   // do this better
      $scope.syllQz = false; // do this better
      $scope.qzSW = false;
      $scope.LWQz = false; // do this better
      $scope.pgTitle = 'QUIZ MENU';
      $scope.promptText = "What would you like to test?";
      // reset everything
      $scope.qzScore = 0;
      $scope.Gold = 0;
      $scope.Silver = 0;
      $scope.Bronze = 0;
    }
    $scope.Menu();

    // qzSyll Quiz ---------------------------------------
    $scope.startSyllQz = function() {
      $scope.menu = false;
      $scope.syllQz = true;
      $scope.pgTitle = 'SYLLABLE QUIZ';

      $scope.qzLength = 29;
      $scope.currTrial = 0;
      $scope.promptType = 'syll'; //temp
      $scope.promptText = $scope.promptType + ' ' +  $scope.currTrial;  //temp

      $scope.qzScore = 0;
      $scope.gold = 0;
      $scope.silver = 0;
      $scope.bronze = 0;

      $scope.itemPrefix = '#syll';
      console.log('start syll quiz');
    }

    // qzSW Quiz ---------------------------------------
    $scope.startSWQz = function() {
      $scope.menu = false;
      $scope.syllQz = false; // do this better
      $scope.LWQz = false; // do this better
      $scope.qzSW = true;
      console.log($scope.qzSW);
      $scope.pgTitle = 'SHORT WORD QUIZ';

      $scope.qzLength = 24;
      $scope.currTrial = 0;
      $scope.promptType = 'qzSW'; //temp
      $scope.itemPrefix = '#qzSW';
      $scope.promptText = $scope.promptType + ' ' +  $scope.currTrial;  //temp

      $scope.qzScore = 0;
      $scope.gold = 0;
      $scope.silver = 0;
      $scope.bronze = 0;

      console.log('start short word quiz')
    };
    //-----------------------

    $scope.rateGold = function() {
      let eleID = $scope.itemPrefix + $scope.currTrial;
      let step = angular.element( document.querySelector( eleID ) );
      console.log(step);
      step.removeClass('cls-2 cls-3 dirtyWhite dirtyBlue');
      step.addClass('gold');
      $scope.gold += 1;
      $scope.update();
    }

    $scope.rateSilver = function() {
      let eleID = $scope.itemPrefix + $scope.currTrial;
      let step = angular.element( document.querySelector( eleID ) );
      $scope.silver += 1;
      step.removeClass('cls-2 cls-3 dirtyWhite dirtyBlue');
      step.addClass('silver');
      $scope.update();
    }

    $scope.rateBronze = function() {
      let eleID = $scope.itemPrefix + $scope.currTrial;
      let step = angular.element( document.querySelector( eleID ) );
      $scope.bronze += 1;
      step.removeClass('cls-2 cls-3 dirtyWhite dirtyBlue');
      step.addClass('bronze');
      $scope.update();
    }

    $scope.update = function() {
      if ($scope.currTrial < $scope.qzLength) {
        $scope.qzScore = ($scope.gold * 2) + $scope.silver;
        $scope.currTrial += 1;
        $scope.promptText = $scope.promptType + ' ' + $scope.currTrial;
      } else if ($scope.currTrial === $scope.qzLength) {
        $scope.qzScore = ($scope.gold * 2) + $scope.silver;
        $scope.currTrial += 1;
        $scope.promptText = '';
        console.log($scope.currTrial);
        //$scope.results();
      } else if ($scope.currTrial > $scope.qzLength) {
        $scope.qzScore = 0;
        $scope.gold = 0;
        $scope.silver = 0;
        $scope.bronze = 0;

        $scope.Menu();
        // refresh svg with <use>
      }
      //push promp txt & rating to sess log
    }

    $scope.diaComplete = function() {
      $scope.qzDone = true;

    }

    $scope.startLWQz = function() {
      $scope.menu = false;
      $scope.LWQz = true;
      $scope.pgTitle = 'WORD QUIZ';
      $scope.promptText = "word"
      console.log('Word Quiz');
    }



    // end
    //console.log('quiz controller');
}]);

// QUEST ------------------------------------------------------------
stateControllers.controller('QuestCtrl', ['$scope', '$http',
  function QuestCtrl($scope, $http) {
    $http.get('./states/partials/navData.json').then(function(res){
      $scope.navTabs = res.data;
    });
    $scope.activeTab = 4;
    $scope.state = 'quest';

    //user -------------------------------------------------------
    $scope.authUser = { firstName: 'Helen', lastName: 'Carey', };

    // persistent UI elems ----------------------------------
    $scope.userFlag = true;
    $scope.pgTitle = 'QUEST';
    $scope.toolbar = {
      'menu': true,
      'photo': false,
      'stop': true,
      'help': true
    }
    $scope.rateBtns = true;
    $scope.sandbank = true;

    //menu states ---------------------------------------------
    $scope.menuState = 0;
    $scope.numTrials = 100;
    $scope.promptType = null;  // 'word' || 'syllable' || null

    //activity states ---------------------------------------------
    $scope.questState = 2; // menu = 0 || highTide = 1 || lowTide = 2

    $scope.activeTrial = 1;
    $scope.activeStack = 0;
    $scope.activeCoin = 0;

    $scope.score = 0;
    $scope.qtData = [];

    // coinStacks
    let numStack = $scope.numTrials/10;
    $scope.questCoins = [];
    for(let i=0; i<numStack; i++) {
      // let rotation =
      let stack = { id: i }
      $scope.questCoins.push(stack)
    }

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
      console.log(stackID + ', ' + coinID);

      // update score counters
      let trial = {};
      trial.id = $scope.activeTrial;
      trial.rate = val;
      $scope.qtData.push(trial);

      $scope.update(val);
    }

    $scope.update = function(val) {
      if ($scope.activeStack < 9 && $scope.activeCoin < 9) {
        $scope.score += val;
        $scope.activeCoin+= 1;

        // $scope.promptText = $scope.promptType + ' ' + $scope.currTrial;
      } else if ($scope.activeStack < 9 && $scope.activeCoin === 9) {
        $scope.score += val;
        $scope.activeCoin = 0;
        $scope.activeStack += 1;

        //dia-break
        // $scope.promptText = '';

      } else if ($scope.activeStack === 9 && $scope.activeCoin === 9) {
        // dia-results
        // console.log()
        // $scope.Menu();
      }
      //push promp txt & rating to sess log
    }
    //dialogs
    //sandBank
    //help
    //stop
    //break

    // end
    // console.log('quest controller');
}]);

// RESOURCES ------------------------------------------------------------
stateControllers.controller('ResCtrl', ['$scope', '$http',
  function ResCtrl($scope, $http) {
    $http.get('./states/partials/navData.json').then(function(res){
      $scope.navTabs = res.data;
    });
    $scope.activeTab = 5;
    $scope.state = 'resources';

    //user -------------------------------------------------------
    $scope.authUser = {}

    // persistent UI elems ----------------------------------
    $scope.userFlag = false;
    $scope.pgTitle = 'SLP RESOURCES';
    $scope.toolbar = false;
    $scope.rateBtns = false;

    // page content ---------------------------------
    $http.get('./states/06_resources/resData.json').then(function(res){
      $scope.resData = res.data;
      $scope.downloads = $scope.resData[0];
      $scope.links = $scope.resData[1];
    });
}]);
// end Resources --------------------------------------------
