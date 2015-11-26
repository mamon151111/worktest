AuctionApp.config(['$authProvider', function ($authProvider) {
    'use strict';
    $authProvider.configure({
        apiUrl:                  '/api',
        signOutUrl:              '/AuctionUsers/logout',
        emailRegistrationPath:   '/AuctionUsers',
        accountUpdatePath:       '/AuctionUsers/{id}',
        emailSignInPath:         '/AuctionUsers/login',
        storage:                 'localStorage',
        tokenValidationPath:     '/AuctionAccessTokens/{id}/user',
        forceValidateToken:      false,
        tokenFormat: {
            "access-token": "{{ id }}",
            "token-type":   "Bearer",
            "client":       "{{ userId }}",
            //"expiry":       "{{ expiry }}",
            "uid":          "{{ userId }}"
        },
        parseExpiry: function (headers) {
            // convert from UTC ruby (seconds) to UTC js (milliseconds)
            return (parseInt(headers.expiry, 10) * 1000) || null;
        },
        handleLoginResponse: function (response) {
            return response;
        },
        handleAccountUpdateResponse: function (response) {
            return response.data;
        },
        handleTokenValidationResponse: function (response) {
            var result = {};
            result.uid = result.clientId = result.id = response.id;
            result.username = response.username;
            result.email = response.email;
            return result;
        }
    });
}]);