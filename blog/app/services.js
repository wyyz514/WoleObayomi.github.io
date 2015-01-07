blog.service("FirebaseService",["$firebase",function($firebase){
  var link = "https://shining-torch-6695.firebaseio.com/blog/posts";
  var posts = [];
  var firebase = {
    selectedPostKey:"",
    establishConnection:function()
    {
      var ref = new Firebase(link);
      var sync = $firebase(ref);
      var syncArray = sync.$asArray();
      posts = syncArray;
    },
    getPosts:function()
    {
      return posts;
    },
    getPost:function(key)
    {
      return posts.$getRecord(key);
    },
    addPost:function(post)
    {
      posts.$add(post);
    },
    deletePost:function(post)
    {
      posts.$remove(post);
    },
    updatePost:function(post)
    {
      posts.$save(post);
    },
    generateID:function()
    {
      return posts.length + 1;
    }
  };
  return firebase;
}]);