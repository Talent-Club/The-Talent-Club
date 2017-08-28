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
        vm.yesMember= yesMember;

        vm.makeMember = {
            isMember: true
        };

        activate();

        function activate() {
            adminFactory
                .getAll()
                .then(function (members) {
                    vm.members = members;
                });
        };

        function remove(member) {
            var confirm = confirm("Are you sure you want to delete?")
            if (confirm == true)
                adminFactory
                .remove(member)
                .then(function () {
                    alert('Member has been deleted');
                    activate();
                });
        };



        function yesMember(makeMember) {
            console.log(makeMember);
            authFactory
                .register(makeMember)
                .then(function (response){
                    console.log(makeMember)
                    activate();
                })
                .catch(function (error) {
                    alert(error.error_description);
                });
        };

    }
})();
