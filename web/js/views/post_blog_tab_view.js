"use strict";

window.COC.views.PostBlog = Backbone.View.extend({

    editor_view: null,

    initialize: function () {
        this.render();
    },

    render: function () {

        // Render template html and place on page.
        var template = templates['handlebars/post_blog.handlebars'];
        var html = template();
        this.$el.html(html);

        // Create a post editor
        if (this.editor_view == null) {
            var editor_attach_point = this.$el.find('#post_editor_attach_point');
            this.editor_view = new COC.views.PostEditor({el: editor_attach_point});
        }
    }
});