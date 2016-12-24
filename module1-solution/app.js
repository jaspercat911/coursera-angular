(function(){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  //LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.setQuantityMessage = function() {
      if (!$scope.dishes || $scope.dishes == '')
      {
        // No input supplied.
        $scope.quantityMessage = 'Please enter data first';
        $scope.validity = 'invalid';
      }
      else {
        // Obtain a list of the dishes.
        // NOTE: Empty/whitespace dishes will NOT be excluded from the count.
        var dishList = $scope.dishes
          .split(',')
          .filter(function(s) { return s.trim() != '';});

        if (dishList.length > 3)
        {
          $scope.quantityMessage = 'Too Much!';
        }
        else
        {
          $scope.quantityMessage = 'Enjoy!';
        }
        $scope.validity = 'valid';
      }
    };
  }
})();
