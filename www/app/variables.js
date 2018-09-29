angular.module('starter')
    //.constant('BASE_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php')
    .constant('BASE_URL', 'https://glamourbeauty.com/index.php')
    //.constant('BASE_API_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php?route=api2')
    .constant('BASE_API_URL', 'https://glamourbeauty.com/index.php?route=api2')
    .constant('WEBSITE', 'https://glamourbeauty.com')
    .constant('FORGOT_LINK', 'https://glamourbeauty.com/index.php?route=account/forgotten')
    .constant('EMAIL', 'amal@glamourbeauty.net')
    .constant('PHONE', '966565494620')
    .constant('ANALYTICS_ID', 'UA-120053509-1')
	.constant('COUPONS_ENABLED', true)
    .constant('REWARDS_ENABLED', true)
    .constant('STATUSBAR_COLOR', "#387ef5")
    .constant('LANGUAGES', [
            { name: "Arabic", language_id: "ar-SA" },
            { name: "English", language_id: "en-US" }])
    .constant('WELCOME_SLIDES', [
    ])
    .constant('RTL_LANGUAGES', ['ar'])
    .constant('INTERCOM_INTEGRATION', false) // please check www/app/common/services/intercom.service.js
    .constant('ONESIGNAL_APP_ID', "d628b561-585b-4b3f-98bc-569caea3f59c") // get OneSignal app id from http://onesignal.com
    .constant('GCM_SENDER_ID', "371712602795")
    .constant('MENU_LAYOUT', "tabs")

    // if demo mode is set to true, some dynamic configurations 
    // used only for demo app will appear in info section
    .constant('DEMO_MODE', false)