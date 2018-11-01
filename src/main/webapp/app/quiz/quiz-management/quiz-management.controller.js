(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .controller('QuizManagementController', QuizManagementController);

    QuizManagementController.$inject = ['$filter'];

    function QuizManagementController (filter) {
        var vm = this;
        vm.quesCategoryArr =[ { "id":"1","category":"Math"},{ "id":2,"category":"JAVA" }, { "id":"3","category":"GK"}];
        vm.quesCategory = vm.quesCategoryArr[0];
    }
})();
