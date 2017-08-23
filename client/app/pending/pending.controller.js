(function(){
    'use strict';

    angular
        .module('app.pending')
        .controller('PendingController', PendingController)

    PendingController.$inject = ['$stateParams','$state'];

    function PendingController($stateParams, $state) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { 
            setTimeout(function(){ $state.go('landing'); }, 10000);
        }
    }
})();
