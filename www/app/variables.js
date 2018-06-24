angular.module('starter')
    //.constant('BASE_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php')
    .constant('BASE_URL', 'http://miniconcity.com/index.php')
    //.constant('BASE_API_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php?route=api2')
    .constant('BASE_API_URL', 'http://miniconcity.com/index.php?route=api2')
    .constant('WEBSITE', 'http://miniconcity.com')
    .constant('FORGOT_LINK', 'http://miniconcity.com/index.php?route=account/forgotten')
    .constant('EMAIL', ' bingo-app@hk-bingo.com')
    .constant('PHONE', '+852 3621-0308')
    .constant('ANALYTICS_ID', 'UA-121209795-1')
	.constant('COUPONS_ENABLED', true)
    .constant('REWARDS_ENABLED', true)
    .constant('STATUSBAR_COLOR', "#387ef5")
    .constant('LANGUAGES', [
            { name: "English", language_id: "en-US" },
            { name: "Chinese", language_id: "zh-CN" }])
    .constant('WELCOME_SLIDES', [
    ])
    .constant('RTL_LANGUAGES', ['ar'])
    .constant('INTERCOM_INTEGRATION', false) // please check www/app/common/services/intercom.service.js
    .constant('ONESIGNAL_APP_ID', "") // get OneSignal app id from http://onesignal.com
    .constant('GCM_SENDER_ID', "")
    .constant('MENU_LAYOUT', "tabs")

    // if demo mode is set to true, some dynamic configurations 
    // used only for demo app will appear in info section
    .constant('DEMO_MODE', false)