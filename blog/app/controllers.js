blog.controller("IndexController",["$scope","FirebaseService",function($scope,FirebaseService){
  FirebaseService.establishConnection();
}]);

blog.controller("NewPostController",["$scope","$location","FirebaseService",function($scope,$location,FirebaseService){
  $scope.post = {};
  $scope.post.title = "";
  $scope.post.body = "";
  
  var newPost = {};
  newPost.id = FirebaseService.generateID();
  
  $scope.savePost = function()
  {
    newPost.title = $scope.post.title;
    newPost.body = $scope.post.body;
    newPost.createdBy = "Wole";
    newPost.createdAt = new Date().toString();
    FirebaseService.addPost(newPost);
    $location.path("/");
  }
}]);

blog.controller("EditController",["$scope","$location","FirebaseService",function($scope,$location,FirebaseService){
  $scope.post = FirebaseService.getPost(FirebaseService.selectedPostKey);
  
  $scope.savePost = function()
  {
    FirebaseService.updatePost($scope.post);
    $location.path("/");
  }
}]);

blog.controller("PostsController",["$scope","FirebaseService",function($scope,FirebaseService){
  $scope.posts = FirebaseService.getPosts();
  
  $scope.getPostKey = function(key)
  {
    FirebaseService.selectedPostKey = key;
  }
  
  $scope.deletePost = function(post)
  {
    FirebaseService.deletePost(post);
  }
  
}]);

blog.controller("PostController",["$scope","$location","$routeParams","FirebaseService",function($scope,$location,$routeParams,FirebaseService){
  if(FirebaseService.getPost(FirebaseService.selectedPostKey))
  {
    $scope.post = FirebaseService.getPost(FirebaseService.selectedPostKey);
  }
  else
  {
    $scope.posts = FirebaseService.getPosts();
    $scope.posts.sort(function(a,b){
      return a.id - b.id;
    });
    var id = parseInt($routeParams.id);
    var targetPost = $scope.posts[id - 1];
    FirebaseService.selectedPostKey = targetPost.$id;
    $scope.post = FirebaseService.getPost(FirebaseService.selectedPostKey);
  }
}]);