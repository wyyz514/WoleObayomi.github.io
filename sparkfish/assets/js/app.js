var Sparkfish = angular.module("Sparkfish",["ngRoute"]);

Sparkfish.config(function($routeProvider,$locationProvider){
    $routeProvider.when("/login",{
        controller:"LoginController",
        templateUrl:"assets/templates/login.html"
    })
    .when("/home",{
        controller:"HomeController",
        templateUrl:"assets/templates/home.html"
    })
    .otherwise({redirectTo:"/login"});
    $locationProvider.html5Mode({enable:true});
});