(function(){
  'use strict';

  angular.module('data')
  .component('items', {
    templateUrl: 'src/templates/components/items.component.template.html',
    bindings: {
      items: '<data'
    }
  });

})();
