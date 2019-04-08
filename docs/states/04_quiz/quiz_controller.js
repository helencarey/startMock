stateControllers.controller('QuizCtrl', ['$scope', '$http', 'QzService', function QuizCtrl($scope, $http, QzService)
  {
    // ---------------------------------
    // these $http.gets would be services in a real app
    //$scope.qzStateConfig;
    $http.get('./states/partials/nav/navData.json').then(function(res){
      $scope.navTabs = res.data;
    });

    // ---------------------------------
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

    // updates $scope with qzState config data from qzService
    function initQuizState( config ) {
      $scope.qzState = $scope.qzStateConfig.qzState;
      $scope.toolbar = $scope.qzStateConfig.toolbar;
      $scope.pgTitle = $scope.qzStateConfig.pgTitle;
      $scope.promptType = $scope.qzStateConfig.promptType;
      $scope.qzLength = $scope.qzStateConfig.qzLength;
      $scope.score = $scope.qzStateConfig.score; //zeros out scores
      $scope.currTrial = 0;
    }

    //qzMenu ---------------------------------------
    $scope.Menu = function() {
      $scope.qzStateConfig = QzService.init_qzMenu();
      initQuizState( $scope.qzStateConfig );
      $scope.promptText = "What would you like to test?";
    }
    $scope.Menu();

    // qzSyll Quiz ---------------------------------------
    $scope.startSyllQz = function() {
      $scope.qzStateConfig = QzService.init_qzSyll();;
      initQuizState( $scope.qzStateConfig );
      $scope.promptText = $scope.promptType + ' ' +  $scope.currTrial;

      console.log('starting Syll Quiz');
    }

    // qzSW Quiz ---------------------------------------
    $scope.startSWQz = function() {
      $scope.qzStateConfig = QzService.init_qzSW();
      initQuizState( $scope.qzStateConfig );
      $scope.promptText = $scope.promptType + ' ' +  $scope.currTrial;

      console.log('starting Short Word Quiz')
    };

    $scope.startLWQz = function() {
      $scope.qzStateConfig = QzService.init_qzLW();
      initQuizState( $scope.qzStateConfig );
      $scope.promptText = "LWQz coming soon!";
      console.log('starting Long Word Quiz');
    }


    // =======================================
    //  RATING HANDLERS & GRAPHIC UPDATE
    // =======================================
    
    $scope.graphicStepSelector = function(cb) {
      let eleID = '#' + $scope.promptType + $scope.currTrial;
      let step = angular.element( document.querySelector( eleID ) );
      console.log(step);
      step.removeClass('cls-2 cls-3 dirtyWhite dirtyBlue');

      cb( step ); //calls rateColor()
    }
    $scope.rateGold = function( step ) {
      step.addClass('gold');
      $scope.score.gold += 1;
      $scope.update();
    }
    $scope.rateSilver = function( step ) {
      step.addClass('silver');
      $scope.silver += 1;
      $scope.update();
    }
    $scope.rateBronze = function( step ) {
      step.addClass('bronze');
      $scope.bronze += 1;
      $scope.update();
    }

    // input val from rating btns
    $scope.rate = function(val) {
      switch(val) {
        case 2:
          $scope.graphicStepSelector( $scope.rateGold );
          break;
        case 1:
          $scope.graphicStepSelector( $scope.rateSilver );
          break;
        case 0:
          $scope.graphicStepSelector( $scope.rateBronze );
          break;
      }
    }

    // =======================================
    //  UPDATE SCORE AND PROMPT OUTPUT
    // =======================================
    function sumQzScore() {
      let score = ($scope.score.gold * 2) + $scope.score.silver;
      return score
    }

    function updatePromptText() {
      let promptText = $scope.promptType + ' ' + $scope.currTrial;
      return promptText
    }

    $scope.update = function() {
      if ($scope.currTrial < $scope.qzLength) {
        $scope.score.qzScore = sumQzScore();
        $scope.currTrial += 1;
        $scope.promptText = updatePromptText();

      } else if ($scope.currTrial === $scope.qzLength) {
        $scope.score.qzScore = sumQzScore();
        $scope.currTrial += 1;
        $scope.promptText = '';
        console.log($scope.currTrial);
        //$scope.results();
      } else if ($scope.currTrial > $scope.qzLength) {
        $scope.promptText = '';
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
