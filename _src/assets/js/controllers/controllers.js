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