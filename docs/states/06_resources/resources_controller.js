// RESOURCES ------------------------------------------------------------
stateControllers.controller('ResCtrl', ['$scope', '$http',
  function ResCtrl($scope, $http) {
    $http.get('./states/partials/nav/navData.json').then(function(res){
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
