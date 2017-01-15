(function () {
'use strict';

angular.module('data')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/views/home.view.template.html'
  })

  // Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/views/categories.view.template.html',
    controller: 'CategoriesController as ctrl',
    resolve: {
      categories: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Items page
  .state('items', {
    url: '/items/{shortName}',
    templateUrl: 'src/templates/views/items.view.template.html',
    controller: 'ItemsController as ctrl',
    resolve: {
      items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams){
        return MenuDataService.getItemsForCategory($stateParams.shortName);
      }]
    }
  });
}

})();
