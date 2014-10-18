"use strict";

window.COC.views.PostList = Backbone.View.extend({

    log_tag: "post_list_view",

    elements: {

    },


    initialize: function () {
        this.render();

        // TODO could be smarter and render only the post, not the whole list page
        this.listenTo(this.model, "change", this.render);

        // Get the list group of post title links and override the click event.
        var post_list_attach_point = this.$el.find('#post_list_attach_point');
        var anchor_tags = post_list_attach_point.find('a');
        anchor_tags.click(function(event) {
            event.preventDefault();
            var anchor_tag = event.target;
            var post_id = anchor_tag.data("object-id");
            Backbone.history.navigate("posts/" + post_id, { trigger: true });
        }.bind(this));
    },

    render: function () {

        // TODO copied from post_view.js .......
        var post = this.model;

        // Format the date.
        var moment_date = COC.util.moment_date_from_iso_string(post.get("date"));
        var string_date = moment_date.format("dddd, MMMM Do YYYY");

        // Create a list of posts for the list group on the left.
        var posts = [];
        COC.data.posts.each(function (post) {
            var post_data = {};
            post_data['title'] = post.get("title");
            post_data['object_id'] = post.get("_id");
            posts.push(post_data);
        });

        // Render the post template.
        var context = {
            "title": post.get("title"),
            "html": post.get("html"),
            "date": string_date,
            "object_id": post.get("_id"),
            "post_list": posts
        };
        // end copied code

        // Render the story container.
        var template = templates['handlebars/post_list.handlebars'];
        var post_list_html = template(context);
        this.$el.html(post_list_html);
    }
});