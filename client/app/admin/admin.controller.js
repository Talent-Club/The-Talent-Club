(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController)

    AdminController.$inject = ['$stateParams', '$state', 'adminFactory', 'authFactory'];

    function AdminController($stateParams, $state, adminFactory, authFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.remove = remove;
        vm.makeMember= makeMember;

        activate();

        function activate() {
            adminFactory
                .getAll()
                .then(function (members) {
                    vm.members = members;
                });
        };

        function remove(member) {
            var x = confirm("Are you sure you want to delete?")
            if (x)
                adminFactory
                .remove(member)
                .then(function () {
                    activate();
                });
        };



        function makeMember(member) {
            adminFactory
                .update(member)
                .then(function (response){
                    console.log(response)
                    activate();
                })
                .catch(function (error) {
                    alert(error.error_description);
                });
        };

    }
})();
