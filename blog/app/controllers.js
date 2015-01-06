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
    FirebaseService.addPost(newPost);
  }
}]);

blog.controller("EditController",["$scope","FirebaseService",function($scope,FirebaseService){}]);