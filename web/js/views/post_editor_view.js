"use strict";

window.COC.views.PostEditor = Backbone.View.extend({

    // Backbone's dictionary of events.
    events: {
        "click #post_btn": "post_btn_click"
    },

    // The list of elements we'll be manipulating from this view.
    elements: {
        date_picker_div: null,
        title_txt: null,
        tags_txt: null,
        post_btn: null,
        alert_view: null
    },

    initialize: function () {
        this.render();
    },

    render: function () {

        // Render template html and place on page.
        var template = templates['handlebars/post_editor.handlebars'];
        var html = template();
        this.$el.html(html);

        // Grab references to the elements we're going to be manipulating.
        this.elements.date_picker_div = $('#post_date_picker');
        this.elements.title_txt = $('#title_txt');
        this.elements.tags_txt = $('#tags_txt');
        this.elements.post_btn = $('#post_btn');
        this.elements.alert_view = new COC.views.Alert({ el:$('#post_blog_alert_attach_point') });

        // Initialize CKEditor.
        CKEDITOR.replace('post_ckeditor');

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
        var post_html = CKEDITOR.instances.post_ckeditor.getData();
        if (!post_html || post_html == null || post_html == "") {
            this.elements.alert_view.show_alert('Write a post first!', 'alert-danger');
            return;
        }

        var title = this.elements.title_txt.val();
        if (!title || title == null || title == "") {
            this.elements.alert_view.show_alert('You might want to give that post a title!', 'alert-danger');
            return;
        }

        var tags = this.elements.tags_txt.val();
        if (!tags || tags == null || tags == "") {
            this.elements.alert_view.show_alert('You might want to come up with some tags!', 'alert-danger');
            return;
        }

        var date_picker_div = $('#post_date_picker');
        var date = date_picker_div.datepicker('getDate');
        var iso_date_str = date.toISOString();


        var post_model = new COC.models.Post({
            "title": title,
            "html": post_html,
            "tags": tags,
            "date": iso_date_str
        });
        post_model.save();

        // Set button to loading text
        this.elements.post_btn.button('loading');

    },

    post_to_server_success: function (data) {

        // Reset button text
        setTimeout(function () {
            this.elements.post_btn.button('reset');
        }.bind(this), 300);


        if (!data.success) {
            this.elements.alert_view.show_alert('Error submitting to server!', 'alert-danger');
            return;
        }

        this.elements.alert_view.show_alert('Post submitted!', 'alert-success');

        CKEDITOR.instances.post_ckeditor.setData('Feel like writing something else?');
        this.elements.tags_txt.val('');
        this.elements.title_txt.val('');
    }
});