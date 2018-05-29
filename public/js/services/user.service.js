(function () {
    'use strict';

    angular
        .module('app')
        .service('userService', Service);

    Service.$inject = ['$http', 'constantService', '$cookies', '$base64', '$window'];
    function Service($http, constantService, $cookies, $base64, $window) {
        this.login = login;
        this.logout = logout;

        this.saveUserData = saveUserData;
        this.getUserData = getUserData;

        ////////////////

        function login(user) {
            var url = constantService.login;

            return $http
                .post(url, user)
                .then(success, failure);
        }

        function saveUserData(user) {
            $cookies.put('context', $base64.encode(JSON.stringify(user)));
        }

        function getUserData() {
            return JSON.parse($base64.decode($cookies.get('context')));
        }

        function logout() {
            _.forEach($cookies.getAll(), function (value, key) {
                $cookies.remove(key);
            });

            $window.location.reload();
        }

        function success(response) {
            return response.data;
        }

        function failure(err) {
            return err.data;
        }
    }
})();