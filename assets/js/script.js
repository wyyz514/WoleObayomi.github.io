$(document).ready(function(){
  var site = (function(){
    
    var scrollManager = {
      currentPage:0,
      numOfPages:2,
      direction:"down",
      offset:$('#two').offset().top,
      dirs:[],
      setDir:function(dir)
      {
        this.dirs.push(dir);
        this.direction = this.dirs.pop();
        this.scroll();
      },
      scroll:function()
      {
        var scrollDist = 0;
        //prevent over scrolling to pages that dont exist
        if(this.direction === "down" && this.currentPage >= this.numOfPages)
        {
          return;
        }
        else if(this.direction === "down" && this.currentPage < this.numOfPages)
        {
          this.currentPage += 1;
          scrollDist = this.currentPage * this.offset;
          $('body,html').animate({scrollTop:scrollDist},750);
        }
        else
        {
          //you must be going up
          if(this.currentPage < 1)
            return;
          else
          {
            this.currentPage -= 1;
            scrollDist = this.currentPage * this.offset;
            $('body,html').animate({scrollTop:scrollDist},750);
          }
        }
        
        console.log("You are on page ",this.currentPage);
      }
    }
    
    return {
      scrollManager:scrollManager
    };
  })();
  
  var then = new Date();
  $(document).on("mousewheel",function(ev){
    var now = new Date();
    var diff = now - then;
    
    if(diff > 1000)
    {
      if(ev.originalEvent.wheelDeltaY > 0)
      {
        site.scrollManager.setDir("up");
        then = now;
      }
      else
      {
        site.scrollManager.setDir("down");
        then = now;
      }
    }
  });
});