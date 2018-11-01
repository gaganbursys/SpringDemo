(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .controller('QuizManagementController', QuizManagementController);

    QuizManagementController.$inject = ['$filter','$http'];

    function QuizManagementController (filter,$http) {
        var vm = this;
        vm.quesCategoryArr =[ { "id":"1","category":"Math"},{ "id":"2","category":"JAVA" }, { "id":"3","category":"GK"}];
        vm.quesCategory = vm.quesCategoryArr[0];
        vm.answerArr =[ { "id":1,"ans":"A"},{ "id":2,"ans":"B" }, { "id":3,"ans":"C"}, { "id":4,"ans":"D"}];
        
        $http.post('')
        
    }
})();
