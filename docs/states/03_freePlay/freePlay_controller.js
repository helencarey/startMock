// FREE PLAY ------------------------------------------------------------
stateControllers.controller('FreeCtrl', ['$scope', '$http',
  function FreeCtrl($scope, $http) {
    $http.get('./states/partials/nav/navData.json').then(function(res){
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
