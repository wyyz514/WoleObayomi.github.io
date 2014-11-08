$(document).ready(function(){
  var image = new Image();
  image.src = "assets/img/bd3.jpg";
  image.onload = function()
  {
    $('body').animate({opacity:'toggle'},750);
  }
});