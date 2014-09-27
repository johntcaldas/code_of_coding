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
        alert_div: null,
        post_blog_nav_li: null
    },

    initialize: function () {
        this.render();
    },

    render: function () {

        var template = templates['handlebars/login.handlebars'];
        var html = template();
        this.$el.html(html);

        // Grab references to the elements we're going to be manipulating.
        this.elements.login_modal = $('#login_modal');
        this.elements.username_txt = $('#username_txt');
        this.elements.password_txt = $('#password_txt');
        this.elements.login_btn = $('#login_btn');
        this.elements.alert_div = $('#login_alert_div');
        this.elements.post_blog_nav_li = $('#post_blog_nav_li');
    },

    show_modal: function () {
        this.elements.login_modal.modal();
    },

    login_btn_click: function() {
        // Validate input
        var username = this.elements.username_txt.val();
        if(!username || username == null || username == "") {
            this.show_alert('Please enter a username.');
            return;
        }

        var password = this.elements.password_txt.val();
        if(!password || password == null || password == "") {
            this.show_alert('Please enter a password.');
            return;
        }

        var data = {
            "username": username,
            "password": password
        };

        // Set button to loading text
        this.elements.login_btn.button('loading');

        var url = COC.server_url_root + "/authenticate/";
        $.post(url, data, this.handle_login_response.bind(this), "json");
    },

    handle_login_response: function(data, textStatus, jqXHR) {

        // Reset button text
        setTimeout(function () {
            this.elements.login_btn.button('reset');
        }.bind(this), 300);

        if(!data.success) {
            COC.log.error(this.log_tag + " Login unsuccessful.");
            this.show_alert("Login unsuccessful.");
            return;
        }

        var token = data.token;
        if (!token || token == null || token.length < 5) {
            COC.log.error(this.log_tag + " Did not get a good token back from the server.");
            this.show_alert("Username or password incorrect.");
            return;
        }

        // Set cookie with the session token. It will expire at the same time the token expires on the server, using
        // the 'expires' we get from the server. Note: not sure what timezone implications are here.
        var expires_iso8601_string = data.expires;
        $.cookie('session_token', token, { expires: new Date(expires_iso8601_string) });

        // "Log in". Note: Some code duped in main.js. Could common "login" functionality that doesn't live in a view.
        COC.session_token = token;
        this.elements.login_modal.modal('hide');
        this.elements.post_blog_nav_li.removeClass('hidden');
    },

    show_alert: function(text) {
        var alert_div = this.elements.alert_div;

        alert_div.html(text);
        alert_div.addClass('show');
        alert_div.removeClass('hidden');

        // Set alert to fade out.
        setTimeout(function() {
            alert_div.fadeTo(500, 0).slideUp(500, function(){
                alert_div.removeClass('show');
                alert_div.addClass('hidden');
            });
        }, 5000);
    }
});