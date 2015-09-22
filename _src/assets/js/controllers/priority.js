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

        $scope.selectAll = function() {
            angular.forEach($scope.products, function (item) {
                item.priority = !$scope.select_all;
            });

            $scope.select_all = !$scope.select_all;
        }

    }]);
