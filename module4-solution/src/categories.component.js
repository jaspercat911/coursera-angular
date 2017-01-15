(function(){
  'use strict';

  angular.module('data')
  .component('categories', {
    templateUrl: 'src/templates/components/categories.component.template.html',
    bindings: {
      categories: '<data'
    }
  });

})();
