window.COC.views.PostBlog = Backbone.View.extend({

    initialize: function() {
        this.render();
    },

    render: function() {
        debugger;
        CKEDITOR.replace( 'post_blog_editor' );
    }
});