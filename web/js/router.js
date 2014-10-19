"use strict";

COC.Router = Backbone.Router.extend({

    routes: {
        "": "home",
        "home": "home",
        "post": "post",
        "story": "story",
        "posts/:id_or_title": "posts"
    }
});
