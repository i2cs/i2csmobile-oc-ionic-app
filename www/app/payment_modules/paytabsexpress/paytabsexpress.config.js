'use strict';

angular.module('paytabsexpress.module')
    .config(function config($stateProvider) {
        $stateProvider.state('app.menu.payment_modules.paytabsexpress', {
            url: '/paytabsexpress',
               abstract: true,
               views: {
                   'paymentsContent': {
                       templateUrl: 'app/payment_modules/paytabsexpress/templates/layout.html'
                   }
               }
           })
           .state('app.menu.payment_modules.paytabsexpress.home', {
               url: '/home',
               views: {
                   'paytabsexpressContent': {
                       templateUrl: 'app/payment_modules/paytabsexpress/templates/home.html',
                       controller: 'PaymentPaytabsexpressCtrl'
                   }
               }
           })
    });