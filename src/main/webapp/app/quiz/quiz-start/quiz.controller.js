(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .controller('QuizController', QuizController);

    QuizController.$inject = ['$filter','QuizService','$state'];

    function QuizController (filter,QuizService,$state) {
        var vm = this;
        vm.student={};
        vm.save = save;
        
        function save () {
        	QuizService.save(vm.student, onSaveSuccess, onSaveError);
            }
        
        function onSaveSuccess (result,headers) {
            $state.go('quiz-page', { student: vm.student });
            console.log(result);
        }

        function onSaveError () {
        }
        
        
    }
})();
