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
    $http.get('./states/partials/nav/navData.json').then(function(res){
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
