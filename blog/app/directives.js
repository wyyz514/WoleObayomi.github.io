blog.directive("cards",function(){
  return {
    restrict:"A",
    template:"<div class='card'><div class='card-inner'><span>{{post.title}}</span><br><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div><div class='line'></div></div></div>",
    link:function(scope,el,attrs)
    {
      var card = el[0].children[0];
      var randMult = Math.random();
      var degrRot = randMult * 20;
      card.style.webkitTransform = "rotate("+degrRot+"deg)";
      card.style.mozTransform = "rotate("+degrRot+"deg)";
      card.style.msTransform = "rotate("+degrRot+"deg)";
      card.style.transform = "rotate("+degrRot+"deg)";
    }
  };
});