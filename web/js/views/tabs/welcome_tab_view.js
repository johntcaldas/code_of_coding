"use strict";

window.COC.views.Welcome = Backbone.View.extend({

    log_tag: "welcome_view",


    initialize: function () {
        this.render();

        // Initialize "instance" variables.
        this.welcome_tab_div_dom_id = "welcome_tab_content";
        this.inline_ckeditor = null;

        // Grab references to the elements we're going to be manipulating.
        this.elements = {
            welcome_tab_div : this.$el.find("#" + this.welcome_tab_div_dom_id)
        };

        // If a user is logged in, make the content editable.
        if(COC.session_token) {
            // This property tells CKEditor to not activate every element with contenteditable=true element.
            // TODO: this sucker probably belongs at a more global level (body_container/main/global/etc) than in this view
            CKEDITOR.disableAutoInline = true;

            // Creating an inline editor using the example on this page:
            // http://nightly.ckeditor.com/15-03-13-07-08/standard/samples/inlinebycode.html
            this.elements.welcome_tab_div.attr("contenteditable", true);
            this.inline_ckeditor = CKEDITOR.inline("welcome_tab_content");

            // Listen for changes, and save them to the server.
            this.inline_ckeditor.on("change", function(event){
                this.save_edits_to_server(event).bind(this);
            })
        }
    },

    render: function () {
        // Render the welcome tab.
        var template = templates["handlebars/tabs/welcome.handlebars"];
        var welcome_html = template();
        this.$el.html(welcome_html);
    },

    save_edits_to_server: function (event) {

        var data = this.inline_ckeditor.getData();
        var url = COC.server_url_root + "/save_content/welcome_tab";

        /*
        $.ajax({
            contentType: "application/json",
            url: url,
            data: data,
            type: "POST",
            dataType: "json",
            success: this.handle_save_response.bind(this),
            error: function() {
                alert("error saving to server");
            }
        });
        */
    },

    handle_save_response: function (data, textStatus, jqXHR) {
        // TODO: provide some sort of visual feedback to the user.
        return;
    }
});
