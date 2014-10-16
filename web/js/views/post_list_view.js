"use strict";

window.COC.views.PostList = Backbone.View.extend({

    log_tag: "post_list_view",

    elements: {

    },


    initialize: function () {
        this.render();

        // TODO could be smarter and render only the post, not the whole list page
        this.listenTo(this.model, "change", this.render);
    },

    render: function () {

        // TODO copied from post_view.js .......
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
        // end copied code

        // Render the story container.
        var template = templates['handlebars/post_list.handlebars'];
        var post_list_html = template(context);
        this.$el.html(post_list_html);
    }
});