(function() {
  ' use strict';

  angular.module('data')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['MenuDataService', 'items'];
  function ItemsController(MenuDataService, items)
  {
    var _this = this;
    _this.items = items.menu_items;
  }

})();
