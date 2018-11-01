(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .controller('QuizController', QuizController);

    QuizController.$inject = ['$filter','QuizService'];

    function QuizController (filter,QuizService) {
        var vm = this;

    }
})();
