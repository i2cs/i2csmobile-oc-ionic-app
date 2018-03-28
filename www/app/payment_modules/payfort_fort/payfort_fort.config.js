'use strict';

angular.module('payfort_fort.module')
    .config(function config($stateProvider) {
        $stateProvider.state('app.menu.payment_modules.payfort_fort', {
            url: '/payfort_fort',
               abstract: true,
               views: {
                   'paymentsContent': {
                       templateUrl: 'app/payment_modules/payfort_fort/templates/layout.html'
                   }
               }
           })
           .state('app.menu.payment_modules.payfort_fort.home', {
               url: '/home',
               views: {
                   'PayfortContent': {
                       templateUrl: 'app/payment_modules/payfort_fort/templates/home.html',
                       controller: 'PayfortCtrl'
                   }
               }
           })
    });
