angular.factory('Auth', ['$cookieStore', function ($cookieStore) {
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
            return (this.isLoggedIn() && (publicStates.indexOf(state) < 0)) || (!this.isLoggedIn() && (publicStates.indexOf(state) >= 0))
        },

        isLoggedIn: function() {
            return !!currentUser;
        }
    }

}]);