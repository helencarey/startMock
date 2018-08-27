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
    $http.get('./states/partials/nav/navData.json').then(function(res){
      $scope.navTabs = res.data;
    });

    //toolbar ---------------------------------------------
    $scope.toolbar = false;

    // end
    // console.log('profile controller');
}]);
