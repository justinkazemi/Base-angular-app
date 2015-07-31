(function (angular) {
  'use strict';

  var imageDir = '/src/images/';

  angular.module('Domain.Assets')

    .constant('directivePathService', {

      // Images
      image: {       

      }

    });

  function path(relToTemplateDir) {
    return [imageDir, relToTemplateDir].join('');
  }

}(angular));
