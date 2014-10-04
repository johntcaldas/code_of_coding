"use strict";

window.COC.views.Story = Backbone.View.extend({

    log_tag: "story_view",

    elements: {
        edit_post_modal: null,
        editor_view: null
    },

    initialize: function () {
        this.render();

        // Set up listeners for change events
        //this.listenTo(COC.data.posts, )
    },

    render: function () {

        // Render the story container.
        var template = templates['handlebars/story.handlebars'];
        var story_html = template();
        this.$el.html(story_html);


        // Render each post and insert into the story.
        var posts = COC.data.posts;
        var post_template = templates['handlebars/story_post.handlebars'];

        // Before actually placing the stories in the dom, build out the whole collection into a document fragment.
        // See http://ozkatz.github.io/avoiding-common-backbonejs-pitfalls.html, #2, on avoiding DOM reflows.
        var document_fragment = $(document.createDocumentFragment());

        posts.each(function(post) {

            // Format the date.
            var moment_date = moment(post.get("date"), moment.ISO_8601);
            var string_date = moment_date.format("dddd, MMMM Do YYYY");

            var context = {
                "title": post.get("title"),
                "html": post.get("html"),
                "date": string_date,
                "object_id": post.get("_id")
            };
            var post_html = post_template(context);

            // Create JQuery DOM object from html
            // See http://stackoverflow.com/questions/11047670/creating-a-jquery-object-from-a-big-html-string
            var post_div = $('<div/>').html(post_html).contents();
            document_fragment.append(post_div);

            // If a user is logged in, show edit button.
            if(COC.session_token) {
                var edit_btn = post_div.find('.btn');
                edit_btn.removeClass("hidden");
                edit_btn.click(function(event) {
                    // Get post data to pass to editor.
                    var post = COC.data.posts.get($(event.target).data('object-id'));
                    this.edit_post(post);
                }.bind( this ));
            }
        }.bind( this ));

        // After rendering all the stories, place our document fragment in the DOM attach point.
        var post_attach_point_div = this.$el.find('#story_posts_attach_point');
        post_attach_point_div.append(document_fragment);
    },

    edit_post: function (post) {
        var modal_body = null;
        var edit_post_modal = null;

        if (this.elements.edit_post_modal === null) {
            var modal_template = templates['handlebars/modal.handlebars'];
            var html = modal_template();
            edit_post_modal = $('<div/>').html(html).contents();
            this.elements.edit_post_modal = edit_post_modal;
            this.$el.append(edit_post_modal);
        }
        else {
            edit_post_modal = this.elements.edit_post_modal;
        }

        // TODO above and below if structures can be refactored.



        // Create a post editor in the modal body
        if (this.elements.editor_view == null) {
            modal_body = edit_post_modal.find('.modal-body');
            this.elements.editor_view = new COC.views.PostEditor({el: modal_body});
        }

        this.elements.editor_view.set_post(post);
        this.elements.edit_post_modal.modal();
    }
});