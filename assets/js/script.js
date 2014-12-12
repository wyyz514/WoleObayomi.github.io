$(document).ready(function(){
  var scrollManager = (function(){
    var states = 
    {
      prevScrollValue:0,
      scrollState:"STATIC",
      scrollHash:{}
    }
    
    function manageScrollState()
    {
      var scrollDiff = $(window).scrollTop() - states.prevScrollValue;
      if(scrollDiff > 0)
      {
        states.scrollState = "DOWN";
        states.scrollHash[states.scrollState]; 
      }
      else if(scrollDiff < 0)
      {
        states.scrollState = "UP";
        states.scrollHash[states.scrollState]; 
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
  
  var scrolled = false; //flag
  
  $(window).on("scroll",function(ev){
    scrollManager.manageScrollState();
    if(scrollManager.states.scrollState == "DOWN" && $(window).scrollTop() <= $("#content").offset().top && scrolled == false)
    {
      $("#splash-chev").trigger("click");
      scrolled = true;
    }
    
    if($(window).scrollTop() == 0)
    {
      scrolled = false;
    }
  });
  
  $('#splash-chev').click(function(){
    $("html,body").animate({scrollTop:$("#content").offset().top+"px"},500);
  });
  
  
});