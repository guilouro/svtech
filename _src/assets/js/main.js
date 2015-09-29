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

        .state('status', {
            url: '/status/',
            templateUrl: '/static/templates/status.html',
            controller: 'StatusController'
        })

        .state('login', {
            url: '/login/',
            templateUrl: '/static/templates/login.html',
            controller: 'LoginController'
        })

        .state('logout', {
            url: '/logout/',
            controller: 'LogoutController'
        });

        $urlRouterProvider.otherwise ('/');

}).factory('Auth', ['$cookieStore', '$http', function ($cookieStore, $http) {

    var currentUser = $cookieStore.get('svtch_usr') || 0;
    var publicStates = ['login'];

    return {

        login: function (user, success, error) {
            $http.post('/login/', user)
            .success(function () {
                $cookieStore.put('svtch_usr', 1);
                currentUser = 1;
                success();
            })
            .error(error);
        },

        logout: function(success) {
            $http.get('/logout/')
                .success(function(){
                    $cookieStore.remove('svtch_usr');
                    currentUser = 0;
                    success();
                });
        },

        authorize: function(state) {
            return (this.isLoggedIn() && (publicStates.indexOf(state) < 0)) || (!this.isLoggedIn() && (publicStates.indexOf(state) >= 0));
        },

        isLoggedIn: function() {
            return currentUser;
        }
    };

}]).run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

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
