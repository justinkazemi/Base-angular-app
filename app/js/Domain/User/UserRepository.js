(function (angular) {

  angular.module('Domain.User')
    .factory('UserRepository', ['EntityRepository', 'UserSource', 'User',
      UserRepositoryFactory
    ]);

  function UserRepositoryFactory(EntityRepository, UserSource, User) {

    function UserRepository(entityConstructor, defaultData) {
      EntityRepository.prototype.constructor.call(this, entityConstructor, defaultData);
    }

    UserRepository.prototype = Object.create(EntityRepository.prototype);
    UserRepository.prototype.constructor = UserRepository;

    UserRepository.prototype.getCurrentUser = function() {
      // Explicitly build and return User Model.
      var user = UserSource.getCurrentUser();
      return new User(user.data, user);
    }

    UserRepository.prototype.update = function(model) {
      console.log("update User %0", model);
    }

    UserRepository.prototype.toEntity = function(model) {
      var entity = EntityRepository.prototype.toEntity.call(this, model);

      return entity;
    };

    return UserRepository;
  }

}(window.angular));