"use strict";

/* Contains the topest level navigation elements (eg. welcome, story, login, about, contact etc) */
COC.views.BodyContainer = Backbone.View.extend({

    log_tag: "body_container_view",

    // Backbone's dictionary of events.
    events: {
        "click .navbar a[data-toggle]": "tab_click"
    },

    initialize: function () {
        this.render();

        this.elements = {
            edit_post_modal: null
        };

        this.initializePostEditorModal();

        this.listenToLoginKeypress();

        this.bindRouterEventsToTabViews();
    },

    render: function () {
        var template = templates["handlebars/body_container.handlebars"];
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
    },

    bindRouterEventsToTabViews: function () {
        // List on the top-level "tab" routes.
        COC.router.on("route:welcome", function () {
            $("a[data-target='#welcome']").tab("show");
        }.bind(this));

        COC.router.on("route:story", function () {
            if (COC.views.story_view === undefined) {
                COC.log.info(this.log_tag + " Loading story view ...");
                COC.views.story_view = new COC.views.Story({el: this.$el.find("#story")});
            }

            $("a[data-target='#story']").tab("show");
        }.bind(this));

        COC.router.on("route:post", function () {
            if (COC.views.post_view === undefined) {
                COC.log.info(this.log_tag + " Loading post a blog view ...");
                COC.views.post_view = new COC.views.PostBlog({el: this.$el.find("#post")});
            }

            $("a[data-target='#post']").tab("show");
        }.bind(this));


        // Listen on all routes, /posts ("List" tab), /posts/<post_id> or /posts/<title>
        COC.router.on("route:posts", function (id_or_title) {

            if (COC.views.view_post === undefined) {
                COC.log.info(this.log_tag + " Loading post list view ...");
                COC.views.view_post = new COC.views.PostList({
                    el:this.$el.find("#posts"),
                    id_or_title: id_or_title
                });
            }
            else if(id_or_title) {
                COC.views.view_post.set_id_or_title(id_or_title);
            }

            $("a[data-target='#posts']").tab("show");
        }.bind(this));
    },

    initializePostEditorModal: function () {
        // Initialize the post editor modal. Doing this after render because it is hidden when initialized.
        // 1.) Render the modal.
        var modal_template = templates["handlebars/modal.handlebars"];
        var html = modal_template();
        this.elements.edit_post_modal = $("<div/>").html(html).contents();
        this.$el.append(this.elements.edit_post_modal);

        // 2.) Create a new editor and place it in the modal.
        var modal_body = this.elements.edit_post_modal.find(".modal-body");
        this.elements.editor_view = new COC.views.PostEditor({el: modal_body});
    },

    edit_post: function (post) {
        // Prime the editor with the post to be edited and show modal.
        this.elements.editor_view.set_post(post);
        this.elements.edit_post_modal.modal();
    },

    // Wire login modal to keypress: Ctrl+Alt+L Modeled after:
    // http://stackoverflow.com/questions/5203407/javascript-multiple-keys-pressed-at-once
    listenToLoginKeypress: function () {

        var map = {};
        var handle_key_presses_for_login = function (event) {
            map[event.keyCode] = event.type == "keydown";
            if (map[17] && map[18] && map[76]) { // ctrl + alt + l
                if (COC.views.login_view === undefined) {
                    COC.log.info(this.log_tag + "Loading login view ...");
                    COC.views.login_view = new COC.views.Login({el: this.$el.find("#login")});
                }

                COC.views.login_view.show_modal();
            }
        }.bind(this);
        $(document.body).keydown(handle_key_presses_for_login);
        $(document.body).keyup(handle_key_presses_for_login);
    }
});