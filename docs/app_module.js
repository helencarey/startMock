'use strict';

var startMock = angular.module("startMock", [
  'ngRoute',
  'stateControllers'
]);

startMock.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'states/05_quest/quest.html',
      controller: 'QuestCtrl'
    })
    .when('/profiles', {
      templateUrl: 'states/01_profiles/profiles.html',
      controller: 'ProfileCtrl'
    })
    .when('/tutorial', {
      templateUrl: 'states/02_tutorial/tutorial.html',
      controller: 'TutorialCtrl'
    })
    .when('/freePlay', {
      templateUrl: 'states/03_freePlay/freePlay.html',
      controller: 'FreeCtrl'
    })
    .when('/quiz', {
      templateUrl: 'states/04_quiz/quiz.html',
      controller: 'QuizCtrl'
    })
    .when('/quest', {
      templateUrl: 'states/05_quest/quest.html',
      controller: 'QuestCtrl'
    })
    .when('/resources', {
      templateUrl: 'states/06_resources/resources.html',
      controller: 'ResCtrl'
    })
}])
