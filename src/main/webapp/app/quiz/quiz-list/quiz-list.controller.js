(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .controller('QuizListController', QuizListController);

    QuizListController.$inject = ['$filter','QuizListService','$state','ParseLinks','pagingParams','AlertService','paginationConstants','$uibModal'];

    function QuizListController (filter,QuizListService,$state,ParseLinks,pagingParams,AlertService,paginationConstants,$uibModal) {
        var vm = this;
        
        vm.loadAll = loadAll;
        vm.quizList = [];
        vm.finalList = [];
        vm.page = 1;
        vm.totalItems = null;
        vm.links = null;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.transition = transition;
        vm.deleteDialog = deleteDialog;
        vm.updateQuizList = updateQuizList;
        
        vm.quesCategoryArr =[{ "id":"0","category":"All"}, { "id":"1","category":"Math"},{ "id":"2","category":"JAVA" }, { "id":"3","category":"GK"}];
        vm.quesCategory = vm.quesCategoryArr[0];

        vm.loadAll();
        
        
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
        
            
            angular.forEach(data,function(list){
    			if(list.category.toLowerCase()=="1"){
    				list.categoryName ="Math";
    			}else if(list.category.toLowerCase()=="2"){
    				list.categoryName ="Java";
    			}else if(list.category.toLowerCase()=="3"){
    				list.categoryName ="GK";
    			}
    		});
            vm.quizList = data;
            vm.finalList = data;
            
            
            console.log(vm.quizList);
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
        
        function deleteDialog(ques){
        	$uibModal
			.open({
				templateUrl : 'app/quiz/quiz-management/quiz-management-delete-dialog.html',
				controller : 'QuizManagementDeleteController',
				backdrop: 'static',
				controllerAs : 'vm',
				size : 'md',
				resolve: {
					entity: function() {
                        return ques;
                    }
                	
                }
			}).result.then(function() {
				
	        });
        }
        
        function updateQuizList(id){
        	
        	if(id=="0"){
        		vm.quizList = [];
        		vm.quizList = vm.finalList;
        	}else if(id=="1"){
        		vm.quizList = [];
        		angular.forEach(vm.finalList,function(list){
        			if(list.category.toLowerCase()=="1"){
        				list.categoryName ="Math";
        				vm.quizList.push(list);
        			}
        		});
        	}else if(id=="2"){
        		vm.quizList = [];
        		angular.forEach(vm.finalList,function(list){
        			if(list.category.toLowerCase()=="2"){
        				list.categoryName ="Java";
        				vm.quizList.push(list);
        			}
        		});
        	}else if(id=="3"){
        		vm.quizList = [];
        		angular.forEach(vm.finalList,function(list){
        			if(list.category.toLowerCase()=="3"){
        				list.categoryName ="GK";
        				vm.quizList.push(list);
        			}
        		});
        	}
        }
    }
})();
