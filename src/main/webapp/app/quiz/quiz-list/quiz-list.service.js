(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .factory('QuizListService', QuizListService);

    QuizListService.$inject = ['$resource'];

    function QuizListService ($resource) {
    	
        var service = $resource('api/quiz/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET', isArray: false,
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
