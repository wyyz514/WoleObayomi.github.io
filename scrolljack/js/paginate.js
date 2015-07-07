var paginate = (function(){
    
    var numberOfPages = document.querySelectorAll(".page").length;
    
    function getNumberOfPages()
    {
        return numberOfPages;
    }
    
    function init()
    {
        var pages = document.querySelectorAll(".page");
        var _pages = Array.prototype.slice.call(pages);
        for(var index = _pages.length - 1; index >= 0; index--)
        {
            (function(i){
                _pages[_pages.length - index - 1].style.zIndex = i + 1;
            })(index);
        }
    }
    
    function getActive()
    {
        return document.querySelector(".active");
    }
    
    function updatePageNav()
    {
        getActive().classList.remove("active");
        var current = utils.findCurrent();
        var pgNum = current.getAttribute("data-sj-page");
        var active = document.querySelector("[data-sj-target='"+pgNum+"']");
        active.classList.add("active");
    }
    
    function replaceWithDots()
    {
        var pageNav = document.querySelectorAll("#page-nav span");
        var _pageNav = Array.prototype.slice.call(pageNav);
        for(var index = 0; index < _pageNav.length; index++)
        {
            (function(i){
                _pageNav[i].innerHTML = "&#8226";
            })(index);
        }
    }
    
    function replaceWithNumbers()
    {
        var pageNav = document.querySelectorAll("#page-nav span");
        var _pageNav = Array.prototype.slice.call(pageNav);
        for(var index = 0; index < _pageNav.length; index++)
        {
            (function(i){
                _pageNav[i].innerHTML = index + 1;
            })(index);
        }
    }
    
    init();
    window.paginate = paginate;
    
    return {
        getNumberOfPages:getNumberOfPages,
        updatePageNav:updatePageNav,
        replaceWithDots:replaceWithDots,
        replaceWithNumbers:replaceWithNumbers
    }
})();