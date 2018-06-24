'use strict';

angular
    .module('pp_standard.module')
    .controller('PaymentPPStandardCtrl', function ($scope, $rootScope, $stateParams, $state, CartService, PaymentPPStandardService) {

        $scope.payment_initiated = false;

        $scope.pay = function () {
            $scope.payment_initiated = true;

			$rootScope.paymentAndShipping.order_status_id = 0;
			CartService.AddOrder($rootScope.paymentAndShipping).then(function (data) {
				PaymentPPStandardService.OpenPaymetWindow().then(function (data) {	
					$state.go($scope.success_state, {}, { reload: true });
				}, function (data) {
					if (data && data.error)
						alert(data.error);
					$scope.payment_initiated = false;
				});

                // set cart badge to empty
                $rootScope.cartItemCount = "";
                if (data && data.error)
                    alert(data.error);
            });
        }

        $scope.$on('$ionicView.enter', function () {
            //$scope.checkout = $stateParams.checkout;
            //$scope.total_amount_clean = $stateParams.total_amount_clean;
            $scope.success_state = $stateParams.success_state;
            //$scope.order_id = $stateParams.order_id;
            //$scope.currency = $stateParams.currency;
            $scope.total_amount = $stateParams.total_amount;
            $scope.payment_initiated = false;
            $scope.pay();
        });
    });