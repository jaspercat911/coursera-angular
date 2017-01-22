(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MyInfoService'];
function SignUpController(MyInfoService) {
  var $ctrl = this;

  $ctrl.user = {};
  $ctrl.success = false;
  $ctrl.isInvalidDish = false;

  $ctrl.signUp = function() {
    // Menu item short codes must be uppercase.
    $ctrl.user.favouriteDish = $ctrl.user.favouriteDish.toUpperCase();

    MyInfoService.isValidDish($ctrl.user.favouriteDish).then(function (response) {
      $ctrl.isInvalidDish = (response == false);

      if ($ctrl.isInvalidDish) {
        // The dish was invalid, so the user hasn't been signed up (with latest details).
        $ctrl.success = false;
      }
      else {
        // The dish wasn't invalid, so go ahead and register the user.
        MyInfoService.registerUser($ctrl.user);
        $ctrl.success = true;
      }
    });
  }
}

})();
