(function (angular) {

  angular.module('Domain.User')
    .factory('User', ['Entity',
      UserFactory
    ]);

  function UserFactory(Entity) {

    function User(defaultData, entity) {
      Entity.prototype.constructor.call(this, defaultData, entity);
    }

    User.prototype = Object.create(Entity.prototype);
    User.prototype.constructor = User;

    User.prototype.getFirstName = function () {
      return this.data.firstName;
    };

    return User;

  }

}(window.angular));