(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .factory('QuizManagementService', QuizManagementService);

    QuizManagementService.$inject = ['$filter', '$http'];

    function QuizManagementService ($filter, $http) {
       
    }
})();
