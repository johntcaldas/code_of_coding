"use strict";

window.COC.views.Story = Backbone.View.extend({

    log_tag: "story_view",

    elements: {
        edit_post_modal: null,
        editor_view: null,
        post_attach_point_div: null
    },

    // Array of subviews for individual posts.
    post_views: [],

    initialize: function () {

        this.render();

        // Initialize the post editor modal. Doing this after render because it is hidden when initialized.
        // 1.) Render the modal.
        var modal_template = templates['handlebars/modal.handlebars'];
        var html = modal_template();
        this.elements.edit_post_modal = $('<div/>').html(html).contents();
        this.$el.append(this.elements.edit_post_modal);

        // 2.) Create a new editor and place it in the modal.
        var modal_body = this.elements.edit_post_modal.find('.modal-body');
        this.elements.editor_view = new COC.views.PostEditor({el: modal_body});

        // Set up listeners for change events
        this.listenTo(COC.data.posts, "add", this.post_added.bind(this));
    },

    render: function () {

        // Render the story container.
        var template = templates['handlebars/story.handlebars'];
        var story_html = template();
        this.$el.html(story_html);

        if(COC.fetching_posts) {
            COC.data.posts.on('reset', this.load_posts.bind(this));
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
        this.elements.post_attach_point_div = this.$el.find('#story_posts_attach_point');
        this.elements.post_attach_point_div.append(document_fragment);
    },

    edit_post: function (post) {
        // Prime the editor with the post to be edited and show modal.
        this.elements.editor_view.set_post(post);
        this.elements.edit_post_modal.modal();
    },

    post_added: function (post, posts, options) {
        var post_view = this.create_post_view(post);
        this.elements.post_attach_point_div.prepend(post_view.$el);
    },

    create_post_view: function (post) {
        var post_view = new COC.views.Post({ model: post, parent: this});
        this.post_views.push(post_view);
        return post_view;
    }
});