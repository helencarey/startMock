stateControllers.controller('QuizCtrl', ['$scope', '$http',
  function QuizCtrl($scope, $http) {
    $http.get('./states/partials/nav/navData.json').then(function(res){
      $scope.navTabs = res.data;
    });
    $scope.activeTab = 3;
    $scope.state = 'quiz';

    //user ---------------------------------------------------
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
