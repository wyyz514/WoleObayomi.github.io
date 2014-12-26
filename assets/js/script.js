$(document).ready(function(){
  $(".menu-btn").click(function(){
    $(".menu").addClass("active");
  });
  
  $(".close-btn").click(function(){
    $(".menu").removeClass("active");
  });
  
  $(document).on("mousewheel", function(){
    var menu = document.querySelector(".menu");
    if(menu.classList.contains("active"))
    {
      return false;
    }
    else
      $('body').animate({scrollTop:$(".sect#two").offset().top},1000);
  });
});