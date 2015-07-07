var utils = (function(){
    
    function findNextSibling()
    {
        var nextSibling = "";
        if(typeof this === "object" && this["nextElementSibling"])
        {
            if(this.nextElementSibling.classList.contains("page"))
                nextSibling = this.nextElementSibling;
            else
                return;
        }
        else if(typeof this === "object" && this.el && this.el["nextElementSibling"])
        {
            if(this.el.nextElementSibling.classList.contains("page"))
                nextSibling = this.el.nextElementSibling;
            else
                return;
        }
        else
        {
            console.log("Could not find next sibling because:");
        }
        
        if(!nextSibling)
        {
            console.log("Next sibling is null");
        }
        else
        {
            //test

        }
        
        nextSibling = extend.apply(utils,[nextSibling,utils]);
        return nextSibling;
    }
    
    function findPrevSibling()
    {
        var prevSibling = "";
        if(typeof this === "object" && this["previousElementSibling"])
        {
             if(this.previousElementSibling.classList.contains("page"))
                prevSibling = this.previousElementSibling;
            else
                return;
        }
        else if(typeof this === "object" && this.el && this.el["previousElementSibling"])
        {
             if(this.el.previousElementSibling.classList.contains("page"))
                prevSibling = this.el.previousElementSibling;
            else
                return;
        }
        else
        {
            console.log("Could not find previous sibling because:");
        }
        
        if(!prevSibling)
        {
            console.log("Previous sibling is null");
        }
        else
        {
            //console.log(prevSibling);
        }
        prevSibling = extend.apply({},[prevSibling,utils]);
        return prevSibling;
    }
   
    function findCurrent()
    {
        var current = document.querySelector(".current");
        current = extend.apply({},[current,utils]);
        return current;
    }
    
    function findNext()
    {
        var next = document.querySelector(".next");
        current = extend.apply({},[current,utils]);
        return current;
    }
    
    function extend(obj1,obj2)
    {
        for(var prop in obj2)
        {
            if(obj2.hasOwnProperty(prop))
            {
                obj1[prop] = obj2[prop];
            }
        }
        return obj1;
    }
    
    return {
        findPrevSibling:findPrevSibling,
        findNextSibling:findNextSibling,
        findCurrent:findCurrent
    }
})();

window.utils = utils;