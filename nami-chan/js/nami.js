window.Nami = (function(){
    var makeArray = function(list) {
        return Array.prototype.slice.call(list);
    };

    var active = document.querySelector(".nami-active") ? document.querySelector(".nami-active").getAttribute("data-name") : null;

    var navbarHeight = 64; // in px
    var namiMenuSelector = ".nami-menu";
    var namiBarSelector = ".nami-bar";
    var namiDisplaySelector = ".nami-display";
    var namiMenuItemsSelector = namiMenuSelector + " " + ".nami-menu-items";
    var namiMenuItemSelector = ".nami-menu-item";
    var namiSubMenuSelector = ".nami-submenu";
    var namiSubMenuItemSelector = namiSubMenuSelector + " " + ".nami-sub-item";

    var Nami = {
        menu: {
            "selected": {
                text: "selected",
                el: document.querySelector(".nami-selected")
            },
            "menu-view": {
                text: "menu-view",
                el: document.querySelector(namiMenuSelector)
            }
        }
    };

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
        var namiMenu = document.querySelector(namiMenuSelector);
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
            var clearAnimationLoop = "";
            var rAF = requestAnimationFrame || webkitRequestAnimationFrame || mozRequestAnimationFrame || msRequestAnimationFrame || function (fn) {
                clearAnimationLoop = setInterval(fn, 1000/60);
            };
            var cAF = cancelAnimationFrame || webkitCancelAnimationFrame || mozCancelAnimationFrame || msCancelRequestAnimationFrame || clearAnimationLoop;
            var reqId;

            if(current < destination)
                scrollDirection = "DOWN";
            else if(current > destination)
                scrollDirection =  "UP";
            else
                scrollDirection = "STATIC";

            function scroll() {

                if((current >= destination && scrollDirection === "DOWN") || (current <= destination && scrollDirection === "UP")) {
                    cAF(reqId);
                    return;
                }

                if(scrollDirection === "UP") {
                    current = current - 5 <= destination ? destination : current - 5;
                    window.scrollTo(0, current);
                }
                else if(scrollDirection === "DOWN") {
                    current = current + 5 >= destination ? destination : current + 5;
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

    function updateConfig(opts) {
        var menuOpts = opts.menu || {};
        var barOpts = opts.bar || {};
        var displayOpts = opts.display || {};

        var menuEl = document.querySelector(namiMenuSelector);
        var barEl = document.querySelector(namiBarSelector);
        var displayEl = document.querySelector(namiDisplaySelector);

        function applyStyleConfig(el, opts) {
            Object.keys(opts).forEach(function(opt) {
                el.style[opt] = opts[opt];
            });
        }

        applyStyleConfig(menuEl, menuOpts);
        applyStyleConfig(barEl, barOpts);
        applyStyleConfig(displayEl, displayOpts);
    }

    function destroy() {
        NamiEvents.deregisterAll();
    }

    Nami.init = run;
    Nami.updateConfig = updateConfig;
    Nami.destroy = destroy;
    Nami.getItem = getItem; //make private later
    return Nami;
})();


var NamiEvents = (function(){
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

    //string to uniquely identify an event attached to a nami menu item
    function generateEventIdentifier() {
      return this.event + this.trigger + this.domEvent + this.wantedTrigger;
    }

    function register(event, trigger, domEvent, cb) {
        //specify a child element of the nami menu item to trigger an event
        var wantedTrigger = arguments[4] || "";
        //events['updateDisplay'] = {
        //'updateDisplay#elclick#arrow' : {//nami event obj}

        events[event] = events[event] ? events[event] : {};
        var eventOb = {
            trigger: trigger,
            event: event,
            cb: cb,
            wantedTrigger: wantedTrigger,
            domEvent: domEvent
        }

        //generate identifier for event to be registered
        var eventIdentifier = generateEventIdentifier.call(eventOb);

        //if the event is already registered throw an error
        if(events[event][eventIdentifier]) {
          return new Error("Event already exists ", JSON.stringify(eventOb, null, 2));
        }

        //if the event is not registered, add it to the event hash
        events[event][eventIdentifier] = eventOb;
        var NamiItem = Nami.getItem(trigger);
        //add the identifier to the Nami menu item obj
        NamiItem.eventIdentifiers = NamiItem.eventIdentifiers ? NamiItem.eventIdentifiers : [];
        NamiItem.eventIdentifiers.push(eventIdentifier);

        //attach listeners
        if(wantedTrigger && wantedTrigger !== "document") {
            var wantedTriggerEl = NamiItem.el.querySelector(wantedTrigger);
            addEvent(wantedTriggerEl, domEvent, eventOb.cb);
        }
        else if(wantedTrigger && wantedTrigger === "document") {
            addEvent(document, domEvent, eventOb.cb);
        }
        else {
            var specifiedTriggerEl = NamiItem.el;
            addEvent(specifiedTriggerEl, domEvent, eventOb.cb);
        }
    }

    function deregister(event, trigger) {
        //all listeners for the Nami event
        var listeners = events[event];
        if(!listeners || listeners == {}) {
          return new Error("No listeners for this event: " + event);
        }

        //unique identifiers for all menu items listening on this event
        var eventIdentifiers = Object.keys(listeners);

        //get the key for the event listener we want to deregister
        var eventIdentifierToRemove = eventIdentifiers.filter(function(id) {
          if(id.match(event) && id.match(trigger)) {
            return id;
          }
        })[0];

        var listener = listeners[eventIdentifierToRemove];

        if(!listener) {
            return new Error('Could not find event registered on the item');
        }

        if(listener.trigger.toLowerCase() === trigger.toLowerCase()) {
            var menuItem = Nami.getItem(trigger);
            //console.log("Removing ", event + " listener on", trigger);
            if(listener.wantedTrigger == "document") {
                //console.log("Removing document event")
                removeEvent(document, listener.domEvent, listener.cb);
            }
            else if(listener.wantedTrigger) {
                var el = menuItem.el.querySelector(listener.wantedTrigger);
                removeEvent(el, listener.domEvent, listener.cb);
            }
            else {
                var itemEl = menuItem.el;
                removeEvent(itemEl, listener.domEvent, listener.cb);
            }

            var identifierIndex = menuItem.eventIdentifiers.indexOf(eventIdentifierToRemove);
            menuItem.eventIdentifiers.splice(identifierIndex, 1);
            delete listeners[eventIdentifierToRemove];
        }
    }

    function deregisterAll() {
        //get all the event types
        var eventKeys = Object.keys(events);
        //map over the event types and deregister every attached
        //event
        eventKeys.map(function(key) {
          for(var uniqueIdentifier in events[key]) {
            var eventOb = events[key][uniqueIdentifier];
            deregister(eventOb.event, eventOb.trigger);
          }
        });
    }

    function fire(event, trigger) {
        var listeners = events[event];
        if(!listeners || listeners == {}) {
            return new Error("No listeners for this event: " + event);
        }

        var namiItem = Nami.getItem(trigger);

        var uniqueIdentifier = generateEventIdentifier.call(namiItem);

        listeners[uniqueIdentifier].cb({stopPropagation: function noop(){}
       /*since event is manually triggered (simply put, callback specified is invoked), we don't have access to the dom event obj so yes, this is a hack*/
        });

    }

    function preventEventLeak(e) {
        e.stopPropagation() || (e.cancelBubble = true);
    }
    return {
        register: register,
        deregister: deregister,
        events: events,
        preventEventLeak: preventEventLeak,
        fire: fire,
        deregisterAll: deregisterAll
    }
})()

window.Nami.init();
