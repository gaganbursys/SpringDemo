(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .factory('QuizPageService', QuizPageService);

    QuizPageService.$inject = ['$resource'];

    function QuizPageService ($resource) {
    	
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
