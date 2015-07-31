(function (angular) {

  angular.module('BezelDevs.Entity')
    .factory('EntityConfig', ['User', 'UserRepository',
      EntityConfigFactory
    ]);

  function EntityConfigFactory(User, UserRepository) {

    return {
      
      'user': {
        'data': {
          'firstName': null
        },
        'model': User,
        'repository': UserRepository
      }

    };

  }

}(window.angular));