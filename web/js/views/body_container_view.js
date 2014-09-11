"use strict";

/* Contains the topest level navigation elements (eg. home, systeminfo, about, contact etc) */
var BodyContainer = Backbone.View.extend({

    log_tag: "body_container_view",

    initialize: function() {
        this.render();


        COC.router.on('route:home', function() {
            // Calling show on the <a> of a nav tells bootstrap TODO
            $('a[href="#home"]').tab('show');
        });

        COC.router.on('route:post', function() {
            if (COC.views.post_view === undefined) {
                COC.log.info(this.log_tag + " Loading post view ...");
                COC.views.post_view = new COC.views.PostBlog({el: $('#post')});
            }

            $('a[href="#post"]').tab('show');
        }.bind( this ));

        COC.router.on('route:story', function() {
            if (COC.views.story_view === undefined) {
                COC.log.info(this.log_tag + " Loading story view ...");
                COC.views.story_view = new COC.views.Story({el: $('#story')});
            }

            $('a[href="#story"]').tab('show');
        }.bind( this ));
    },

    render: function() {
        var template = templates['handlebars/body_container.handlebars'];
        var html = template();
        this.$el.html(html);
    }
});