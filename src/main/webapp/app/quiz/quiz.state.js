(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('quiz', {
            parent: 'admin',
            url: '/quiz',
            data: {
                authorities: ['ROLE_ADMIN'],
                //pageTitle: 'configuration.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/quiz/quiz-start/quiz.html',
                    controller: 'QuizController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                   // $translatePartialLoader.addPart('configuration');
                    return $translate.refresh();
                }]
            }
        })
        .state('quiz-management', {
            parent: 'admin',
            url: '/quiz-management',
            data: {
                authorities: ['ROLE_ADMIN'],
              //  pageTitle: 'configuration.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/quiz/quiz-management/quiz-management.html',
                    controller: 'QuizManagementController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                   // $translatePartialLoader.addPart('configuration');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
