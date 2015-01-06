blog.service("FirebaseService",["$firebase",function($firebase){
  var link = "https://shining-torch-6695.firebaseio.com/blog/posts";
  var firebase = {
    posts:[],
    selectedPostKey:"",
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
    deletePost:function(post)
    {
      this.posts.$remove(post);
    },
    updatePost:function(post)
    {
      this.posts.$save(post);
    },
    generateID:function()
    {
      return this.posts.length + 1;
    }
  };
  return firebase;
}]);