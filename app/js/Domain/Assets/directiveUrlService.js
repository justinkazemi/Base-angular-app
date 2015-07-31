(function (angular) {
  'use strict';

  var templatesDir = '/dist/templates/';

  angular.module('Domain.Assets')

    .constant('directiveUrlService', {

      // TEMPLATES
      template: {

        main: path('main.tmpl.html'),

      }

    });

  function path(relToTemplateDir) {
    return [templatesDir, relToTemplateDir].join('');
  }

}(angular));
