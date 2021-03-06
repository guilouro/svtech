angular.module('svApp')
    .controller('PriorityController', ['$scope', '$http', '$state', 'Auth', function($scope, $http, $state, Auth) {

        $scope.products = {};
        $scope.select_all = false;
        $http.get('/list/').
            success(function(data){
                $scope.products = data.products;
            });

        $scope.setPriority = function() {
            $http.post('/setpriority/', {products: $scope.products}).
                then(function(response){
                    // console.log(response);
                });

        }

        $scope.checkAll = function(act) {
            angular.forEach($scope.products, function (item) {
                item.priority = act;
            });
        }

        $scope.logout = function() {
            Auth.logout(function(){
                $state.go('login');
            });
        }

    }])


    .controller('LoginController', ['$scope', '$state', 'Auth', function($scope, $state, Auth){

        $scope.error = '';

        $scope.login = function() {

            Auth.login({
                username: $scope.username,
                password: $scope.passwd
            },
            function () {
                $state.go('index');
            },
            function (error) {
                $scope.error = 'Login incorreto';
            });
        }

    }])


    .controller('StatusController', ['$scope', '$http', function($scope, $http){

        $scope.products = [];
        $scope.currentPage = 0;
        $scope.pageSize = 10;

        $http.get('/list/').
            success(function(data){
                for (var i = 0; i < data.products.length; i++) {
                    if(data.products[i].priority) {
                        $scope.products.push(data.products[i]);
                    }
                };
            });

        $scope.numberOfPages=function(){
            return Math.ceil($scope.products.length/$scope.pageSize);
        }

    }]).filter('startFrom', function() {
        return function(input, start) {
            start = +start;
            return input.slice(start);
        }
    });
