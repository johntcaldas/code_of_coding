"use strict";

var Router = Backbone.Router.extend({

    routes: {
        "home": "home",
        "post": "post",
        "story": "story",
        "posts/:id_or_title": "posts"
    }
});

// Load the router
(function() {

    var router = new Router();
    COC.router = router;
    Backbone.history.start({ pushState: true });

    // Load up the mother of all views.
    COC.views.body_container_view = new BodyContainer({el: $('#body_container_div')});

    // Intercept clicks on any anchor tags. If they aren't outgoing to other sites, preventDefault and navigate
    // without a page load.
    // Code modeled after: http://stackoverflow.com/questions/12081894/backbone-router-navigate-and-anchor-href
    $(document).on("click", "a:not([data-bypass])", function(evt) {
        var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
        var root = COC.url_root;
        if (href.prop && href.prop.slice(0, root.length) === root) {
            evt.preventDefault();
            Backbone.history.navigate(href.attr, { trigger: true });
        }
    });
})();