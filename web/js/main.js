// Right now there are 2 js files that load themselves: globals.js, and main.js (this file).
"use strict";

$(document).ready(function() {

    // Initialize collection of posts.
    COC.data.posts = new COC.models.PostCollection();
    COC.fetching_posts = true;
    COC.data.posts.fetch();
    COC.data.posts.on("reset", function() {
       COC.fetching_posts = false;
    });

    // Initialize the router.
    COC.router = new COC.Router();

    // Load up the mother of all views.
    COC.views.body_container_view = new COC.views.BodyContainer({el: $("#body_container_div")});

    // Check to see if we have a session token stored in a cookie. If so, auto-login.
    var session_token = $.cookie("session_token");
    if (session_token !== undefined) {
        COC.session_token = session_token;
        $("#post_blog_nav_li").removeClass("hidden");
    }

    Backbone.history.start({ pushState: true });

    // Intercept clicks on any anchor tags. If they aren't outgoing to other sites, preventDefault and navigate
    // without a page load. Code modeled after:
    // http://stackoverflow.com/questions/12081894/backbone-router-navigate-and-anchor-href
    $(document).on("click", "a:not([data-bypass])", function(evt) {
        var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
        var root = COC.url_root;
        if (href.prop && href.prop.slice(0, root.length) === root) {
            evt.preventDefault();
            Backbone.history.navigate(href.attr, { trigger: true });
        }
    });
});
