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
        vm.box = [];
        
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
        loadAll();
        var countDownDate = new Date(new Date().getTime() + 1*60000).getTime();

	     var x = setInterval(function() {
	       var now = new Date().getTime();
	       var distance = countDownDate - now;
	       var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	       var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	       if((minutes=="0" && seconds=="0") || (minutes=="00" && seconds=="00")){
	    	   clearInterval(x);
		         $scope.timeleft = "00:00";
		         vm.student.result=[];
		         vm.student.result=vm.finalList;
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
	            var javaId=2;
	            var gkId=3;
	          
	            angular.forEach(data,function(ques){
	    			if(ques.category.toLowerCase()=="1"){
	    				ques.categoryName ="Math";
	    				ques.id=mathId;
	    				vm.mathList.push(ques);
	    				mathId++;
	    			}else if(ques.category.toLowerCase()=="2"){
	    				ques.categoryName ="Java";
	    				ques.id=javaId;
	    				vm.javaList.push(ques);
	    				javaId++;
	    			}else if(ques.category.toLowerCase()=="3"){
	    				ques.categoryName ="GK";
	    				ques.id=gkId;
	    				vm.gkList.push(ques);
	    				gkId++;
	    			}
	    		});
	            
	            vm.finalList.push.apply(vm.finalList, vm.mathList);
	            vm.finalList.push.apply(vm.finalList, vm.javaList);
	            vm.finalList.push.apply(vm.finalList, vm.gkList);
	            
	            var num=1;
	            angular.forEach(vm.finalList ,function(ques){
	            	ques.id=num;
	            	num++;
	            });
	            getQuestion(1,vm.quiz);
	        }
	        
	        function getQuestion(id,lastQues){
	        	
	        	vm.rd1 = false;
	        	vm.rd2 = false;
	        	vm.rd3 = false;
	        	vm.rd4 = false;
	        	angular.forEach(vm.finalList,function(ques){
	        		if(lastQues.id==ques.id && lastQues.current && !lastQues.answered){
	        			ques.current= false;
	        			ques.visited = true;
	        		}
	        		if(ques.id==id){
	        			if(ques.selectedAns=="A"){
	        				vm.rd1=true;
	        			}
	        			if(ques.selectedAns=="B"){
	        				vm.rd2=true;
	        			}
	        			if(ques.selectedAns=="C"){
	        				vm.rd3=true;
	        			}
	        			if(ques.selectedAns=="D"){
	        				vm.rd4=true;
	        			}
	        			ques.current = true;
	        			vm.quiz = ques;
	        		}
	        	});
	        }
	        
	        vm.getBackgroud= function(id){  
	           var obj ={};
	           
	           angular.forEach(vm.finalList,function(ques){
	        		if(ques.id==id){
	        			if(ques.current && ques.selectedAns==null)
		           			obj.background='yellow';
	        			else if(ques.visited && ques.selectedAns==null)
		        	   		obj.background='red';
	        			else if(ques.answered && ques.selectedAns!=null)
	  	   					obj.background='#339933';
	        			else
	        				obj.background='rgba(255, 255, 255, 0.8)';
	        		}
	           });
	            return obj;
	         }
	        
	        vm.result=[];
	        function updateAnswer(id){
	        	angular.forEach(vm.finalList,function(ques){
	        		if(ques.id==id){
	        			if(vm.rd1==undefined){
	        				ques.selectedAns="A";
	        			}
	        			if(vm.rd2==undefined){
	        				ques.selectedAns="B";
	        			}
	        			if(vm.rd3==undefined){
	        				ques.selectedAns="C";
	        			}
	        			if(vm.rd4==undefined){
	        				ques.selectedAns="D";
	        			}
	        			ques.answered = true;
	    	        	ques.visited = false;
	    	        	ques.current = false;
	        		}
	        	});
	        	
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
