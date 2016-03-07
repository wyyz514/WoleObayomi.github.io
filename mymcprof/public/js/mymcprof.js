(function(){
  var aboutLink = document.getElementById("about");
  var instrLink = document.getElementById("instr");

  function instrCallback(){
    var contentBody = document.getElementById("mmp-content-body");
    var scrollDist = contentBody.offsetTop;
    window.scrollTo(0,scrollDist);
  }

  function aboutCallback() {
    window.scrollTo(0,0);
  }

  aboutLink.addEventListener("click",aboutCallback);
  instrLink.addEventListener("click",instrCallback);
})();
