
// var app = angular.module('phonecatApp', ['ngRoute']);

// app.config(['$locationProvider' ,'$routeProvider',
//   function($locationProvider, $routeProvider) {
//     $locationProvider.hashPrefix('!');
//     $routeProvider.
//     when('/', {
//       templateUrl: 'views/form.html', 
//       controller: 'formController' 
//     }).
//     when('/create', {
//       templateUrl: 'views/createFrom.html', 
//       controller: 'createFormController' 
//     });
//   }]
// );

var app = angular.module('phonecatApp', ['ngRoute']);

app.config(['$locationProvider' ,'$routeProvider',
  function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
    when('/view', {
      templateUrl: 'views/form.html', 
      controller: 'formController' 
    }).
    when('/create', {
      templateUrl: 'views/createFrom.html', 
      controller: 'createFormController' 
    }).
    when('/', {
      templateUrl: 'views/createFrom.html', 
      controller: 'createFormController' 
    });
  }]
);
