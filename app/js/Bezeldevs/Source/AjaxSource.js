(function (angular) {

  angular.module('BezelDevs.Source')
    .service('ajaxSource', ['$http', '$q',
      ajaxSourceService
    ]);

  function ajaxSourceService($http, $q) {

    var self = this;

    // public interface
    self.makeRequest = makeRequest;

    // private
    function makeRequest(method, url, data, queryParams) {
      var request = $http({
        method: method,
        url: url,
        data: arguments[2] ? data : {},
        params: arguments[3] ? queryParams : {}
      });

      return request.then(handleSuccess, handleError);
    }

    function handleError(response) {
      // @todo: Handle throwing error.

      return $q.reject("error");
    };

    function handleSuccess(response) {
      return response.data;
    };

  }

}(window.angular));