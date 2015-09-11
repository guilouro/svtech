angular.module('svApp')
    .controller('PriorityController', ['$scope', '$http', function($scope, $http) {

        $scope.test = '';
        $http.get('/list/').success(function(data){
            $scope.products = data.products;
        });

        $scope.setPriority = function() {
            console.log($scope.products);
        }

    }]);
