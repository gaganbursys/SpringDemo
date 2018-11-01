(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .factory('QuizListService', QuizListService);

    QuizListService.$inject = ['$filter', '$http'];

    function QuizListService ($filter, $http) {
       
    }
})();
