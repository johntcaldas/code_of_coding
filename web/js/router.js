"use strict";

var Router = Backbone.Router.extend({

    routes: {
        "home": "home",                // #home
        "post": "post",                // #post
        "story": "story",              // #story
        "login": "login"               // #log_in
    }
});

// Load the router
(function() {
    //var log = COC.log;
    //log.debug("router.js Initializing router.")

    var router = new Router();
    COC.router = router;
    Backbone.history.start({ pushState: true, root: "code_of_coding" });

    // Load up the mother of all views.
    var top_level_navigation = new BodyContainer({el: $('#body_container_div')});


    // On initial page load, look for the anchor tag in the path, and poke that route.
    // This method of finding and navigating to the initial route feels hacky, but it seems to work.
   // var url = window.location.href;

    //router.navigate("home", {trigger: true, replace: true});

    /*
    for (var route in router.routes) {
        if (router.routes.hasOwnProperty(route)) {
            if (url.indexOf(router.routes[route]) > -1) {
                //router.routes[route]
                router.navigate("post", {trigger: true, replace: true});
            }
        }
    }
    */

})();