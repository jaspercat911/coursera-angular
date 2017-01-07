(function()
{
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(svcMenuSearch)
  {
    var ctrl = this;

    ctrl.searchTerm = '';
    ctrl.found;

    ctrl.click = function()
    {
      svcMenuSearch.getMatchedMenuItems(ctrl.searchTerm)
      .then(
        function(result)
        {
          ctrl.found = result;
        }
      );
    };

    ctrl.removeItem = function(idx)
    {
      ctrl.found.splice(idx, 1);
    };
  }

  MenuSearchService.$inject = ['$http', '$q'];
  function MenuSearchService($http, $q)
  {
    var self = this;

    self.getMatchedMenuItems = function(searchTerm)
    {
      var found = [];

      if (searchTerm == '')
      {
        // When search term is empty, return the empty list without retrieving items.
        return $q.when(found);
      }

      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }).then(function (result) {
        // process result and only keep items that match
        result.data.menu_items.forEach(function(item){
          if (item.description.includes(searchTerm))
          {
            found.push(item);
          }
        });

        // return processed items
        return found;
      });
    }
  }

  function FoundItemsDirective()
  {
    var ddo = {
      restrict: 'E',
      scope: { found: '<foundItems', remove: '<onRemove' },
      templateUrl: 'foundItems.html'
    };

    return ddo;
  }

})
();
