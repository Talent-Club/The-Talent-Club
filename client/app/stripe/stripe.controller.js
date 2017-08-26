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

        var handler = StripeCheckout.configure({
            name: "The Talent Club"
        });


        activate();

        function buy(product) {
            var options = {
                // description: product.name,
                amount:  100
            };

            handler.open(options)
                .then(function (result) {
                    console.log(result);
                    var stripeToken = result[0].id;
                    

                    stripeFactory
                        .create(stripeToken)
                        .then(function () {
                            console.log(stripeToken);
                            alert('Thank you for joining the Talent Club!');
                        });
                });
        }

        function activate() {}
    }
})();
