$(document).ready(function(){
  $(".menu-btn").click(function(){
    $(".menu").addClass("active");
  });
  
  $(".close-btn").click(function(){
    $(".menu").removeClass("active");
  });
  
});