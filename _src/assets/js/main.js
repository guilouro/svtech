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

        .otherwise ({ redirectTo: '/' });
});
