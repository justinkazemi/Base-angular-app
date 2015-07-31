angular.module('Domain.Assets').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/dist/templates/main.tmpl.html',
    "<!-- <div ui-view=\"navBar\"></div> --><div ui-view=\"content\"></div><!-- <div ui-view=\"footer\"></div> -->"
  );

}]);
