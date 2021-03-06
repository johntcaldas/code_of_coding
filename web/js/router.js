"use strict";

COC.Router = Backbone.Router.extend({

    routes: {
        "": "welcome",                      // Go to welcome page..
        "welcome": "welcome",               // Same.
        "post": "post",                     // Post a new blog entry.
        "posts": "posts",                   // View the posts in list form.
        "story": "story",                   // Enter story mode summary post viewing.
        "posts/:id_or_title": "posts"       // Look up a specific post.
    }
});
