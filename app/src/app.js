// Initialize the angular application
angular
  .module('publicationCache', ['ngMaterial', 'ui.router'])
  // Configure theme
  .config(function($mdThemingProvider){
    // Extend the red theme with a few different colors
    var mendeleyRedMap = $mdThemingProvider.extendPalette('red', {
      '500': '9D1620'
    });
    var tumBlue = $mdThemingProvider.extendPalette('blue', {
      '500': '002143'
    });

    // Register the new color palette map with the name mendeleyRedMap
    $mdThemingProvider.definePalette('tumBlue', tumBlue);
    $mdThemingProvider.theme('default')
      .primaryPalette('tumBlue')
      .accentPalette('grey');
  })
  // Configure routing
  .config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /system
    $urlRouterProvider.otherwise("/");

    // Define the different routing states of the web app
    $stateProvider
      .state('tabs', {
        abstract: true,
        controller: function($scope) {
          $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $scope.tabs.selectedIndex = toState.data.selectedTab;
          });
        },
        templateUrl: "partials/template.html"
      })
      .state('tabs.system', {
        url: "/",
        data: {
          'selectedTab': 0
        },
        templateUrl: "partials/system.html"
      })
      .state('tabs.client', {
        url: "/client",
        data: {
          'selectedTab': 1
        },
        templateUrl: "partials/client.html"
      })
      .state('tabs.generator', {
        url: "/generator",
        data: {
          'selectedTab': 2
        },
        templateUrl: "partials/generator.html"
      })
      .state('tabs.docs', {
        url: "/docs",
        data: {
          'selectedTab': 3
        },
        templateUrl: "partials/docs.html"
      })
  });