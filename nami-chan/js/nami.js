window.Nami = (function(){
    var makeArray = function(list) {
        return Array.prototype.slice.call(list);
    };
    
    var active = document.querySelector(".nami-active") ? document.querySelector(".nami-active").getAttribute("data-name") : null;
    
    var Nami = {
        menu: {
            "selected": {
                text: "selected",
                el: document.querySelector(".nami-selected")
            },
            "menu-view": {
                text: "menu-view",
                el: document.querySelector(".nami-menu")
            }
        }
    };
    
    var navbarHeight = 64; // in px
    var namiMenuSelector = ".nami-menu";
    var namiMenuItemsSelector = namiMenuSelector + " " + ".nami-menu-items";
    var namiMenuItemSelector = ".nami-menu-item";
    var namiSubMenuSelector = ".nami-submenu";
    var namiSubMenuItemSelector = namiSubMenuSelector + " " + ".nami-sub-item";
    
    function addItem(key, item) {
        if(!Nami.menu[key]) {
            Nami.menu[key] = item;
        }
        return Nami.menu[key];
    }
    
    function getItem(key) {
        if(Nami.menu[key])
            return Nami.menu[key];  
        else
            return key + " could not be found";
    }

    
    function extractMenuItems(selector) {
        var namiEl = document.querySelector(selector);    
        var menuItems = makeArray(namiEl.querySelectorAll(namiMenuItemSelector));
        
        menuItems.forEach(function(menuItem) {
            createNamiMenuItem(menuItem);
        });
    }
    
    function extractSubMenuItemNames(el) {
        var menuChildren = makeArray(el.querySelector(namiSubMenuSelector).children);
        var subMenu = menuChildren.map(function(child){
            if(child.classList.contains("nami-sub-item")) {
                var text = child.getAttribute("data-name");
                return text;
            }
        });
        return subMenu;
    }
    
    function createNamiMenuItem(el) {
        var menuItem = {};
        menuItem.text = el.getAttribute("data-name");
        menuItem.scrollTarget = el.getAttribute("data-target") || null;
        menuItem.el = el;
       
        menuItem.next = el.classList.contains("has-submenu") ?
            extractSubMenuItemNames(el): null;
        
        var addedMenuItem = addItem(menuItem.text, menuItem);
        return addedMenuItem;
    }
    
    function toggleMenu(e) {
        preventEventLeak(e);
        var namiMenu = document.querySelector(".nami-menu");
        if(!namiMenu.classList.contains("menu-open")) {
            namiMenu.classList.add("menu-open");
        }
        else
            namiMenu.classList.remove("menu-open");
    }
    
    function preventEventLeak(e) {
        NamiEvents.preventEventLeak(e);
    } 
    
    function run() {
        extractMenuItems(namiMenuItemsSelector);
        NamiEvents.register("toggleMenu", "selected", "click", toggleMenu);
        attachMenuItemListeners();
        var display = document.querySelector(".nami-location");
        display.innerText = active;
    }
    
    function attachMenuItemListeners() {
        //update display in nami bar
        function updateNamiDisplay(e) {
            preventEventLeak(e);
            var display = document.querySelector(".nami-location");
            var currentText = display.innerText;

            if(currentText.toLowerCase() === this.text.toLowerCase()) {
                return;
            }
            
            display.classList.add("updating");
            var textUpdate = this.text;
            
            setTimeout(function(){
               display.classList.remove("updating"); 
               display.innerText = textUpdate;
            }, 500);
        }
        
        //closes NamiMenu
        function closeMenu(e) {
            preventEventLeak(e);
            var namiMenu = document.querySelector(".nami-menu");
            if(namiMenu.classList.contains("menu-open")) {
                namiMenu.classList.remove("menu-open");
            }
        }
        
        
        //toggles submenus by binding to respective menu item (see below)
        function toggleSubMenu(e) {
            preventEventLeak(e);
            var subMenu = this.el.querySelector(".nami-submenu");
            if(!subMenu.classList.contains("menu-open"))
                subMenu.classList.add("menu-open");
            else
                subMenu.classList.remove("menu-open");
        }
        
        function updateDisplayOnScroll(e) {
            preventEventLeak(e);
            var scrollTarget = document.querySelector(this.scrollTarget);
            
            if(scrollTarget) {
                var offset = scrollTarget.offsetTop;
                var height = scrollTarget.getBoundingClientRect().height;
                var pageScrolled = window.scrollY || window.pageYOffset;
                if(pageScrolled >= offset - navbarHeight && pageScrolled <= offset + height - navbarHeight) {
                    updateNamiDisplay.call(this, e);
                }
            }
        }
        
        function namiScroll(e) {
            preventEventLeak(e);
            var current = window.scrollY || window.pageYOffset;
            var scrollTarget = document.querySelector(this.scrollTarget);
            var destination = scrollTarget.offsetTop - navbarHeight;
            var scrollDirection = "STATIC";
            var rAF = requestAnimationFrame || webkitRequestAnimationFrame || mozRequestAnimationFrame || msRequestAnimationFrame || function (fn) {
                setInterval(fn, 1000/60);
            };
            var cAF = cancelAnimationFrame || webkitCancelAnimationFrame || mozCancelAnimationFrame || msCancelRequestAnimationFrame;
            var reqId;
            
            if(current < destination) 
                scrollDirection = "DOWN";
            else if(current > destination)
                scrollDirection =  "UP";
            else
                scrollDirection = "STATIC";
       
            function scroll() {
                //console.log("Current: ", current, "Destination:", destination, "reqId:", reqId);
                
                if((current >= destination && scrollDirection === "DOWN") || (current <= destination && scrollDirection === "UP")) {
                    cAF(reqId);   
                    return;
                }
                
                if(scrollDirection === "UP") {
                    current = current - 5;
                    window.scrollTo(0, current);
                }
                else if(scrollDirection === "DOWN") {
                    current = current + 5;
                    window.scrollTo(0, current);
                }
                else
                    return;
                reqId = rAF(scroll);
            }
            
            reqId = rAF(scroll);
        }
        
        var menuKeys = Object.keys(Nami.menu);
        
        //attach the updateDisplay, closeMenu and toggleSubmenu listeners to all menu items except selected which toggles the main menu
        menuKeys.forEach(function(menuKey){
            var menuItem = Nami.getItem(menuKey);
            if(menuItem.scrollTarget) {
                NamiEvents.register("updateDisplayOnScroll", menuItem.text, "scroll", updateDisplayOnScroll.bind(menuItem), "document");
                NamiEvents.register("namiScroll", menuItem.text, "click", namiScroll.bind(menuItem));
            }
            if(menuItem.text !== "selected") {
                NamiEvents.register("closeMenu", menuItem.text, "click", closeMenu);
                
                if(menuItem.next != null) {
                    NamiEvents.register("toggleSubMenu", menuItem.text, "click", toggleSubMenu.bind(menuItem), ".nami-menu-trigger");
                }
            }
        })
        
    }
    
    
    Nami.run = run;
    
    Nami.getItem = getItem;
    return Nami;
})();


window.NamiEvents = (function(){
    var events = {};
    
    //source: http://ejohn.org/projects/flexible-javascript-events/
    function addEvent( obj, type, fn ) {
      if ( obj.attachEvent ) {
        obj['e'+type+fn] = fn;
        obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
        obj.attachEvent( 'on'+type, obj[type+fn] );
      } else
        obj.addEventListener( type, fn, false );
    }
    function removeEvent( obj, type, fn ) {
      if ( obj.detachEvent ) {
        obj.detachEvent( 'on'+type, obj[type+fn] );
        obj[type+fn] = null;
      } else
        obj.removeEventListener( type, fn, false );
    }
    
    function register(event, trigger, domEvent, cb) {
        var wantedTrigger = arguments[4] || null;
        var eventExists = false;
        events[event] = events[event] ? events[event] : [];
        var eventOb = {
            trigger: trigger,
            event: event,
            cb: cb,
            wantedTrigger: wantedTrigger
        }
        
        //check if the trigger specified already exists for the passed event
        events[event].forEach(function(listener) {
            if(listener.trigger === eventOb.trigger && listener.event === eventOb.event) {
                NamiEvents.deregister(listener.event, listener.trigger); //remove the original event since it is going to be replaced
            }
        })
        
        events[event].push(eventOb);
        
        if(wantedTrigger && wantedTrigger !== "document") {
            var wantedTriggerEl = Nami.getItem(trigger).el.querySelector(wantedTrigger);
            addEvent(wantedTriggerEl, domEvent, eventOb.cb);
        }
        else if(wantedTrigger && wantedTrigger === "document") {
            addEvent(document, domEvent, eventOb.cb);
        }
        else {
            var specifiedTriggerEl = Nami.getItem(trigger).el;
            addEvent(specifiedTriggerEl, domEvent, eventOb.cb);
        }
    }
    
    function deregister(event, trigger, domEvent) {
        var listeners = events[event];
        if(!listeners)
            return "No listeners for this event: " + event;
            
        listeners.forEach(function(listener) {
            if(listener.trigger === trigger) {
                var menuItem = Nami.getItem(trigger);
                console.log("Removing ", event + " listener on", trigger);
                if(menuItem.wantedTrigger === "document")
                    removeEvent(document, domEvent, listener.cb);
                else if(menuItem.wantedTrigger) {
                    var el = menuItem.el.querySelector(menuItem.wantedTrigger);
                    removeEvent(el, domEvent, listener.cb);
                }
                listeners.splice(listeners.indexOf(listener), 1);
            }
        });
    }
    
    function fire(event, trigger) {
        var listeners = events[event];
        if(!listeners) {
            return "No listeners for this event: " + event;
        }
        
        //use hash instead of iterating? O(1) vs O(n) that important here?
        listeners.forEach(function(listener) {
            if(listener.trigger === trigger) {
                listener.cb({
                    stopPropagation: function noop() {} //since event is manually triggered (simply put, callback specified is invoked), we don't have access to the dom event obj so yes, this is a hack
                });
            }
        })
    }
    
    function preventEventLeak(e) {
        e.stopPropagation() || (e.cancelBubble = true);
    }
    return {
        register: register, 
        deregister: deregister,
        events: events,
        preventEventLeak: preventEventLeak,
        fire: fire
    }
})()

window.Nami.run();
