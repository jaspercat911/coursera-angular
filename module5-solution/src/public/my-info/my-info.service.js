(function() {
  'use strict';

  angular.module('public')
  .service('MyInfoService', MyInfoService);

  MyInfoService.$inject = ['$http','ApiPath'];
  function MyInfoService($http, ApiPath)
  {
    var svc = this;

    svc.user = {};
    svc.isSignedUp = false;

    svc.registerUser = function(newUser)
    {
      // Transfer user properties.
      svc.user.firstName = newUser.firstName;
      svc.user.lastName = newUser.lastName;
      svc.user.emailAddress = newUser.emailAddress;
      svc.user.phoneNumber = newUser.phoneNumber;
      svc.user.favouriteDish = newUser.favouriteDish;

      svc.isSignedUp = true;
    }

    svc.getRegisteredUser = function()
    {
      return svc.user;
    }

    svc.getFavouriteDishDetails = function()
    {
      var shortName = svc.user.favouriteDish.toUpperCase();

      return $http.get(ApiPath + '/menu_items/' + shortName + '.json')
      .then(function(response) {
        // Do a final check against shortName, though if the URL returned then it should be correct.
        if (response.data['short_name'] == shortName)
        {
          return response.data;
        }
        else {

          return {};
        }
      }, function(response){
        // The URL was not accessible so shortName is not valid.
        return {};
      });
    }

    svc.isValidDish = function(shortName)
    {
      shortName = shortName.toUpperCase();

      return $http.get(ApiPath + '/menu_items/' + shortName + '.json')
      .then(function(response) {
        // Do a final check against shortName, though if the URL returned then it should be correct.
        return response.data['short_name'] == shortName;
      }, function(response){
        // The URL was not accessible so shortName is not valid.
        return false;
      });
    }
  }

})();
