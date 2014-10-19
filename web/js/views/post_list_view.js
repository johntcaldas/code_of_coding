"use strict";

window.COC.views.PostList = Backbone.View.extend({

    log_tag: "post_list_view",

    initialize: function (options) {
        this.id_or_title = options.id_or_title;

        if(!this.id_or_title) {
            COC.log.error(this.log_tag + " No id or title.");
            return;
        }

        if(COC.fetching_posts) {
            COC.data.posts.on('reset', this.set_post_model.bind(this));
        }
        else {
            this.set_post_model();
        }
    },

    render: function () {

        var post = this.model;

        // Format the date.
        var moment_date = COC.util.moment_date_from_iso_string(post.get("date"));
        var string_date = moment_date.format("dddd, MMMM Do YYYY");

        // Create a list of posts for the list group on the left.
        var posts = [];
        COC.data.posts.each(function (post) {
            var post_data = {};
            post_data['title'] = post.get("title");
            post_data['url'] = "posts/" +  COC.util.string_to_url_component(post.get("title"));
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

        // Render template.
        var template = templates['handlebars/post_list.handlebars'];
        var post_list_html = template(context);
        this.$el.html(post_list_html);
    },

    set_post_model: function () {
        this.model = this.get_post_by_id_or_title();
        this.render();
    },

    set_id_or_title: function (id_or_title) {
        this.id_or_title = id_or_title;
        this.set_post_model();
    },

    get_post_by_id_or_title: function () {
        // Check heck to see if we got a post id.
        var post_model = COC.data.posts.get(this.id_or_title);

        // If not, then check if we can grab a post by url formatted title.
        if (!post_model) {
            COC.data.posts.each(function (post) {
                var title = post.get('title');
                var url_title = COC.util.string_to_url_component(title);

                if (url_title === this.id_or_title) {
                    post_model = post;
                }
            }.bind(this));
        }

        // This method returns undefined if no posts preset.
        return post_model;
    }
});