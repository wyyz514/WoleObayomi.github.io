blog.controller("IndexController",["$scope","FirebaseService",function($scope,FirebaseService){
  $scope.posts = [];
  FirebaseService.establishConnection();
  FirebaseService.getPosts().$loaded(function(posts){
    $scope.posts = Array.prototype.slice.call(posts);
    $scope.post = $scope.posts[$scope.posts.length - 1];
  },
  function(error){
    console.log(error);
  });
  
  $scope.scrollToPosts = function()
  {
    var offset = $("#otherposts").offset().top;
    $("html,body").animate({scrollTop:offset},500);
  }
  
  {
    $("#left-arrow").click(function(){
      if($(".card-holder.top").length == 0)
      {
        $(".card-holder").parent().children().last().prev().addClass("top");
        $(".card-holder").parent().children().last().addClass("leftHidden");
      }
      else if($(".card-holder.top").next().hasClass("rightHidden"))
      {
        var current = $(".card-holder.top");
        current.removeClass("top");
        current.next().removeClass("rightHidden").addClass("top");
      }
      else
      {
        var current = $(".card-holder.top");
        current.removeClass("top").addClass("leftHidden");
        current.prev().addClass("top");
      }
    });
    
    $("#right-arrow").click(function(){
      if($(".card-holder.top").length == 0)
      {
        $(".card-holder").parent().children().last().prev().addClass("top");
        $(".card-holder").parent().children().last().addClass("rightHidden");
      }
      else if($(".card-holder.top").next().hasClass("leftHidden"))
      {
        var current = $(".card-holder.top");
        current.removeClass("top");
        current.next().removeClass("leftHidden").addClass("top");
      }
      else
      {
        var current = $(".card-holder.top");
        current.removeClass("top").addClass("rightHidden");
        current.prev().addClass("top");
      }
    });
  }
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
  
  $scope.deletePost = function(post)
  {
    FirebaseService.deletePost(post);
  }
  
}]);

blog.controller("PostController",["$scope","$location","$routeParams","FirebaseService",function($scope,$location,$routeParams,FirebaseService){
    $scope.posts = FirebaseService.getPosts();
    $scope.posts.sort(function(a,b){
      return a.id - b.id;
    });
    var id = parseInt($routeParams.id);
    if(id > $scope.posts.length || id == 0)
    {
      $location.path("/");
    }
    else
    {
      var targetPost = $scope.posts[id - 1];
      FirebaseService.selectedPostKey = targetPost.$id;
      $scope.post = FirebaseService.getPost(FirebaseService.selectedPostKey);
    }
}]);