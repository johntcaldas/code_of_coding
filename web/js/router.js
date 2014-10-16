"use strict";

var Router = Backbone.Router.extend({

    routes: {
        "home": "home",
        "post": "post",
        "story": "story",
        "posts/:id": "posts"
    }
});

// Load the router
(function() {

    var router = new Router();
    COC.router = router;
    Backbone.history.start({ pushState: true });

    // Load up the mother of all views.
    COC.views.body_container_view = new BodyContainer({el: $('#body_container_div')});

})();