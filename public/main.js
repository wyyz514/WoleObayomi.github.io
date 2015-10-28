(function($){
  //some useful variables
  var canvasParent = document.querySelector("#site-canvas");
  var canvas = canvasParent.firstElementChild;
  var ctx = canvas.getContext("2d");
  var height = canvasParent.style.height = document.documentElement.clientHeight;
  var width = canvasParent.style.width = document.documentElement.clientWidth;
  var fizz = [];
  canvas.setAttribute("height",height);
  canvas.setAttribute("width",width);

  var then = Date.now();
  
  function createArcs()
  {
    for(var count = 0; count < 120; count++)
    {
      var xPos = Math.floor( Math.random() * width ) - 15;
      var opacity = Math.random() + 0.5;
      var radius = Math.floor( ( Math.random() * 3 ) + 1 )
      var _fizz = new $(xPos,height - radius/2,radius,"rgba(29, 88, 35,"+opacity+")");
      fizz.push(_fizz);
    }
  }
  
  function update(dt)
  {
    for(var i = 0; i < fizz.length; i++)
    {
      fizz[i].updateY(dt);
    }
  }
  
  function render()
  {
    ctx.clearRect(0,0,width,height);
    //ctx.fillStyle = "#40BF6C";
    //ctx.fillRect(0,0,width,height);
    for(var i = 0; i < fizz.length; i++)
    {
      ctx.beginPath();
      ctx.arc(fizz[i].x, fizz[i].y, fizz[i].r,0 ,2 * Math.PI);
      ctx.fillStyle = fizz[i].color;
      ctx.fill();
    }
  }
  
  function run()
  {
    var now = Date.now();
    var diff = now - then;
    update(diff);
    render();
    then = now;
    requestAnimationFrame(run);
  }
  
  createArcs();
  run();
})(Fizz);
