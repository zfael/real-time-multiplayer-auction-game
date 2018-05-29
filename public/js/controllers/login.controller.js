(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginController', Controller);

    Controller.$inject = ['$scope', '$window', 'userService'];
    function Controller($scope, $window, userService) {

        //scope functions
        $scope.go = go;

        //scope var
        $scope.context = {};

        activate();

        ////////////////

        function activate() {

        }

        function go() {

            userService
                .login($scope.context)
                .then(function(user) {
                    userService.saveUserData(user);
                    $window.location.href = '/';
                });
        }
    }
})();