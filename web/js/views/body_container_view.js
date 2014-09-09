"use strict";

/* Contains the topest level navigation elements (eg. home, systeminfo, about, contact etc) */
var BodyContainer = Backbone.View.extend({

    log_tag: "body_container_view",

    initialize: function() {
        this.render();


        window.COC.router.on('route:home', function() {
            // Calling show on the <a> of a nav tells bootstrap TODO
            $('a[href="#home"]').tab('show');
        });

        window.COC.router.on('route:post', function() {
            if (window.COC.views.post_view === undefined) {
                window.COC.log.info(this.log_tag + " Loading post view ...");
                window.COC.views.post_view = new window.COC.views.PostBlog({el: $('#post')});
            }

            $('a[href="#post"]').tab('show');
        }.bind( this ));

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