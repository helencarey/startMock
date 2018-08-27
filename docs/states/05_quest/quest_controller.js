// QUEST ------------------------------------------------------------
stateControllers.controller('QuestCtrl', ['$scope', '$http',
  function QuestCtrl($scope, $http) {
    $http.get('./states/partials/nav/navData.json').then(function(res){
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
    // $scope.menuState = 0;
    $scope.numTrials = 20;
    $scope.promptType = null;  // 'word' || 'syllable' || null

    //activity states ---------------------------------------------
    $scope.questState = 2; // menu = 0 || highTide = 1 || lowTide = 2

    $scope.activeTrial = 1;
    $scope.activeStack = 0;
    $scope.activeCoin = 0;
    $scope.qtComplete = false;

    $scope.score = 0;
    $scope.qtData = [];

    // coinStacks
    $scope.numStack = $scope.numTrials/10;

    $scope.questCoins = [];
    for(let i=0; i<$scope.numStack; i++) {
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
      if ($scope.activeStack < $scope.numStack && $scope.activeCoin < 9) {
        $scope.score += val;
        $scope.activeCoin+= 1;
        $scope.activeTrial +=1;
        // $scope.promptText = $scope.promptType + ' ' + $scope.currTrial;

      } else if ($scope.activeStack < ($scope.numStack - 1) && $scope.activeCoin === 9) {
        $scope.score += val;
        $scope.activeCoin = 0;
        $scope.activeStack += 1;
        $scope.activeTrial +=1;

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
    //dialogs
    //sandBank
    //help
    //stop
    //break

    // end
    // console.log('quest controller');
}]);
