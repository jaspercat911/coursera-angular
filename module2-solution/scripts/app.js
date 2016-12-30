(function()
{
  'use strict';


  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(svcShoppingList) {
    var ctrlToBuy = this;

    ctrlToBuy.items = svcShoppingList.itemsToBuy;

    ctrlToBuy.addBought = function(index) {
      svcShoppingList.buyItem(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(svcShoppingList) {
    var ctrlBought = this;

    ctrlBought.items = svcShoppingList.itemsBought;
  }

  function ShoppingListCheckOffService() {
    var self = this;

    // Initialise the To Buy item list.
    self.itemsToBuy = [
      { name: 'Cookies', quantity: '5' },
      { name: 'Apples', quantity: '3' },
      { name: 'Bunches of bananas', quantity: '1' },
      { name: 'Cartons of milk', quantity: '1' },
      { name: 'Onions', quantity: '3' }
    ];

    // Initially no items have been bought.
    self.itemsBought = [];

    // Buy an item. Use index rather than name, since it is possible (though unlikely) the same name could appear multiple times.
    self.buyItem = function(index) {
      var item = self.itemsToBuy[index];
      if (item)
      {
        // Remove the item from 'to buy', and add to 'bought'.
        self.itemsToBuy.splice(index, 1);
        self.itemsBought.push(item);
      }
    }
  }

})
();
