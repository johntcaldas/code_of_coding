// A view of a single post.
//
// model : This view assumes it is being initialized with a model.
//
// Provides an 'edit' button. Edit functionality remains the responsibility of the parent view.
// A parent view must implement a "edit_post" method.
// Set parent by passing an "options" parameter to initialize. (eg.
// options: {
//     parent:     An object (presumably a parent view) that implements post editing functionality.
// }

"use strict";

window.COC.views.Post = Backbone.View.extend({

    tagName: 'div',
    log_tag: "post_view",

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
            "html": post.get("html"),
            "date": string_date,
            "object_id": post.get("_id")
        };
        var post_template = templates['handlebars/post.handlebars'];
        var post_html = post_template(context);
        this.$el.html(post_html);


        // If a user is logged in, and there's a parent view to handle editing, show edit button.
        if (COC.session_token && this.parent_view) {

            var edit_btn = this.$el.find('.btn');
            edit_btn.removeClass("hidden");

            edit_btn.click(function (event) {
                // Get post data to pass to editor.
                this.parent_view.edit_post(this.model);
            }.bind(this));
        }
    }
});