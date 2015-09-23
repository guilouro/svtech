(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('svApp')
    .controller('PriorityController', ['$scope', '$http', function($scope, $http) {

        $scope.products = {};
        $scope.select_all = false;
        $http.get('/list/').
            success(function(data){
                $scope.products = data.products;
            });

        $scope.setPriority = function() {
            $http.post('/setpriority/', {products: $scope.products}).
                then(function(response){
                    console.log(response);
                });

            console.log($scope.products);
        }

        $scope.checkAll = function(act) {
            angular.forEach($scope.products, function (item) {
                item.priority = act;
            });
        }

    }]);

},{}],2:[function(require,module,exports){
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

},{}]},{},[2,1]);
