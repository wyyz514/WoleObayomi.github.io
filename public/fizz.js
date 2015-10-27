/* Fizz just animates a bunch of circles on a canvas. Supposed to mimic bubbles floating....yeah */

function Fizz(x,y,r,color)
{
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;
  this.acc = Math.random() * 0.1 < 0.05 ? (Math.random() * 0.1) + 0.02 : Math.random() * 0.1 ;
}

Fizz.prototype.updateY = function (dt)
{
  //reset y position if off the screen
  if(this.y < this.r)
    this.y = window.screen.availHeight - 100;
  else
    this.y -= this.acc * dt;
}