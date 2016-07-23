window.components = (function(){
  var krzlContainer = "krzl-cont";
  var krzlSlides = ".krzl-slide";
  this.krzlSlidesCount = 0;

  function loadComponents() {
    var parent = document.getElementById(krzlContainer);
    var slides = parent.querySelectorAll(krzlSlides);
    this.slides_ = Array.prototype.slice.call(slides);
    return this.slides_ = null ?  []:this.slides_;
  }

  function createKrzlComponent(component) {
    var krzlComponent = {};
    if(component) {
      krzlComponent.el = component;
      krzlComponent.id = krzlSlidesCount + 1;
    }
    krzlSlidesCount++;
    return krzlComponent;
  }

  function setUpComponents() {
    var slides = loadComponents();
    if(slides.length == 0) {
      console.log("[componentjs] No components found. Exiting...\n");
      return;
    }
    else {
      slides = slides.map(createKrzlComponent);
    }
    return slides;
  }

  function getSlidesCount() {
      return this.krzlSlidesCount;
  }

  return {
    loadComponents:loadComponents,
    setUpComponents:setUpComponents
  }
})();
