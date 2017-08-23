(function(){
    'use strict';

    angular
        .module('app.splash')
        .controller('SplashController', SplashController)

    SplashController.$inject = ['$stateParams', '$state', 'splashFactory'];

    function SplashController($stateParams, $state, splashFactory) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() {}


    }
})();
