(function(){
    'use strict';

    angular
        .module('app.landing')
        .controller('LandingController', LandingController)

    LandingController.$inject = ['$stateParams', '$state'];

    function LandingController($stateParams, $state) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})();
