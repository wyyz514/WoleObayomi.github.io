function getPlatform()
{
    var userAgent = navigator.userAgent;
    var platform = userAgent.search("Chrome") > 0 ? "Not Firefox" : "Firefox";
    if(platform !== "Firefox")
    {
        if(userAgent.search("MSIE") > 0)
        {
            platform = "IE";
        }
    }
    return platform;
}

function setDir()
{
    if(window.dir === "UP")
    {
        //scroll current page up and set next sibling to current
        var current = utils.findCurrent();
        var newCurrent = current.findNextSibling();
        if(newCurrent)
        {
            current.classList.add("scrolled");
            current.classList.remove("unscrolled");
            current.classList.remove("current");
            newCurrent.classList.add("current");
        }
    }
    else if(window.dir === "DOWN")
    {
        var current = utils.findCurrent();
        var newCurrent = current.findPrevSibling();
        if(newCurrent)
        {
            current.classList.remove("current");
            newCurrent.classList.add("current");
            newCurrent.classList.add("unscrolled");
            newCurrent.classList.remove("scrolled");
        }
    }
    paginate.updatePageNav();
}

window.currentScroll = 0;
window.platform = getPlatform();
var timeSinceLastScroll = 0;
var scrollDiff = 0;

document.addEventListener("mousewheel",function(e){
    var now = Date.now();
    var diff = now  - timeSinceLastScroll;
    if(diff/1000 > 1)
    {
        if(e.wheelDeltaY > 0)
            window.dir = "DOWN";
        else
            window.dir = "UP";
        setDir();
        timeSinceLastScroll = now;
    }
});



document.addEventListener("DOMMouseScroll",function(e){
    var now = Date.now();
    var diff = now  - timeSinceLastScroll;
    if(diff/1000 > 1)
    {
        if(e.detail < 0)
            window.dir = "DOWN";
        else
            window.dir = "UP";
        setDir();
        timeSinceLastScroll = now;
    }
});