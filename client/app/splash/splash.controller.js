(function(){
    'use strict';

    angular
        .module('app.splash')
        .controller('SplashController', SplashController)

    SplashController.$inject = ['splashFactory'];

    function SplashController(splashFactory) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})();
