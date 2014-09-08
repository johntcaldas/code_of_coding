"use strict";

/* Contains the topest level navigation elements (eg. home, systeminfo, about, contact etc) */
var BodyContainer = Backbone.View.extend({

    home_view: undefined,

    initialize: function() {
        this.render();


        window.COC.router.on('route:home', function() {
            // Calling show on the <a> of a nav tells bootstrap TODO
            $('a[href="#home"]').tab('show');
        });

        window.COC.router.on('route:post_blog', function() {
            if (this.home_view === undefined) {
                this.home_view = new window.COC.views.PostBlog();
            }

            $('a[href="#post_blog"]').tab('show');
        });

        window.COC.router.on('route:story', function() {
            $('a[href="#story"]').tab('show');
        });
    },

    render: function() {
        var template = templates['handlebars/body_container.handlebars'];
        var html = template();
        this.$el.html(html);
    }
});