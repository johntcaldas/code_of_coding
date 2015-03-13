// A post editor widget used when both posting and editing material.

"use strict";

window.COC.views.PostEditor = Backbone.View.extend({

    // Backbone's dictionary of events.
    events: {
        "click #post_btn": "post_btn_click"
    },

    SUMMARY_EDITOR_HEIGHT: "200px",
    POST_EDITOR_HEIGHT: "800px",

    initialize: function () {

        this.render();

        // Initialize "instance" variables.
        this.post = null;                  // Backbone model instance for a post. Present in "edit" mode.
        this.summary_editor_dom_id = null; // The summary editor text area to replace with a CKEditor.
        this.post_editor_dom_id = null;    // The post editor text area to replace with a CKEditor.
        this.top_space_dom_id = null;      // The "top space" of the CKEditor (toolbar).
        this.bottom_space_dom_id = null;   // The "bottom space" of the CKEditor (footer).
        this.edit_mode = false;            // Will be set to true if we enter "edit mode". (eg. someone calls set_post).

        // Grab references to the elements we're going to be manipulating from this view.
        this.elements = {
            summary_editor_text_area : this.$el.find("#summary_ckeditor"),
            post_editor_text_area : this.$el.find("#post_ckeditor"),
            date_picker_div : this.$el.find("#post_date_picker"),
            title_txt : this.$el.find("#title_txt"),
            tags_txt : this.$el.find("#tags_txt"),
            post_btn : this.$el.find("#post_btn"),
            top_space_div : this.$el.find("#top_space"),
            bottom_space_div : this.$el.find("#bottom_space"),
            alert_view : new COC.views.Alert({ el: this.$el.find("#post_blog_alert_attach_point") })
        };

        // Make the top and bottom space ids unique (to support multiple editors)
        this.top_space_dom_id = COC.util.uuid();
        this.elements.top_space_div.attr("id", this.top_space_dom_id);
        this.bottom_space_dom_id = COC.util.uuid();
        this.elements.bottom_space_div.attr("id", this.bottom_space_dom_id);

            // Initialize CKEditor for the summary.
        this.summary_editor_dom_id = COC.util.uuid();
        this.elements.summary_editor_text_area.attr("id", this.summary_editor_dom_id);
        CKEDITOR.replace(this.summary_editor_dom_id, {
            height: this.SUMMARY_EDITOR_HEIGHT,
            sharedSpaces: {
                top : this.top_space_dom_id,
                bottom : this.bottom_space_dom_id
            },

            // Removes the maximize and resize plugins because they are not usable in a shared toolbar.
            removePlugins: "resize"
        });

        // Initialize CKEditor for the post.
        this.post_editor_dom_id = COC.util.uuid();
        this.elements.post_editor_text_area.attr("id", this.post_editor_dom_id);
        CKEDITOR.replace(this.post_editor_dom_id, {
            height: this.POST_EDITOR_HEIGHT,
            sharedSpaces :
            {
                top : this.top_space_dom_id,
                bottom : this.bottom_space_dom_id
            },

            // Removes the maximize and resize plugins because they are not usable in a shared toolbar.
            removePlugins : "resize"
        });


        // Initialize the date picker.
        var date_picker = this.elements.date_picker_div;
        date_picker.datepicker({
            todayHighlight: true,
            todayBtn: true
        });

        var date = new Date();
        date_picker.datepicker("setValue", date);
        date_picker.datepicker("update", date);
    },

    render: function () {
        // Render template html and place on page.
        var template = templates["handlebars/post_editor.handlebars"];
        var html = template();
        this.$el.html(html);
    },

    set_post: function (post) {

        this.edit_mode = true;

        // Place the summary html its the editor.
        CKEDITOR.instances[this.summary_editor_dom_id].setData(post.get("summary"));

        // Place the post html in its editor.
        CKEDITOR.instances[this.post_editor_dom_id].setData(post.get("html"));

        // Update fields.
        this.elements.title_txt.val(post.get("title"));
        this.elements.tags_txt.val(post.get("tags"));

        // Set the date picker.
        var moment_date = COC.util.moment_date_from_iso_string(post.get("date"));
        var date = moment_date.toDate();
        this.elements.date_picker_div.datepicker("setDate", date);
        this.elements.date_picker_div.datepicker("update", date);

        this.post = post;
    },

    post_btn_click: function (event) {

        event.preventDefault();

        // Validate input
        var summary_html = CKEDITOR.instances[this.summary_editor_dom_id].getData();
        if (!summary_html || summary_html == null || summary_html == "") {
            this.elements.alert_view.show_alert("This post needs a summary!", "alert-danger");
            return
        }

        var post_html = CKEDITOR.instances[this.post_editor_dom_id].getData();
        if (!post_html || post_html == null || post_html == "") {
            this.elements.alert_view.show_alert("Write a post first!", "alert-danger");
            return;
        }

        var title = this.elements.title_txt.val();
        if (!title || title == null || title == "") {
            this.elements.alert_view.show_alert("You might want to give that post a title!", "alert-danger");
            return;
        }

        var tags = this.elements.tags_txt.val();
        if (!tags || tags == null || tags == "") {
            this.elements.alert_view.show_alert("You might want to come up with some tags!", "alert-danger");
            return;
        }

        var date = this.elements.date_picker_div.datepicker("getDate");
        var iso_date_str = date.toISOString();


        if (!this.post) {
            this.post = new COC.models.Post({});
        }

        this.post.set({
            "title": title,
            "summary": summary_html,
            "html": post_html,
            "tags": tags,
            "date": iso_date_str
        });

        this.post.save({}, {
            success: this.post_to_server_success.bind(this),
            error: this.post_to_server_error.bind(this)
        });

        // Add the new post to the posts collection.
        if (!this.edit_mode) {
            COC.data.posts.add(this.post);
        }

        // Set button to loading text
        this.elements.post_btn.button("loading");
    },

    post_to_server_success: function (model, response, options) {

        if (!response.success) {
            this.post_to_server_error(model, response, options);
            return;
        }

        this.elements.alert_view.show_alert("Post submitted!", "alert-success");

        CKEDITOR.instances[this.summary_editor_dom_id].setData("Yet another summary.");
        CKEDITOR.instances[this.post_editor_dom_id].setData("Feel like writing something else?");
        this.elements.tags_txt.val("");
        this.elements.title_txt.val("");
        this.edit_mode = false;

        this.post_to_server_complete();
    },

    post_to_server_error: function (model, response, options) {
        /* Example error response contains:
            response.statusText = "UNAUTHORIZED"
            response.responseText = "Authentication required."
            options.url = "http://127.0.0.1:5000/posts/"
            options.headers = { X-AuthToken: "aad913fc06dc4e86ba0378990aff3ce9" }
         */
        this.elements.alert_view.show_alert("Error posting to server!", "alert-danger");
        this.post_to_server_complete();
    },

    // For things we need to do after every post, regardless of success.
    post_to_server_complete: function() {
        // Reset button text
        setTimeout(function () {
            this.elements.post_btn.button("reset");
        }.bind(this), 300);
    }
});