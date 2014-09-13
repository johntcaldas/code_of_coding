// TODO: I somehow forgot camel casing in this file ...

window.COC.views.PostBlog = Backbone.View.extend({


    events: {
        "click #post_btn": "post_btn_click"
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

    post_btn_click: function () {

        // Validate input
        var alert_div = $('#post_blog_alert');

        var post_html = CKEDITOR.instances.post_editor.getData();
        if(!post_html || post_html == null || post_html == "") {
            alert_div.html('Write a post first!');
            alert_div.addClass('show');
            alert_div.addClass('alert-danger');
            alert_div.removeClass('hidden');
            setTimeout(function() {
                alert_div.fadeTo(500, 0).slideUp(500, function(){
                    alert_div.removeClass('show');
                    alert_div.addClass('hidden');
                });
            }, 5000);
            return;
        }

        var title = $('#title_txt').val();
        if(!title || title == null || title == "") {
            alert_div.html('You might want to give that post a title!');
            alert_div.addClass('show');
            alert_div.addClass('alert-danger');
            alert_div.removeClass('hidden');
            setTimeout(function() {
                alert_div.fadeTo(500, 0).slideUp(500, function(){
                    alert_div.removeClass('show');
                    alert_div.addClass('hidden');
                });
            }, 5000);
            return;
        }

        var tags = $('#tags_txt').val();
        if(!tags || tags == null || tags == "") {
            alert_div.html('You might want to come up with some tags!');
            alert_div.addClass('show');
            alert_div.addClass('alert-danger');
            alert_div.removeClass('hidden');
            setTimeout(function() {
                alert_div.fadeTo(500, 0).slideUp(500, function(){
                    alert_div.removeClass('show');
                    alert_div.addClass('hidden');
                });
            }, 5000);
            return;
        }

        var title = $('#title_txt').val();
        var tags = $('#tags_txt').val();
        //var date_picker_div = $('#post_date_picker');
        ///var date = date_picker_div.datepicker('getDate');
        var date = new Date();
        var isoDateStr = date.toISOString();
        var data = {
            "title": title,
            "html": post_html,
            "tags": tags,
            "date": isoDateStr
        };

        // Set button to loading text
        var post_btn = $('#post_btn');
        post_btn.button('loading');

        // Post to server
        var url = window.COC.serverUrlRoot + "/posts/";
        $.post(url, data, this.post_to_server_success, "json");
    },

    post_to_server_success: function (data) {

        // Reset button text
        var post_btn = $('#post_btn');
        setTimeout(function () {
            post_btn.button('reset');
        }, 300);


        var alert_div = $('#post_blog_alert');

        if(!data.success) {
            alert_div.html('Error submitting to server!');
            alert_div.addClass('show');
            alert_div.addClass('alert-danger');
            alert_div.removeClass('hidden');
            return;
        }

        alert_div.html('Post submitted!');
        alert_div.addClass('show');
        alert_div.addClass('alert-success');
        alert_div.removeClass('alert-danger');
        alert_div.removeClass('hidden');

        setTimeout(function() {
            alert_div.fadeTo(500, 0).slideUp(500, function(){
                alert_div.removeClass('show');
                alert_div.addClass('hidden');
            });
        }, 5000);

        CKEDITOR.instances.post_editor.setData('Feel like writing something else?');
        $('#tags_txt').val('');
        $('#title_txt').val('');

    }
});