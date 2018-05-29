(function () {
    'use strict';

    angular
        .module('app')
        .controller('newAuctionController', Controller);

    Controller.$inject = ['$scope', 'currentItem', 'currentUser', 'auctionService'];
    function Controller($scope, currentItem, currentUser, auctionService) {

        $scope.auction = {};
        $scope.cancel = cancel;
        $scope.start = start;
        $scope.warnMessage = false;
        $scope.enterMinBid = false;
        $scope.errMessage = false;
        $scope.currentItem = currentItem;

        ////////////////

        function cancel() {
            $scope.$dismiss('cancel');
        }

        function start() {
            $scope.warnMessage = false;
            $scope.enterMinBid = false;
            $scope.errMessage = false;

            if (!$scope.auction || !$scope.auction.quantity || $scope.auction.quantity > currentItem.quantity) {
                $scope.warnMessage = true;
            } else if (!$scope.auction.minBid) {
                $scope.enterMinBid = true;
            } else {

                auctionService.newAuction({
                    userName: currentUser.userName,
                    itemId: currentItem.item.id,
                    quantity: $scope.auction.quantity,
                    minBid: $scope.auction.minBid
                })
                .then(function(result) {
                    if (result.message) {
                        $scope.errMessage = true
                    } else {
                        $scope.$close($scope.start);
                    }
                });
            }
        }
    }
})();