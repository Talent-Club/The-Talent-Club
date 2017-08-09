(function(){
    'use strict';

    angular
        .module('app.stripe')
        .controller('StripeController', StripeController)

    StripeController.$inject = ['stripeFactory'];

    function StripeController(stripeFactory) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        function activate() { }
    }
})();
