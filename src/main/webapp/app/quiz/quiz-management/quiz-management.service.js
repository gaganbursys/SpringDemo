(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .factory('QuizManagementService', QuizManagementService);

    QuizManagementService.$inject = ['$resource'];

    function QuizManagementService ($resource) {
    	var service = $resource('api/quiz/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET', 
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'save': { method:'POST' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'}
            
        });
    	return service;
    }
})();
