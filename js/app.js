 (function() {
    function config($stateProvider, $locationProvider) {
      $locationProvider
       .html5Mode({
          enabled: true,
          requireBase: false
      });

      $stateProvider
        .state('landing', {
          url: '/',
          controller: 'MainCtrl as main',
          templateUrl: 'templates/main.html'
        });
     }


     angular
     .module('blocPom', ['ui.router'])
     .config(config);
 })();