"use strict";

window.COC.views.Story = Backbone.View.extend({

    log_tag: "story_view",


    initialize: function () {

        // Initialize "instance" variables.
        this.elements = {
                editor_view: null,
                post_attach_point_div: null
        };

        // Array of subviews for individual posts.
        this.post_views = [];

        this.render();

        // Set up listeners for change events
        this.listenTo(COC.data.posts, "add", this.post_added.bind(this));
    },

    render: function () {

        // Render the story container.
        var template = templates["handlebars/tabs/story.handlebars"];
        var story_html = template();
        this.$el.html(story_html);

        if(COC.fetching_posts) {
            COC.data.posts.on("reset", this.load_posts.bind(this));
        }
        else {
            this.load_posts();
        }
    },

    load_posts: function () {
        // Render each post and insert into the story.
        var posts = COC.data.posts;

        // Before actually placing the stories in the dom, build out the whole collection into a document fragment.
        // See http://ozkatz.github.io/avoiding-common-backbonejs-pitfalls.html, #2, on avoiding DOM reflows.
        var document_fragment = $(document.createDocumentFragment());

        posts.each(function (post) {
            var post_view = this.create_post_view(post);
            document_fragment.append(post_view.el);
        }.bind(this));

        // After rendering all the stories, place our document fragment in the DOM attach point.
        this.elements.post_attach_point_div = this.$el.find("#story_posts_attach_point");
        this.elements.post_attach_point_div.append(document_fragment);
    },

    post_added: function (post, posts, options) {
        var post_view = this.create_post_view(post);
        this.elements.post_attach_point_div.prepend(post_view.$el);
    },

    create_post_view: function (post) {
        var post_view = new COC.views.Post({ model: post, parent: this, summary_view: true});
        this.post_views.push(post_view);
        return post_view;
    }
});