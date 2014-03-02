"use strict";

var Router = Backbone.Router.extend({

    routes: {
        "home": "home",                // #home
        "system_info": "system_info",  // #system_info
        "story": "story"               // #story
    }
});

// Load the router
(function() {
    window.COC.router = new Router();
    Backbone.history.start();

    // Load up the mother of all views.
    var topLevelNavigation = new BodyContainer({el: $('#body_container_div')});
})();