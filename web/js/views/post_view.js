// A view of a single post.
//
// model : This view assumes it is being initialized with a model.
//
// Provides an "edit" button. Edit functionality remains the responsibility of the parent view.
// A parent view must implement a "edit_post" method.
// Set parent by passing an "options" parameter to initialize. (eg.
// options: {
//     parent:     An object (presumably a parent view) that implements post editing functionality.
// }

"use strict";

window.COC.views.Post = Backbone.View.extend({

    tagName: "div",
    log_tag: "post_view",

    events: {
        "click #title" : "go_to_post_page",
        "click #read_more_btn" : "go_to_post_page"
    },

    initialize: function (options) {

        this.parent_view = options.parent;

        this.render();
        this.listenTo(this.model, "change", this.render);
    },

    render: function () {
        var post = this.model;

        // Format the date.
        var moment_date = COC.util.moment_date_from_iso_string(post.get("date"));
        var string_date = moment_date.format("dddd, MMMM Do YYYY");

        // Render the post template.
        var context = {
            "title": post.get("title"),
            "html": post.get("summary"),
            "date": string_date
        };
        var post_template = templates["handlebars/post.handlebars"];
        var post_html = post_template(context);
        this.$el.html(post_html);

        this.$el.find("pre code").each(function (i, block) {
            hljs.highlightBlock(block);
        });


        // If a user is logged in, and there's a parent view to handle editing, show edit button.
        if (COC.session_token && this.parent_view) {

            var edit_btn = this.$el.find("#edit_btn");
            edit_btn.removeClass("hidden");

            edit_btn.click(function (event) {
                // Get post data to pass to editor.
                this.parent_view.edit_post(this.model);
            }.bind(this));
        }
    },

    go_to_post_page: function() {
        var url_title = COC.util.string_to_url_component(this.model.get("title"));
        Backbone.history.navigate("posts/" + url_title, { trigger: true });
    }
});