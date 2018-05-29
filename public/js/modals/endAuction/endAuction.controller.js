(function () {
    'use strict';

    angular
        .module('app')
        .controller('endAuctionController', Controller);

    Controller.$inject = ['$scope', 'winner'];
    function Controller($scope, winner) {

        $scope.winner = winner;

        ////////////////

        setTimeout(() => {
            $scope.$close();
        }, 10000);
    }
})();