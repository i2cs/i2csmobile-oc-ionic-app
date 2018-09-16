angular.module('starter')
    //.constant('BASE_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php')
    .constant('BASE_URL', 'https://fishwasel.com/index.php')
    //.constant('BASE_API_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php?route=api2')
    .constant('BASE_API_URL', 'http://localhost/opencart-3.0.2.0/upload/index.php?route=extension/api2')
    .constant('WEBSITE', 'https://fishwasel.com')
    .constant('FORGOT_LINK', 'https://fishwasel.com/index.php?route=account/forgotten')
    .constant('EMAIL', 'sales@fishwasel.com')
    .constant('PHONE', '+966535108080')
    .constant('ANALYTICS_ID', 'UA-79548648-1')
	.constant('COUPONS_ENABLED', true)
    .constant('REWARDS_ENABLED', false)
    .constant('STATUSBAR_COLOR', "#053065")
    .constant('LANGUAGES', [
            { name: "Arabic", language_id: "ar-EG" },
			{ name: "English", language_id: "en-US" }])
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