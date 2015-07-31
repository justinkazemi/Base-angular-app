(function (angular) {

  angular.module('App.Managers')
    .service('theAppModelManager', ['AppModelManager', 'DORM', 'UserRepository',
      theAppModelManagerService
    ]);

  function theAppModelManagerService(AppModelManager, DORM, UserRepository) {

    function theAppModelManager(data) {
      AppModelManager.prototype.constructor.call(this, data);
    }

    theAppModelManager.prototype = Object.create(AppModelManager.prototype);
    theAppModelManager.prototype.constructor = theAppModelManager;

    theAppModelManager.prototype.getCurrentUser = function() {
      return DORM.entityRepository('user').getCurrentUser();
    }

    return new theAppModelManager;

  }

}(window.angular));