"use strict";

// TODO: I somehow forgot camel casing in this file ...

window.COC.views.PostBlog = Backbone.View.extend({

    // Backbone's dictionary of events.
    events: {
        "click #post_btn": "post_btn_click"
    },

    // The list of elements we'll be manipulating from this view.
    elements: {
       date_picker_div: null,
       alert_div: null,
       title_txt: null,
       tags_txt: null,
       post_btn: null
    },

    initialize: function () {
        this.render();
    },

    render: function () {

        // Render tamplate html and place on page.
        var template = templates['handlebars/post_blog.handlebars'];
        var html = template();
        this.$el.html(html);

        // Grab references to the elements we're going to be manipulating.
        this.elements.date_picker_div = $('#post_date_picker');
        this.elements.alert_div = $('#post_blog_alert');
        this.elements.title_txt = $('#title_txt');
        this.elements.tags_txt = $('#tags_txt');
        this.elements.post_btn = $('#post_btn');

        // Initialize CKEditor.
        CKEDITOR.replace('post_editor');

        // Initialize the date picker.
        var date_picker = this.elements.date_picker_div;
        date_picker.datepicker({
            todayHighlight: true,
            todayBtn: true
        });

        date_picker.datepicker('setValue', new Date());
        date_picker.datepicker('update', new Date());
    },

    post_btn_click: function () {

        // Validate input
        var post_html = CKEDITOR.instances.post_editor.getData();
        if(!post_html || post_html == null || post_html == "") {
            this.show_alert('Write a post first!', 'alert-danger');
            return;
        }

        var title = this.elements.title_txt.val();
        if(!title || title == null || title == "") {
            this.show_alert('You might want to give that post a title!', 'alert-danger');
            return;
        }

        var tags = this.elements.tags_txt.val();
        if(!tags || tags == null || tags == "") {
            this.show_alert('You might want to come up with some tags!', 'alert-danger');
            return;
        }

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
        this.elements.post_btn.button('loading');

        // Post to server
        var url = window.COC.serverUrlRoot + "/posts/";
        $.post(url, data, this.post_to_server_success.bind(this), "json");
    },

    post_to_server_success: function (data) {

        // Reset button text
        setTimeout(function () {
            this.elements.post_btn.button('reset');
        }.bind(this), 300);


        if(!data.success) {
            this.show_alert('Error submitting to server!', 'alert-danger');
            return;
        }

        this.show_alert('Post submitted!', 'alert-success');

        CKEDITOR.instances.post_editor.setData('Feel like writing something else?');
        this.elements.tags_txt.val('');
        this.elements.title_txt.val('');

    },

    show_alert: function(text, bootstrap_class) {
        var alert_div = this.elements.alert_div;

        alert_div.html(text);
        alert_div.addClass(bootstrap_class);
        alert_div.addClass('show');
        alert_div.removeClass('hidden');

        // Set alert to fade out.
        setTimeout(function() {
            alert_div.fadeTo(500, 0).slideUp(500, function(){
                alert_div.removeClass('show');
                alert_div.addClass('hidden');

                // Remove potentially used bootstrap classes
                alert_div.removeClass('alert-danger');
                alert_div.removeClass('alert-success');
            });
        }, 5000);
    }
});