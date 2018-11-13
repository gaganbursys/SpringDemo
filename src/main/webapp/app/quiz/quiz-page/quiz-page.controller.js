(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .controller('QuizPageController', QuizPageController);

    QuizPageController.$inject = ['$filter','QuizPageService','$state','$stateParams','$scope','QuizListService','ParseLinks','pagingParams','AlertService','paginationConstants','QuizService'];

    function QuizPageController ($filter,QuizPageService,$state,$stateParams,$scope,QuizListService,ParseLinks,pagingParams,AlertService,paginationConstants,QuizService) {
        var vm = this;
        vm.student = $stateParams.student;
        vm.testSubmitted=false;
        vm.mathList=[];
        vm.javaList=[];
        vm.gkList=[];
        vm.finalList=[];
        vm.loadAll=loadAll;
        vm.page = 1;
        vm.totalItems = null;
        vm.links = null;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.transition = transition;
        vm.getQuestion=getQuestion;
        vm.updateAnswer=updateAnswer;
        vm.quiz={};
        vm.update = update;
        
        vm.rd1 = false;
        vm.rd2 = false;
        vm.rd3 = false;
        vm.rd4 = false;
        
        function update () {
        	console.log("inupdate  ",vm.student )
        	QuizService.update(vm.student, onSaveSuccess, onSaveError);
            }
        
        function onSaveSuccess (result,headers) {
            console.log(result);
        }

        function onSaveError () {
        }
        console.log("vm.student  ",vm.student )
        loadAll();
        var countDownDate = new Date(new Date().getTime() + 1*10000).getTime();

	     var x = setInterval(function() {
	       var now = new Date().getTime();
	       var distance = countDownDate - now;
	       var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	       var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	       if((minutes=="0" && seconds=="0") || (minutes=="00" && seconds=="00")){
	    	   clearInterval(x);
		         $scope.timeleft = "00:00";
		         vm.student.result=[];
		         vm.student.result=vm.result;
		         update();
		         vm.testSubmitted=true;
	       }
	       $scope.timeleft=minutes + ":" +seconds; 
	       $scope.$apply();
	       if (distance < 0) {
	         clearInterval(x);
	         $scope.timeleft = "00:00";
	        /* vm.student.result=[];
	         vm.student.result=vm.result;
	         update();*/
	         vm.testSubmitted=true;
	       }
	     }, 1000);
	     
	     
	     function loadAll () {
	        	QuizListService.query({
	                page: pagingParams.page - 1,
	                size: vm.itemsPerPage,
	                sort: sort()
	            }, onSuccess, onError);
	        	
	        }

	        function onSuccess(data, headers) {
	            var hiddenUsersSize = 0;
	         
	            vm.links = ParseLinks.parse(headers('link'));
	            vm.totalItems = headers('X-Total-Count') - hiddenUsersSize;
	            vm.queryCount = vm.totalItems;
	            vm.page = pagingParams.page;
	        
	            var mathId=1;
	            var javaId=11;
	            var gkId=21;
	            
	            angular.forEach(data,function(ques){
	    			if(ques.category.toLowerCase()=="1"){
	    				ques.categoryName ="Math";
	    				ques.id=mathId;
	    				 vm.finalList.push(ques);
	    				mathId++;
	    			}else if(ques.category.toLowerCase()=="2"){
	    				ques.categoryName ="Java";
	    				ques.id=javaId;
	    				 vm.finalList.push(ques);
	    				javaId++;
	    			}else if(ques.category.toLowerCase()=="3"){
	    				ques.categoryName ="GK";
	    				ques.id=gkId;
	    				 vm.finalList.push(ques);
	    				gkId++;
	    			}
	    		});
	            console.log("vm.mathList",vm.finalList);
	            getQuestion(1);
	        }
	        
	        function getQuestion(id){
	        	angular.forEach(vm.finalList,function(ques){
	        		if(ques.id==id){
	        			vm.quiz = ques;
	        			vm.quiz.current= true;
	        		}
	        	});
	        	console.log("Id ",id);
	        	console.log("quiz ",vm.quiz);
	        	 vm.rd1 = false;
	             vm.rd2 = false;
	             vm.rd3 = false;
	             vm.rd4 = false;
	        }
	        
	        
	        vm.result=[];
	        function updateAnswer(ans){
	        	vm.quiz.selectedAns=ans;
	        	vm.result.push(vm.quiz);
	        }
	        

	        function onError(error) {
	            AlertService.error(error.data.message);
	        }
	        
	        function sort () {
	            var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
	            if (vm.predicate !== 'id') {
	                result.push('id');
	            }
	            return result;
	        }

	        function loadPage (page) {
	            vm.page = page;
	            vm.transition();
	        }

	        function transition () {
	            $state.transitionTo($state.$current, {
	                page: vm.page,
	                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
	                search: vm.currentSearch
	            });
	        }
       
    }
})();
