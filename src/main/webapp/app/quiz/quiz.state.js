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
            url: '/quiz-management/:id',
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
        })
        .state('quiz-list', {
            parent: 'admin',
            url: '/quiz-list',
            data: {
                authorities: ['ROLE_ADMIN'],
              //  pageTitle: 'configuration.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/quiz/quiz-list/quiz-list.html',
                    controller: 'QuizListController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                }
            },
            resolve: {
            	 pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                     return {
                         page: PaginationUtil.parsePage($stateParams.page),
                         sort: $stateParams.sort,
                         predicate: PaginationUtil.parsePredicate($stateParams.sort),
                         ascending: PaginationUtil.parseAscending($stateParams.sort)
                     };
                 }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                   // $translatePartialLoader.addPart('configuration');
                    return $translate.refresh();
                }]
            }
        });
    }
})();
