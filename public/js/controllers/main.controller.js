(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainController', Controller);

    Controller.$inject = ['$scope', '$rootScope', 'userService', 'inventoryService', 'auctionService', '$uibModal'];
    function Controller($scope, $rootScope, userService, inventoryService, auctionService, $uibModal) {

        var socket = io();

        $scope.user = userService.getUserData();
        $scope.inventories = [];
        $scope.currentAuction = {};
        $scope.noAuction = true;
        $scope.auctionActive = false;

        $scope.auctionFeedback = auctionFeedback;

        //listener
        socket.on('updateAuction', updateAuction);
        socket.on('winner', winnerHandler);
        socket.on('userLogged', userLoggedHandler);

        activate();

        ////////////////

        function activate() {

            return inventoryService
                .allInventoriesByUser({ id: $scope.user.userName })
                .then(function (inventories) {
                    return $scope.inventories = inventories;
                });
        }

        function modalEndAuction(winner) {

            var modalInstance = $uibModal.open({
                templateUrl: 'endAuction.html',
                controller: 'endAuctionController',
                size: 'md',
                resolve: {
                    winner: function () {
                        return winner;
                    }
                }
            });
            modalInstance.result.then(function () {
                return userService
                    .login($scope.user)
                    .then(function (user) {
                        userService.saveUserData(user);
                        $scope.user = userService.getUserData();
                        return activate();
                    });
            })
        }

        function updateAuction(obj) {
            if (obj && obj.auction !== null) {
                $scope.currentAuction = obj.auction;
                $scope.currentAuction.secondsRemaining = obj.time <= 0 ? 0 : obj.time;

                $scope.noAuction = false;
            } else {
                $scope.noAuction = true;
            }

            $scope.$apply();
        }

        function winnerHandler(obj) {

            if (obj) {
                modalEndAuction(obj);
            }
        }

        function userLoggedHandler(obj) {

            console.log(obj)
            if (obj) {
                if (obj.userName === $scope.user.userName) {
                    userService.logout()
                }
            }
        }

        function auctionFeedback() {
            $scope.auctionActive = true;
            setTimeout(() => {
                $scope.auctionActive = false;
            }, 3000);
        }
    }
})();