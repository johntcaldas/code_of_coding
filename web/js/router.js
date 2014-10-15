"use strict";

var Router = Backbone.Router.extend({

    routes: {
        "home": "home",
        "post": "post",
        "story": "story"
    }
});

// Load the router
(function() {

    var router = new Router();
    COC.router = router;
    Backbone.history.start({ pushState: true });

    // Load up the mother of all views.
    COC.views.body_container_view = new BodyContainer({el: $('#body_container_div')});


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