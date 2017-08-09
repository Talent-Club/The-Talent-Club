(function(){
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController)

    LoginController.$inject = ['loginFactory'];

    function LoginController(loginFactory) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})();
