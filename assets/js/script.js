$(document).ready(function(){
  var site = (function(){
    
    var scrollManager = {
      currentPage:0,
      numOfPages:3,
      direction:"down",
      offset:$('.sect#p1').offset().top,
      dirs:[],
      setDir:function(dir)
      {
        //prevent duplicates
        if(this.dirs.indexOf(dir) >= 0)
          return;
        else
          this.dirs.push(dir);
        
        this.direction = this.dirs.pop();
        //dont invoke scroll if on the first or last page
        if(this.currentPage == 0 && this.direction === "up" || this.currentPage == this.numOfPages - 1 && this.direction === "down")
          return;
        else
          this.scroll();
      },
      scroll:function()
      {
        var scrollDist = 0;
        //prevent over scrolling to pages that dont exist
        if(this.direction === "down" && this.currentPage >= this.numOfPages - 1 || menuManager.menuState == "active")
        {
          return;
        }
        else if(this.direction === "down" && this.currentPage < this.numOfPages)
        {
          this.currentPage += 1;
          scrollDist = this.currentPage * this.offset;
          $('body,html').animate({scrollTop:scrollDist},750);
          menuManager.changeColor();
        }
        else
        {
          //you must be going up
          if(this.currentPage <= 0 && this.direction == "up") //cant scroll past first page 
          {
            return;
          }
          else
          {
            this.currentPage -= 1;
            scrollDist = this.currentPage * this.offset;
            $('body,html').animate({scrollTop:scrollDist},750);
            menuManager.changeColor();
          }
        }
      }
    }
    
    var menuManager = {
      menuState:0,
      pageZeroColor:$(".sect#p0").find(".poster-text-row").css("color"),
      pageOneColor:$(".sect#p1").find(".bio").css("color"),
      pageTwoColor:"#fff",
      changeColor:function()
      {
        var menuBtn = $(".menu-btn")
        switch(scrollManager.currentPage)
        {
          case 0:
            menuBtn.css("color",this.pageZeroColor);
          break;
          case 1:
            menuBtn.css("color",this.pageOneColor);
          break;
          case 2:
            menuBtn.css("color",this.pageTwoColor);
          break;
        }
        animationManager.triggerAnimation();
      },
      menuToggle:function()
      {
        var menu = document.querySelector(".menu");
        if(menu.classList.contains("active"))
        {
          menu.classList.remove("active");
          this.menuState = "inactive";
        }
        else
        {
          menu.classList.add("active");
          this.menuState = "active";
        }
      }
    };
    
    var animationManager = {
      triggerAnimation:function()
      {
        var currentPage = parseInt(scrollManager.currentPage);
        console.log("Current Page",currentPage);
        $(".sect").eq(currentPage).find(".inactive").removeClass("inactive").addClass("active");
      }
    };
    return {
      scrollManager:scrollManager,
      menuManager:menuManager,
      animationManager:animationManager
    };
  })();
  
  //scrolling
  var then = new Date();
  $(document).on("mousewheel DOMMouseScroll",function(ev){
    var now = new Date();
    //need diff to prevent erratic scrolling
    var diff = now - then;
    
    if(diff > 500) //half a second seems like a good time difference between scrolls
    {
      if(ev.originalEvent.wheelDeltaY > 0)
      {
        site.scrollManager.setDir("up");
      }
      else
      {
        site.scrollManager.setDir("down");
      }
      then = now;
    }
  });
  
  //menu toggling
  $(".menu-btn").click(function(){
    site.menuManager.menuToggle();
  });
  
  $(".close-btn").click(function(){
    site.menuManager.menuToggle();
  });
  
  
});