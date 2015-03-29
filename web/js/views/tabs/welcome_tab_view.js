"use strict";

window.COC.views.Welcome = Backbone.View.extend({

    log_tag: "welcome_view",
    content_id: "welcome_tab",


    initialize: function () {

        // Initialize "instance" variables.
        this.welcome_tab_div_dom_id = "welcome_tab_content";
        this.inline_ckeditor = null;
        this.content_url = COC.server_url_root + "/content/" + this.content_id;

        // This view alerts via the application-wide alert view provided by the Body Container.
        this.alert_view = COC.views.alert_view;

        this.render();


        // Grab references to the elements we're going to be manipulating.
        this.elements = {
            welcome_tab_div : this.$el.find("#" + this.welcome_tab_div_dom_id)
        };

        // Load content for this tab from the server.
        if(COC.fetching_content) {
            COC.data.content.on("reset", this.set_content_model.bind(this));
        }
        else {
            this.set_content_model();
        }
    },

    render: function () {
        // Render the welcome tab.
        var template = templates["handlebars/tabs/welcome.handlebars"];
        var welcome_html = template();
        this.$el.html(welcome_html);
    },

    set_content_model: function () {
        this.model = COC.data.content.get(this.content_id);
        this.elements.welcome_tab_div.html(this.model.get("html"));
        this.enable_edit_mode();
    },

    enable_edit_mode: function () {

        // Make the content editable only if a user is logged in.
        if(!COC.session_token) {
            return;
        }

        // This property tells CKEditor to not activate every element with contenteditable=true element.
        // TODO: this probably belongs at a more global level (body_container/main/global/etc) than in this view
        CKEDITOR.disableAutoInline = true;

        // Creating an inline editor using the example on this page:
        // http://nightly.ckeditor.com/15-03-13-07-08/standard/samples/inlinebycode.html
        this.elements.welcome_tab_div.attr("contenteditable", true);
        this.inline_ckeditor = CKEDITOR.inline("welcome_tab_content");

        // Listen for changes, and save them to the server.
        this.inline_ckeditor.on("blur", function(event){
            if (event.editor.checkDirty()) {
                this.save_edits_to_server(event);
            }
        }.bind(this));
    },

    save_edits_to_server: function (event) {

        this.model.set({
            "html": this.inline_ckeditor.getData()
        });

        this.model.save({}, {
            success: this.post_to_server_success.bind(this),
            error: this.post_to_server_error.bind(this)
        });
    },

    post_to_server_success: function (model, response, options) {

        if (!response.success) {
            this.post_to_server_error(model, response, options);
            return;
        }

        this.alert_view.show_alert("Welcome tab saved!", "alert-success");
    },

    post_to_server_error: function (model, response, options) {
        /* Example error response contains:
         response.statusText = "UNAUTHORIZED"
         response.responseText = "Authentication required."
         options.url = "http://127.0.0.1:5000/posts/"
         options.headers = { X-AuthToken: "aad913fc06dc4e86ba0378990aff3ce9" }
         */
        this.alert_view.show_alert("There was an error communicating with the server.", "alert-danger");
    }
});
