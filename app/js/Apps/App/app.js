(function() {
  'use strict';

  angular.module('App', [
    'ui.router',
    'ct.ui.router.extras',
    'ngProgressLite',

    // App Dependencies
    'App.Managers',

    'BezelDevs',
    'Domain',
  ]);

  // .run(['$rootScope', 'ngProgressLite',
  //   function ($rootScope, ngProgressLite) {
  //     $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
  //       ngProgressLite.start().set(0.6);
  //     });

  //     $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, error) {
  //       ngProgressLite.done();
  //     });

  //     $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
  //       ngProgressLite.done();
  //       throw error;
  //     });
  //   }
  // ]);

})();