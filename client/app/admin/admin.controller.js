(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController)

    AdminController.$inject = ['$stateParams', '$state', 'adminFactory', 'authFactory', 'SweetAlert'];

    function AdminController($stateParams, $state, adminFactory, authFactory, SweetAlert) {
        /* jshint validthis:true */
        var vm = this;
        vm.remove = remove;
        vm.makeMember = makeMember;

        activate();

        function activate() {
            adminFactory
                .getAll()
                .then(function (members) {
                    vm.members = members;
                });
        };

        function remove(member) {
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this information",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                },
                function (cancelled) {
                    console.log(cancelled)
                    if (cancelled) {
                        adminFactory
                            .remove(member)
                            .then(function () {
                                activate();
                                SweetAlert.swal("Deleted!", 'User was deleted', 'success');
                            });
                    };
            });


        };



        function makeMember(member) {
            adminFactory
                .update(member)
                .then(function (response) {
                    console.log(response)
                    activate();
                })
                .catch(function (error) {
                    alert(error.error_description);
                });
        };

    }
})();
