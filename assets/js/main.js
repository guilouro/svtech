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

    }])


    .controller('LoginController', ['$scope', 'Auth', function($scope, Auth){

        $scope.login = function() {

            Auth.login({
                username: $scope.username,
                password: $scope.passwd
            },
            function () {
                $state.go('index.main');
            },
            function (error) {
                // $scope.error = true;
                console.log(error);
            });

            console.log($scope.username, $scope.passwd);
        }

    }]);


// http://stackoverflow.com/questions/21891218/using-state-methods-with-statechangestart-tostate-and-fromstate-in-angular-ui
},{}],2:[function(require,module,exports){
"use strict";
angular.module("svApp", ['ui.router', 'ngCookies'], function ($interpolateProvider) {
        $interpolateProvider.startSymbol("{[{");
        $interpolateProvider.endSymbol("}]}");

}).config(function($httpProvider, $stateProvider, $urlRouterProvider){
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: '/static/templates/index.html',
            controller: 'PriorityController'
        })

        .state('login', {
            url: '/login/',
            templateUrl: '/static/templates/login.html',
            controller: 'LoginController'
        });

        $urlRouterProvider.otherwise ('/');

}).factory('Auth', ['$cookieStore', '$http', function ($cookieStore, $http) {

    var currentUser = $cookieStore.get('login') || 0,
    publicStates = ['login'];

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

}]).run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
        console.log(event, toState, toParams, fromState);

        if (!Auth.authorize(toState.name)) {
            event.preventDefault();
            if (fromState.url === '^') {
                if (Auth.isLoggedIn()) {
                    $state.go('index');
                } else {
                    $state.go('login');
                }
            }
        }
    });
}]);

},{}]},{},[2,1]);
