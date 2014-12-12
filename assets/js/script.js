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
    
    return {
      manageScrollState:manageScrollState,
      states:states //TODO:create getter
    };
  })();
  
  $(window).on("scroll",function(ev){
    ev.preventDefault();
    scrollManager.manageScrollState();
    if(scrollManager.states.scrollState == "DOWN" && $(window).scrollTop() <= $("#content").offset().top && !scrollManager.states.isScrolled)
    {
      $("#splash-chev").trigger("click");
      scrollManager.states.isScrolled = true;
    }
    
    if($(window).scrollTop() == 0)
    {
      scrollManager.states.isScrolled = false;
    }
  });
  
  $('#splash-chev').click(function(){
    $("html,body").animate({scrollTop:$("#content").offset().top+"px"},500);
  });
  
  
});