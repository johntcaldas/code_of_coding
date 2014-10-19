"use strict";

/* Contains the topest level navigation elements (eg. home, story, login, about, contact etc) */
var BodyContainer = Backbone.View.extend({

    log_tag: "body_container_view",

    // Backbone's dictionary of events.
    events: {
        "click .navbar a[data-toggle]": "tab_click"
    },

    initialize: function () {
        this.render();

        // TODO
        // 1) Most of this stuff could reasonably (or should?) live in the router directly.
        // 2) We're doing a weird thing here by storing definitions and instances of views on the same object.

        // Wire login modal to keypress: Ctrl+Alt+L Modeled after:
        // http://stackoverflow.com/questions/5203407/javascript-multiple-keys-pressed-at-once
        var map = {};
        var handle_key_presses_for_login = function (event) {
            map[event.keyCode] = event.type == 'keydown';
            if (map[17] && map[18] && map[76]) { // ctrl + alt + l
                if (COC.views.login_view === undefined) {
                    COC.log.info(this.log_tag + "Loading login view ...");
                    COC.views.login_view = new COC.views.Login({el: this.$el.find('#login')});
                }

                COC.views.login_view.show_modal();
            }
        }.bind(this);
        $(document.body).keydown(handle_key_presses_for_login);
        $(document.body).keyup(handle_key_presses_for_login);


        COC.router.on('route:home', function () {
            // Calling show on the <a> of a nav tells bootstrap TODO
            this.$el.find('#view_post_attach_point').addClass('hidden');
            $('a[data-target="#home"]').tab('show');
        }.bind(this));

        COC.router.on('route:post', function () {
            if (COC.views.post_view === undefined) {
                COC.log.info(this.log_tag + " Loading post view ...");
                COC.views.post_view = new COC.views.PostBlog({el: this.$el.find('#post')});
            }

            this.$el.find('#view_post_attach_point').addClass('hidden');
            $('a[data-target="#post"]').tab('show');
        }.bind(this));

        COC.router.on('route:story', function () {
            if (COC.views.story_view === undefined) {
                COC.log.info(this.log_tag + " Loading story view ...");
                COC.views.story_view = new COC.views.Story({el: this.$el.find('#story')});
            }

            this.$el.find('#view_post_attach_point').addClass('hidden');
            $('a[data-target="#story"]').tab('show');
        }.bind(this));

        COC.router.on('route:posts', function (id_or_title) {

            if (COC.views.view_post === undefined) {
                COC.log.info(this.log_tag + " Loading post view ...");
                COC.views.view_post = new COC.views.PostList({
                    el: this.$el.find('#view_post_attach_point'),
                    id_or_title: id_or_title
                });
            }
            else {
                COC.views.view_post.set_id_or_title(id_or_title);
            }

            // Deselect all tabs.
            var nav_bar_items = this.$el.find('li');
            nav_bar_items.removeClass('active');
            var tab_pane_divs = this.$el.find('.tab-pane');
            tab_pane_divs.removeClass('active');

            // Show the post list.
            this.$el.find('#view_post_attach_point').removeClass('hidden');
        }.bind(this));
    },

    render: function () {
        var template = templates['handlebars/body_container.handlebars'];
        var html = template();
        this.$el.html(html);
    },

    // We're somewhat overriding the default bootstrap tab behavior in order to wire them together with backbone routes.
    // You can still see the basic pattern applied from here though: http://getbootstrap.com/javascript/#tabs
    tab_click: function (event) {
        event.preventDefault();
        var anchor_tag = $(event.target);
        var data_target = anchor_tag.attr("data-target");
        Backbone.history.navigate(data_target, {trigger: true});
        return false;
    }
});