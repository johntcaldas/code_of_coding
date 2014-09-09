// TODO: I somehow forgot camel casing in this file ...

window.COC.views.PostBlog = Backbone.View.extend({

    events: {
        "click #post_btn": "post_to_server"
    },

    initialize: function () {
        this.render();
    },

    render: function () {

        var template = templates['handlebars/post_blog.handlebars'];
        var html = template();
        this.$el.html(html);

        CKEDITOR.replace('post_editor');
    },

    post_to_server: function () {
        var url = window.COC.serverUrlRoot + "/posts/";
        var post_html = CKEDITOR.getData();
        var data = {
            "html": post_html,
            "tags": "hello,world,of,tags",
            "author": "John"
        };

        jQuery.post(url, data, this.post_to_server_success, "json");
    },

    post_to_server_success: function (data) {
    }
});