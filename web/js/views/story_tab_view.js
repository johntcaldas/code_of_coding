"use strict";

window.COC.views.Story = Backbone.View.extend({

    log_tag: "story_view",

    elements: {
        edit_post_modal: null,
        editor_view: null
    },

    initialize: function () {
        this.render();
    },

    render: function () {

        var template = templates['handlebars/story.handlebars'];
        var html = template();
        this.$el.html(html);

        var url = COC.server_url_root + "/posts/";
        $.get(url, this.render_posts_from_server.bind( this ));
    },

    render_posts_from_server: function (data, textStatus, jqXHR) {

        if (!data.success) {
            COC.log.error(this.log_tag + " Get posts request unsuccessful.");
            return;
        }

        var posts = data.posts;

        var post_template = templates['handlebars/story_post.handlebars'];
        var post_attach_point_div = this.$el.find('#story_posts_attach_point');

        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];

            // Format the date.
            var moment_date = moment(post.date, moment.ISO_8601);
            var string_date = moment_date.format("dddd, MMMM Do YYYY");

            var context = {
                "title": post.title,
                "html": post.html,
                "date": string_date,
                "object_id": post._id
            };
            var html = post_template(context);

            // Create JQuery DOM object from html
            // See http://stackoverflow.com/questions/11047670/creating-a-jquery-object-from-a-big-html-string
            var post_div = $('<div/>').html(html).contents();

            post_div.dblclick(function (event) {
                // The target will be a specific part of the post view (heading/body/footer)
                var clicked_element = $(event.target);
                if (clicked_element.hasClass('panel-heading')) {
                    console.log("I'm a panel");
                }
                if (clicked_element.hasClass('panel-body')) {
                    console.log("I'm a panel body");
                }
                if (clicked_element.hasClass('panel-footer')) {
                    console.log("I'm a panel footer");
                }

                // Clicked element will always be either 'panel', 'panel body', or 'panel footer'. So, we grab the
                // parent element to pass it to edit_post.
                var edit_post_div = clicked_element.parent();
                edit_post_div = edit_post_div.parent();
                this.edit_post(edit_post_div);
            }.bind( this ));

            post_attach_point_div.append(post_div);
        }
    },

    edit_post: function (post_div) {
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

        // Get post data to pass to editor.
        var post = COC.data.posts.get(post_div.data('object-id'));

        // Create a post editor in the modal body
        if (this.elements.editor_view == null) {
            modal_body = edit_post_modal.find('.modal-body');
            this.elements.editor_view = new COC.views.PostEditor({el: modal_body, post: post});
        }

        this.elements.edit_post_modal.modal();
    }
});