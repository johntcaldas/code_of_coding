"use strict";

window.COC.views.Welcome = Backbone.View.extend({

    log_tag: "welcome_view",


    initialize: function () {

        // Initialize "instance" variables.
        this.welcome_tab_div_dom_id = "welcome_tab_content";
        this.inline_ckeditor = null;
        this.content_url = COC.server_url_root + "/content/welcome_tab";

        this.render();

        // Grab references to the elements we're going to be manipulating.
        this.elements = {
            welcome_tab_div : this.$el.find("#" + this.welcome_tab_div_dom_id)
        };

        // Load content for this tab from the server.
        this.get_tab_content_from_server();
    },

    render: function () {
        // Render the welcome tab.
        var template = templates["handlebars/tabs/welcome.handlebars"];
        var welcome_html = template();
        this.$el.html(welcome_html);
    },

    get_tab_content_from_server: function () {
        $.ajax({
            contentType: "application/json",
            url: this.content_url,
            type: "GET",
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
                this.elements.welcome_tab_div.html(data["html"]);
                this.enable_edit_mode();
            }.bind(this),
            error: function() {
                alert("error saving to server");
            }
        });
    },

    enable_edit_mode: function () {

        // Make the content editable only if a user is logged in.
        if(!COC.session_token) {
            return;
        }

        // This property tells CKEditor to not activate every element with contenteditable=true element.
        // TODO: this sucker probably belongs at a more global level (body_container/main/global/etc) than in this view
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

        return;
    }
});
