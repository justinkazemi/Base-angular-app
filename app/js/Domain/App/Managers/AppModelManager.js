(function (angular) {

  angular.module('Domain.App.Managers')
    .factory('AppModelManager', [
      AppModelManagerFactory
    ]);

  function AppModelManagerFactory() {

    function AppModelManager(data) {
      this.currentUser = null;
    }

    AppModelManager.prototype.setCurrentUser = function (user) {
      this.currentUser = user;
    };

    AppModelManager.prototype.getCurrentUser = function () {
      return this.currentUser;
    };

    return AppModelManager;

  }

}(window.angular));