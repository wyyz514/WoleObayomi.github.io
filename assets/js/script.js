$(document).ready(function(){
  var image = new Image();
  image.src = "assets/img/bd3.jpg";
  //after image is loaded, display page
  image.onload = function()
  {
    $('body').animate({opacity:'toggle'},750);
  }
  
  var siteObj = (function(){
    //node to append star-wrap
    var then = new Date();
    var target = document.querySelector("#shooting-star");
    var ss = {
      template:"<div id='star-wrap'><div id='trail'></div><div id='star'></div></div>",
      x:0,
      y:0
    };
    //create shooting star
    function createSS()
    {
      console.info("Creating star");
      target.innerHTML = ss.template;
      var starWrap = document.querySelector('#star-wrap');
      //initialize position
      starWrap.style.top = ss.y+"px";
      starWrap.style.left = ss.x+"px";
    }
   
    function updatePos()
    {
//      console.log("Updating position: ["+ss.x+":"+ss.y+"]");
      if(window.innerHeight - 200 < ss.y && (window.innerWidth/2) - 300 < ss.x)
      {
        var starWrap = document.querySelector("#star-wrap");
        $(starWrap).remove();
        ss.x = 0;
        ss.y = 0;
        createSS();
      }
      var now = new Date();
      var diff = now - then;
      ss.x = ss.x + (20 * diff/100);
      ss.y = ss.y + (10 * diff/100);
      render();
      then = now;
    }
    
    function render()
    {
//      console.log("Rendering");
      var starWrap = document.querySelector("#star-wrap");
      starWrap.style.top = ss.y+"px";
      starWrap.style.left = ss.x+"px";
      requestAnimationFrame(siteObj.init);
    }
    
    function init()
    {
      updatePos();
    }
    
    
    return {
      createSS:createSS,
      init:init
    };
  })();
  
    siteObj.createSS();
    requestAnimationFrame(siteObj.init);
});