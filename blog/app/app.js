var blog = angular.module("blog",["firebase","ngRoute"]);

blog.config(["$routeProvider",function($routeProvider){
  $routeProvider.when("/",{
    controller:"IndexController",
    templateUrl:"/blog/app/partials/index.html"
  })
  .when("/posts",{
    controller:"PostsController",
    templateUrl:"/blog/app/partials/posts.html"
  })
  .when("/posts/:id",{
    controller:"PostController",
    templateUrl:"/blog/app/partials/post.html"
  })
  .when("/posts/:id/edit",{
    controller:"EditController",
    templateUrl:"/blog/app/partials/edit.html"
  })
}]);