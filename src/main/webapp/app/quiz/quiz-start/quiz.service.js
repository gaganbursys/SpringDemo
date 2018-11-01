(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .factory('QuizService', QuizService);

    QuizService.$inject = ['$filter', '$http'];

    function QuizService ($filter, $http) {
    }
})();
