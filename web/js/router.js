"use strict";

var Router = Backbone.Router.extend({

    routes: {
        "home": "home",                // #home
        "post_blog": "post_blog",      // #post_blog
        "story": "story"               // #story
    }
});

// Load the router
(function() {
    //var log = window.COC.log;
    //log.debug("router.js Initializing router.")

    window.COC.router = new Router();
    Backbone.history.start();

    // Load up the mother of all views.
    var topLevelNavigation = new BodyContainer({el: $('#body_container_div')});
})();