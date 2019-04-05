stateControllers.controller('QuizCtrl', ['$scope', '$http', 'QzService', function QuizCtrl($scope, $http, QzService)
  {
    // ---------------------------------
    // these $http.gets would be services in a real app
    //$scope.qzStateConfig;

    $http.get('./states/partials/nav/navData.json').then(function(res){
      $scope.navTabs = res.data;
    });

    // ---------------------------------
    // ---------------------------------
    QzService.logMe();

    $scope.activeTab = 3;
    $scope.state = 'quiz';
    $scope.userFlag = true;
    $scope.rateBtns = true;
    $scope.diaStop = false;


    //user ---------------------------------------------------
    $scope.authUser = {
      firstName: 'Tara',
      lastName: 'McAllister'
    }

    // persistent UI elems ----------------------------------
    $scope.tbStop = function() {
      //$scope.diaStop = true;
      $scope.Menu();
    }
    $scope.closeStopDia = function() {
      $scope.diaStop = false;
    }


    // -----------------------------------------------------
    // page content ----------------------------------------

    //qzMenu: init state
    $scope.Menu = function() {
    $scope.qzStateConfig = QzService.init_qzMenu();
    $scope.qzState = $scope.qzStateConfig.qzState;
    $scope.toolbar = $scope.qzStateConfig.toolbar;
    $scope.pgTitle = $scope.qzStateConfig.pgTitle;
    $scope.score = $scope.qzStateConfig.score;

    $scope.promptText = "What would you like to test?";

    }
    $scope.Menu();


    // qzSyll Quiz ---------------------------------------
    $scope.startSyllQz = function() {
      $scope.qzStateConfig = QzService.init_qzSyll();;
      $scope.qzState = $scope.qzStateConfig.qzState;
      $scope.toolbar = $scope.qzStateConfig.toolbar;
      $scope.pgTitle = $scope.qzStateConfig.pgTitle;
      $scope.score = $scope.qzStateConfig.score;

      $scope.qzLength = 29;
      $scope.currTrial = 0;

      $scope.itemPrefix = '#syll';
      $scope.promptType = 'syll'; //temp
      $scope.promptText = $scope.promptType + ' ' +  $scope.currTrial;  //temp


      console.log($scope.score);
      console.log('start syll quiz');
    }


    // qzSW Quiz ---------------------------------------
    $scope.startSWQz = function() {
      $scope.qzStateConfig = QzService.init_qzSW();;
      $scope.qzState = $scope.qzStateConfig.qzState;
      $scope.toolbar = $scope.qzStateConfig.toolbar;
      $scope.pgTitle = $scope.qzStateConfig.pgTitle;

      $scope.qzLength = 24;

      $scope.currTrial = 0;
      $scope.promptType = 'qzSW'; //temp
      $scope.itemPrefix = '#qzSW';
      $scope.promptText = $scope.promptType + ' ' +  $scope.currTrial;  //temp

      console.log('start short word quiz')
    };

    $scope.startLWQz = function() {
      $scope.qzStateConfig = QzService.init_qzLW();
      $scope.qzState = $scope.qzStateConfig.qzState;
      $scope.toolbar = $scope.qzStateConfig.toolbar;
      $scope.pgTitle = $scope.qzStateConfig.pgTitle;

      console.log('Word Quiz');
    }

    //-----------------------
    //$scope.ratingHandlers = QzService.init_qzLW()

    $scope.rateGold = function() {
      let eleID = $scope.itemPrefix + $scope.currTrial;
      let step = angular.element( document.querySelector( eleID ) );
      console.log(step);
      step.removeClass('cls-2 cls-3 dirtyWhite dirtyBlue');
      step.addClass('gold');
      $scope.score.gold += 1;
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

    $scope.rate = function(val) {
      switch(val) {
        case 2:
          $scope.rateGold();
          break;
        case 1:
          $scope.rateSilver();
          break;
        case 0:
          $scope.rateBronze();
          break;
      }
    }

    $scope.update = function() {
      if ($scope.currTrial < $scope.qzLength) {
        $scope.score.qzScore = ($scope.score.gold * 2) + $scope.score.silver;
        $scope.currTrial += 1;
        $scope.promptText = $scope.promptType + ' ' + $scope.currTrial;
      } else if ($scope.currTrial === $scope.qzLength) {
        $scope.score.qzScore = ($scope.score.gold * 2) + $scope.score.silver;
        $scope.currTrial += 1;
        $scope.promptText = '';
        console.log($scope.currTrial);
        //$scope.results();
      } else if ($scope.currTrial > $scope.qzLength) {
        $scope.score.qzScore = 0;
        $scope.score.gold = 0;
        $scope.score.silver = 0;
        $scope.score.bronze = 0;
        $scope.Menu();
        // refresh svg with <use>
      }
      //push promp txt & rating to sess log
    }


    $scope.diaComplete = function() {
      $scope.qzDone = true;
    }







    // end
    //console.log('quiz controller');
}]);
