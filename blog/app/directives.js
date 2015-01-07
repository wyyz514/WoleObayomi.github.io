blog.directive("cards",function(){
  return {
    restrict:"A",
    template:"<div class='card'><div class='card-inner'><span>{{post.title}}</span></div></div>",
    link:function(scope,el,attrs)
    {
      var card = el[0].children[0];
      var randMult = Math.random();
      var degrRot = randMult * 20;
      card.style.webkitTransform = "rotate("+degrRot+"deg)";
    }
  };
});