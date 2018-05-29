(function () {
    'use strict';

    angular
        .module('app')
        .directive('userStats', Directive);

    Directive.$inject = ['userService'];
    function Directive(userService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'js/directives/user/user.html',
            scope: {
                user: '='
            },
            link: function(scope, elm, attrs) {
                scope.logout = function() {
                    userService.logout();
                }
            }
        };

        return directive;
    }
})();