(function (angular) {

  angular.module('Domain.User')
    .factory('UserSource', ['ajaxSource',
      UserSourceFactory
    ]);

  function UserSourceFactory(ajaxSource) {

    return {
      getCurrentUser: getCurrentUser
    };

    // Public
    function getCurrentUser() {
      // Return promise here.
      // return ajaxSource.makeRequest(
      //   'get',
      //   '/api/',
      //   {
      //     'data': null
      //   }
      // );
      // Return test data for now.
      return {  
        'type': 'user',
        'uuid': 123456789,
        'data': {
          'firstName': 'Justin'
        }
      }
    }

  }

}(window.angular));