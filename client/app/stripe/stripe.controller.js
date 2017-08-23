(function () {
    'use strict';

    angular
        .module('app.stripe')
        .controller('StripeController', StripeController)

    StripeController.$inject = ['stripeFactory', 'StripeCheckout'];

    function StripeController(stripeFactory, StripeCheckout) {
        /* jshint validthis:true */
        var vm = this;
        vm.buy = buy;


        activate();

        function buy(product) {
            var options = {
                description: product.name,
                amount: product.retailPrice * 100
            };

            handler.open(options)
                .then(function (result) {
                    var stripeToken = result[0].id;

                    stripeFactory
                        .create(stripeToken)
                        .then(function () {
                            alert('Thank you for joining the Talent Club!');
                        });
                });
        }

        function activate() {}
    }
})();
