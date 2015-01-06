blog.service("FirebaseService",["$firebase",function($firebase){
  var link = "https://shining-torch-6695.firebaseio.com/blog/posts";
  var firebase = {
    posts:[],
    establishConnection:function()
    {
      var ref = new Firebase(link);
      var sync = $firebase(ref);
      var syncArray = sync.$asArray();
      this.posts = syncArray;
    },
    getPosts:function()
    {
      return this.posts;
    },
    getPost:function(key)
    {
      return this.posts.$getRecord(key);
    },
    addPost:function(post)
    {
      this.posts.$add(post);
    },
    deletePost:function(id)
    {
      this.posts.$remove(id);
    }
  };
  return firebase;
}]);