window.COC.views.SystemInfo = Backbone.View.extend({

    initialize: function() {
        this.render();
    },

    render: function() {
        CKEDITOR.replace( 'post_blog_editor' );
        return;
    }
});