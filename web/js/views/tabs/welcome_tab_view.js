"use strict";

window.COC.views.Welcome = Backbone.View.extend({

    log_tag: "welcome_view",
    content_id: "welcome_tab",


    initialize: function () {

        // Initialize "instance" variables.
        this.welcome_tab_div_dom_id = "welcome_tab_content";
        this.inline_ckeditor = null;
        this.content_url = COC.server_url_root + "/content/" + this.content_id;

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
        this.inline_ckeditor.on("change", function(event){
            this.save_edits_to_server(event);
        }.bind(this))
    },

    save_edits_to_server: function (event) {

        var data = JSON.stringify({
            "html": this.inline_ckeditor.getData()
        });

        $.ajax({
            type: "PUT",
            beforeSend: function (request)
            {
                request.setRequestHeader("X-AuthToken", COC.session_token);
            },
            contentType: "application/json",
            url: this.content_url,
            data: data,
            success: this.handle_save_response.bind(this),
            error: function() {
                alert("error saving to server");
            }
        });
    },

    handle_save_response: function (data, textStatus, jqXHR) {
        // TODO: provide some sort of visual feedback to the user.
        if (data['success'] == false) {
            alert("save to server unsuccessful");
        }
    }
});
