angular.module('candescent.analyzer').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    'use strict';

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state(
        'root', {
          url: '',
          abstract: true,
          views: {
            'header': {
              templateUrl: 'scripts/components/core/header.html',
              controller: 'HeaderController as vm'
            },
            'footer': {
              templateUrl: 'scripts/components/core/footer.html'
            }
          }
        })
      .state(
        'root.home', {
          url: '/home',
          views: {
            'main@': {
              templateUrl: 'scripts/components/home/home.html',
              controller: 'HomeController as vm'
            }
          },
          data: {
            access: 'user'
          }
        }
    );
  }
]);