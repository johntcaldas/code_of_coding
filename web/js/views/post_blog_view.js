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

        var date_picker_div = $('#post_date_picker');
        date_picker_div.datepicker({
            todayHighlight: true,
            todayBtn: true
        });

        date_picker_div.datepicker('setValue', new Date());
        date_picker_div.datepicker('update', new Date());
    },

    post_to_server: function () {
        var url = window.COC.serverUrlRoot + "/posts/";
        var post_html = CKEDITOR.instances.post_editor.getData();
        var date_picker_div = $('#post_date_picker');
        var date = date_picker_div.datepicker('getDate');

        var data = {
            "title": "Hello World!",
            "html": post_html,
            "tags": "hello,world,of,tags",
            "date": date
        };

        $.post(url, data, this.post_to_server_success, "json");
    },

    post_to_server_success: function (data) {
    }
});