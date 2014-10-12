"use strict";

/* Contains the topest level navigation elements (eg. home, story, login, about, contact etc) */
var BodyContainer = Backbone.View.extend({

    log_tag: "body_container_view",

    // Backbone's dictionary of events.
    events: {
        "click .navbar a[data-toggle]": "tab_click"
    },

    initialize: function() {
        this.render();

        // TODO
        // 1) Most of this stuff could reasonably (or should?) live in the router directly.
        // 2) We're doing a weird thing here by storing definitions and instances of views on the same object.
        COC.router.on('route:login', function () {
            if (COC.views.login_view === undefined) {
                COC.log.info(this.log_tag + "Loading login view ...");
                COC.views.login_view = new COC.views.Login({el: this.$el.find('#login')});
            }

            COC.views.login_view.show_modal();
        }.bind(this));

        COC.router.on('route:home', function () {
            // Calling show on the <a> of a nav tells bootstrap TODO
            $('a[data-target="#home"]').tab('show');
        });

        COC.router.on('route:post', function () {
            if (COC.views.post_view === undefined) {
                COC.log.info(this.log_tag + " Loading post view ...");
                COC.views.post_view = new COC.views.PostBlog({el: this.$el.find('#post')});
            }

            $('a[data-target="#post"]').tab('show');
        }.bind(this));

        COC.router.on('route:story', function () {
            if (COC.views.story_view === undefined) {
                COC.log.info(this.log_tag + " Loading story view ...");
                COC.views.story_view = new COC.views.Story({el: this.$el.find('#story')});
            }

            $('a[data-target="#story"]').tab('show');
        }.bind(this));


    },

    render: function() {
        var template = templates['handlebars/body_container.handlebars'];
        var html = template();
        this.$el.html(html);
    },

    tab_click: function(event) {
        event.preventDefault();
        var anchor_tag = $(event.target);
        var data_target = anchor_tag.attr("data-target");
        Backbone.history.navigate(data_target, {trigger: true});
        return false;
    }
});