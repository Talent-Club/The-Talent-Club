(function () {
    'use strict';

    angular
        .module('app.stripe')
        .controller('StripeController', StripeController)

    StripeController.$inject = ['stripeFactory', 'StripeCheckout', '$stateParams', '$state', 'SweetAlert'];

    function StripeController(stripeFactory, StripeCheckout, $stateParams, $state, SweetAlert) {
        /* jshint validthis:true */
        var vm = this;
        vm.buy = buy;

        var handler = StripeCheckout.configure({
            name: "The Talent Club"
        });


        activate();

        function buy(product) {
            var options = {
                amount:  9999
            };

            handler.open(options)
                .then(function (result) {
                    console.log(result);
                    var stripeToken = result[0].id;
                    

                    stripeFactory
                        .create($stateParams.memberId, stripeToken)
                        .then(function (stripeToken) {
                            console.log(stripeToken);
                            SweetAlert.swal("Welcome to The Talent Club", "Congrats!", "success")
                            $state.go('login');
                        });
                });
        }

        function activate() {}
    }
})();
