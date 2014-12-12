$(document).ready(function(){
  var scrollManager = (function(){
    var states = 
    {
      prevScrollValue:0,
      scrollState:"STATIC",
      isScrolled:false
    }
    
    function manageScrollState()
    {
      var scrollDiff = $(window).scrollTop() - states.prevScrollValue;
      if(scrollDiff > 0)
      {
        states.scrollState = "DOWN";
      }
      else if(scrollDiff < 0)
      {
        states.scrollState = "UP";
      }
      else
      {
        states.scrollState = "STATIC";
      }
      states.prevScrollValue = $(window).scrollTop();
     // console.log(states.scrollState);
    }
    
    function toggleScrolled()
    {
      if(!states.isScrolled)
      {
        states.isScrolled = true;
      }
      else
      {
        states.isScrolled = false;
      }
    }
    
    function getScrolledBool()
    {
      return states.isScrolled;
    }
    
    function getScrollState()
    {
      return states.scrollState;
    }
    
    return {
      manageScrollState:manageScrollState,
      getScrollState:getScrollState,
      getScrolledBool:getScrolledBool,
      toggleScrolled:toggleScrolled
    };
  })();
  
  $(window).on("scroll",function(ev){
    ev.preventDefault();
    scrollManager.manageScrollState();
    if(scrollManager.getScrollState() == "DOWN" && $(window).scrollTop() <= $("#content").offset().top && scrollManager.getScrolledBool() == false)
    {
      $("#splash-chev").trigger("click");
      scrollManager.toggleScrolled(); //true
    }
    
    if($(window).scrollTop() == 0)
    {
      scrollManager.toggleScrolled(); //false
    }
  });
  
  $('#splash-chev').click(function(){
    $("html,body").animate({scrollTop:$("#content").offset().top+"px"},500);
  });
  
  
});