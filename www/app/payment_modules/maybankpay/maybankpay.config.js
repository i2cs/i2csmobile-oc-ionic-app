'use strict';

angular.module('maybankpay.module')
    .config(function config($stateProvider) {
        $stateProvider.state('app.menu.payment_modules.maybankpay', {
            url: '/maybankpay',
               abstract: true,
               views: {
                   'paymentsContent': {
                       templateUrl: 'app/payment_modules/maybankpay/templates/layout.html'
                   }
               }
           })
           .state('app.menu.payment_modules.maybankpay.home', {
               url: '/home',
               views: {
                   'maybankpayContent': {
                       templateUrl: 'app/payment_modules/maybankpay/templates/home.html',
                       controller: 'PaymentMaybankpayCtrl'
                   }
               }
           })
    });