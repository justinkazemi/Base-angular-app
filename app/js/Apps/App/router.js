(function (angular) {
  'use strict';

  angular.module('App')
    .config(['$stateProvider', '$urlRouterProvider', 'directiveUrlService',
      AppConfig
    ]);

  function AppConfig($stateProvider, $urlRouterProvider, directiveUrlService) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    .state('main', {
      abstract: true,
      resolve: {
        test: ['DORM', 'theAppModelManager',
          function (DORM, theAppModelManager) {

            var currentUser = theAppModelManager.getCurrentUser();
            console.log(currentUser);
            
          }
        ]
      },
      views: {
        'main': {
          templateUrl: directiveUrlService.template.main
        }
      }
    })

    .state('main.home', {
      url: '/home',
      views: {
        // 'navBar@main': {
        //   templateUrl: directiveUrlService.template.navbar,
        //   controller: 'HomeNavbarCtrl',
        //   controllerAs: 'NavbarCtrl'
        // },
        // 'content@main': {
        //   templateUrl: directiveUrlService.template.homeContent,
        //   controller: 'HomeContentCtrl',
        //   controllerAs: 'HomeCtrl'
        // }
        // 'footer@main': {
        //   templateUrl: directiveUrlService.template.footer,
        //   controller: 'FooterCtrl',
        //   controllerAs: 'FooterCtrl'
        // }
      }
    })
    ;
  }

})(window.angular);
