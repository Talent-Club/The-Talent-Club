(function(){
    'use strict';

    angular
        .module('app.pending')
        .controller('PendingController', PendingController)

    PendingController.$inject = ['pendingFactory'];

    function PendingController(pendingFactory) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})();
