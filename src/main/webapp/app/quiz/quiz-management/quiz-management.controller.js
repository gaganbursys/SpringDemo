(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .controller('QuizManagementController', QuizManagementController);

    QuizManagementController.$inject = ['$filter','$http' ];

    function QuizManagementController (filter,$http ) {
        var vm = this;
        vm.quiz={};
        vm.quesCategoryArr =[ { "id":"1","category":"Math"},{ "id":"2","category":"JAVA" }, { "id":"3","category":"GK"}];
        vm.quiz.category = vm.quesCategoryArr[0];
        vm.answerArr =[ { "id":1,"ans":"A"},{ "id":2,"ans":"B" }, { "id":3,"ans":"C"}, { "id":4,"ans":"D"}];
        
        vm.save = function(){
        	console.log("data ",vm.quiz);
        	vm.quiz.category = vm.quiz.category.id;
        	vm.quiz.correctAns = vm.quiz.correctAns.id;
        	  $http.post('api/quiz',vm.quiz).success(function(response){
              	console.log("response.CorrectAns");
              })
        }
        if(vm.id){
			vm.quiz = QuizManagementService.get({id:vm.id});
		}
        
    }
})();
