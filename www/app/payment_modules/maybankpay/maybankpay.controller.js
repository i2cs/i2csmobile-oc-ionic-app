'use strict';

angular
    .module('maybankpay.module')
    .controller('PaymentMaybankpayCtrl', function ($scope, $rootScope, $stateParams, $state, CartService, PaymentMaybankpayService, $ionicLoading) {

        $scope.payment_initiated = false;

        $scope.pay = function () {
            $scope.payment_initiated = true;
            placeOrder();
        }

        $scope.$on('$ionicView.enter', function () {
            //$scope.checkout = $stateParams.checkout;
            //$scope.total_amount_clean = $stateParams.total_amount_clean;
            $scope.success_state = $stateParams.success_state;
            //$scope.order_id = $stateParams.order_id;
            //$scope.currency = $stateParams.currency;
            $scope.total_amount = $stateParams.total_amount;
            $scope.payment_initiated = false;
            //$scope.pay();
        });

        var placeOrder = function () {
            $ionicLoading.show();

      			$rootScope.paymentAndShipping['order_status_id'] = 0;
      			CartService.AddOrder($rootScope.paymentAndShipping).then(function (data) {
      				$ionicLoading.hide();
      				// set cart badge to empty
      				$rootScope.cartItemCount = "";

      				PaymentMaybankpayService.OpenPaymetWindow(data.order_id).then(function (data) {
      					   $state.go($scope.success_state, {}, { reload: true });
      				}, function (data) {
        				if (data && data.error)
        					alert(data.error);
                if (data && data.warning)
          					alert(data.warning);
                $ionicLoading.hide();
        				$scope.payment_initiated = false;
        			});
      			}, function (data) {
      				if (data && data.error)
      					alert(data.error);
              if (data && data.warning)
        					alert(data.warning);
              $ionicLoading.hide();
      				$scope.payment_initiated = false;
      			});
        };
    });