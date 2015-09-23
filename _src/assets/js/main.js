"use strict";
angular.module("svApp", ['ngRoute'], function ($interpolateProvider) {
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
});
