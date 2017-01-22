(function() {
  'use strict';

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['MyInfoService'];
  function MyInfoController(MyInfoService)
  {
    var $ctrl = this;

    $ctrl.user = MyInfoService.getRegisteredUser();
    $ctrl.isSignedUp = MyInfoService.isSignedUp;

    if ($ctrl.isSignedUp)
    {
      MyInfoService.getFavouriteDishDetails().then(function(result) {
        $ctrl.favouriteDishDetails = result;
      });
    }
  }

})();
