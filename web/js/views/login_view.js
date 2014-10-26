"use strict";

window.COC.views.Login = Backbone.View.extend({

    log_tag: "login_view",

    // Backbone's dictionary of events.
    events: {
      "click #login_btn": "login_btn_click"
    },

    // The list of elements we'll be manipulating from this view.
    elements: {
        login_modal: null,
        username_txt: null,
        password_txt: null,
        login_btn: null,
        post_blog_nav_li: null,
        alert_view: null
    },

    initialize: function () {
        this.render();

        // Grab references to the elements we're going to be manipulating.
        this.elements.login_modal = this.$el.find("#login_modal");
        this.elements.username_txt = this.$el.find("#username_txt");
        this.elements.password_txt = this.$el.find("#password_txt");
        this.elements.login_btn = this.$el.find("#login_btn");
        this.elements.post_blog_nav_li = $("#post_blog_nav_li");
        this.elements.alert_view = new COC.views.Alert({el: this.$el.find("#login_alert_attach_point")});

        // Focus the username field once the modal is showing.
        this.elements.login_modal.on("shown.bs.modal", function () {
            this.elements.username_txt.focus();
        }.bind( this ));

        // Enter key submits after typing in the password.
        this.elements.password_txt.keypress(function(e) {
            if(e.which == 13) {
                // enter pressed
                this.login_btn_click();
            }
        }.bind( this ));
    },

    render: function () {
        var template = templates["handlebars/login.handlebars"];
        var html = template();
        this.$el.html(html);
    },

    show_modal: function () {
        this.elements.login_modal.modal();
    },

    login_btn_click: function() {
        // Validate input
        var username = this.elements.username_txt.val();
        if(!username || username == null || username == "") {
            this.elements.alert_view.show_alert("Please enter a username.", "alert-danger");
            return;
        }

        var password = this.elements.password_txt.val();
        if(!password || password == null || password == "") {
            this.elements.alert_view.show_alert("Please enter a password.", "alert-danger");
            return;
        }

        var data = JSON.stringify({
            "username": username,
            "password": password
        });

        // Set button to loading text
        this.elements.login_btn.button("loading");

        var url = COC.server_url_root + "/authenticate/";

        $.ajax({
            contentType: "application/json",
            url: url,
            data: data,
            type: "POST",
            dataType: "json",
            success: this.handle_login_response.bind( this ),
            error: function() {
                alert("error logging")
            }
        });
    },

    handle_login_response: function(data, textStatus, jqXHR) {

        // Reset button text
        setTimeout(function () {
            this.elements.login_btn.button("reset");
        }.bind(this), 300);

        if(!data.success) {
            COC.log.error(this.log_tag + " Login unsuccessful.");
            this.elements.alert_view.show_alert("Login unsuccessful.", "alert-danger");
            return;
        }

        var token = data.token;
        if (!token || token == null || token.length < 5) {
            COC.log.error(this.log_tag + " Did not get a good token back from the server.");
            this.elements.alert_view.show_alert("Username or password incorrect.", "alert-danger");
            return;
        }

        // Set cookie with the session token. It will expire at the same time the token expires on the server, using
        // the "expires" we get from the server. Note: not sure what timezone implications are here.
        var expires_iso8601_string = data.expires;
        $.cookie("session_token", token, { expires: new Date(expires_iso8601_string) });

        // "Log in". Note: Some code duped in main.js. Could common "login" functionality that doesn't live in a view.
        COC.session_token = token;
        this.elements.login_modal.modal("hide");
        this.elements.post_blog_nav_li.removeClass("hidden");
    }
});