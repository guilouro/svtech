"use strict";
angular.module("svApp", ['ngRoute', 'ngCookies'], function ($interpolateProvider) {
        $interpolateProvider.startSymbol("{[{");
        $interpolateProvider.endSymbol("}]}");
    }
).config(function($httpProvider, $routeProvider){
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $routeProvider
        .when('/', {
            templateUrl: '/static/templates/index.html',
            controller: 'PriorityController'
        })

        .when('/login/', {
            templateUrl: '/static/templates/login.html',
            controller: 'LoginController'
        })

        .otherwise ({ redirectTo: '/' });

}).factory('Auth', ['$cookieStore', '$http', function ($cookieStore, $http) {

    var currentUser = $cookieStore.get('login') || 0,
    publicStates = ['login', 'signup', 'recovery'];

    return {

        login: function (user, success, error) {
            $http.post('/login/', user)
            .success(function () {
                currentUser = 1;
                success();
            })
            .error(error);
        },

        authorize: function(state) {
            return (this.isLoggedIn() && (publicStates.indexOf(state) < 0)) || (!this.isLoggedIn() && (publicStates.indexOf(state) >= 0));
        },

        isLoggedIn: function() {
            return !!currentUser;
        }
    };

}]);
