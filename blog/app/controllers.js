blog.controller("IndexController",["$scope","FirebaseService",function($scope,FirebaseService){
  FirebaseService.establishConnection();
}]);

blog.controller("NewPostController",["$scope","FirebaseService",function($scope,FirebaseService){
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
  }
}]);

blog.controller("EditController",["$scope","FirebaseService",function($scope,FirebaseService){
  $scope.post = FirebaseService.getPost(FirebaseService.selectedPostKey);
  
  $scope.savePost = function()
  {
    FirebaseService.updatePost($scope.post);
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

blog.controller("PostController",["$scope","FirebaseService","$location",function($scope,FirebaseService,$routeParams){
  $scope.post = FirebaseService.getPost(FirebaseService.selectedPostKey);
}]);