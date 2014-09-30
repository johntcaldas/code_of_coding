// A post editor widget used when both posting and editing material.
// Initialize takes an optional "post" model instance. When present, the editor will be in 'edit' mode, and when absent
// the editor will be in 'add' mode.
// options: {
//     post:           An instance of a post model. Pass in when editing, leave out when creating.
// }

"use strict";

window.COC.views.PostEditor = Backbone.View.extend({

    // Backbone's dictionary of events.
    events: {
        "click #post_btn": "post_btn_click"
    },

    // The list of elements we'll be manipulating from this view.
    elements: {
        post_editor_text_area: null,
        date_picker_div: null,
        title_txt: null,
        tags_txt: null,
        post_btn: null,
        alert_view: null
    },


    post: null,           // Backbone model instance for a post. Present in 'edit' mode.
    editor_dom_id: null,  // The dom id of the editor text area to replace with a CKEditor.

    initialize: function (options) {
        this.render();

        // Grab references to the elements we're going to be manipulating.
        this.elements.post_editor_text_area = this.$el.find('#post_ckeditor');
        this.elements.date_picker_div = this.$el.find('#post_date_picker');
        this.elements.title_txt = this.$el.find('#title_txt');
        this.elements.tags_txt = this.$el.find('#tags_txt');
        this.elements.post_btn = this.$el.find('#post_btn');
        this.elements.alert_view = new COC.views.Alert({ el:this.$el.find('#post_blog_alert_attach_point') });

        // Initialize CKEditor.
        this.editor_dom_id = COC.util.uuid();
        this.elements.post_editor_text_area.attr("id", this.editor_dom_id);
        CKEDITOR.replace(this.editor_dom_id);


        // Initialize the date picker.
        var date_picker = this.elements.date_picker_div;
        date_picker.datepicker({
            todayHighlight: true,
            todayBtn: true
        });

        // If we have a post (eg. because we're editing), populate fields.
        var date = null;
        if(options && options.post) {
            var post = this.post = options.post;
            CKEDITOR.instances[this.editor_dom_id].setData(post.get('html'));
            this.elements.title_txt.val(post.get('title'));
            this.elements.tags_txt.val(post.get('tags'));
            date = new Date(post.get('date'))
        }
        else {
            date = new Date();
        }

        date_picker.datepicker('setValue', date);
        date_picker.datepicker('update', date);
    },

    render: function () {
        // Render template html and place on page.
        var template = templates['handlebars/post_editor.handlebars'];
        var html = template();
        this.$el.html(html);
    },

    post_btn_click: function () {

        // Validate input
        var post_html = CKEDITOR.instances[this.editor_dom_id].getData();
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
        post_model.save({}, {
            success: this.post_to_server_success.bind( this ),
            error: this.post_to_server_error.bind( this )
        });

        // Set button to loading text
        this.elements.post_btn.button('loading');

    },

    post_to_server_success: function (model, response, options) {

        // Reset button text
        setTimeout(function () {
            this.elements.post_btn.button('reset');
        }.bind(this), 300);


        if (!response.success) {
            this.post_to_server_error(model, response, options);
            return;
        }

        this.elements.alert_view.show_alert('Post submitted!', 'alert-success');

        CKEDITOR.instances[this.editor_dom_id].setData('Feel like writing something else?');
        this.elements.tags_txt.val('');
        this.elements.title_txt.val('');
    },

    post_to_server_error: function(model, response, options) {
        this.elements.alert_view.show_alert('Error posting to server!', 'alert-danger');
    }
});