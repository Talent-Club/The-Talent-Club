(function(){
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController)

    AdminController.$inject = ['$stateParams', '$state','adminFactory'];

    function AdminController($stateParams, $state, adminFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.remove = remove;

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

    }
})();
