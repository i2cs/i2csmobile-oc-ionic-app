'use strict';

angular.module('paytabs.module')
    .config(function config($stateProvider) {
        $stateProvider.state('app.menu.payment_modules.paytabs', {
            url: '/paytabs',
               abstract: true,
               views: {
                   'paymentsContent': {
                       templateUrl: 'app/payment_modules/paytabs/templates/layout.html'
                   }
               }
           })
           .state('app.menu.payment_modules.paytabs.home', {
               url: '/home',
               views: {
                   'paytabsContent': {
                       templateUrl: 'app/payment_modules/paytabs/templates/home.html',
                       controller: 'PaymentPaytabsCtrl'
                   }
               }
           })
    });