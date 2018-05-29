(function () {
    'use strict';

    angular
        .module('app')
        .directive('auction', Directive);

    Directive.$inject = ['auctionService'];
    function Directive(auctionService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'js/directives/auction/auction.html',
            scope: {
                noAuction: '=',
                currentAuction: '=',
                user: '=',
            },
            link: function ($scope, elm, attrs) {
                $scope.enterYourBid = enterYourBid;
                $scope.warnMessage = false;
                $scope.bidSubmmited = false;
                $scope.yourBid = {}

                function enterYourBid() {
                    if (!$scope.yourBid.value) {
                        $scope.warnMessage = true;                        
                    }
                    else if ($scope.yourBid.value <= $scope.currentAuction.minBid) {
                        $scope.warnMessage = true;
                    } else if ($scope.yourBid.value < $scope.currentAuction.winningBid) {
                        $scope.warnMessage = true;
                    } else {
                        $scope.warnMessage = false;

                        auctionService.enterNewBid({
                            winningUser: $scope.user.userName,
                            winningBid: $scope.yourBid.value
                        })
                            .then(function () {
                                $scope.bidSubmmited = true;
                                setTimeout(() => {
                                    $scope.bidSubmmited = false;
                                }, 2000);
                            });
                    }
                }
            }
        };

        return directive;
    }
})();