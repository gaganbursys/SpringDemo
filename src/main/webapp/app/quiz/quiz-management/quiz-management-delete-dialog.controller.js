(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .controller('QuizManagementDeleteController', QuizManagementDeleteController);

    QuizManagementDeleteController.$inject = ['$uibModalInstance', 'entity', 'QuizManagementService','$state'];

    function QuizManagementDeleteController ($uibModalInstance, entity, QuizManagementService,$state) {
        var vm = this;
        vm.id = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
        	console.log(id);
        	
        	QuizManagementService.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                    $state.reload();
                    
                 //   toastr.warning("Record Delete Successfully");
                });
        }
    }
})();
