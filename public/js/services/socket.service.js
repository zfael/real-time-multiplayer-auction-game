(function () {
    'use strict';

    angular
        .module('app', [])
        .service('socketService', Service);

    Service.$inject = ['$rootScope', '$log'];
    function Service($rootScope, $log) {
        $log.debug('socketService instantiate...');

        var socket = io.connect();
        $log.debug('socketService connected...');

        var service = {
            on: on,
            removeAllListeners: removeAllListeners
        };

        return service;

        ////////////////
        function on(eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }


        function removeAllListeners() {
            socket.removeAllListeners();
        }
    }
})();