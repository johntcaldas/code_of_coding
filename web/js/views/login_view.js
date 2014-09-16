"use strict";

window.COC.views.Login = Backbone.View.extend({

    log_tag: "login_view",

    // The list of elements we'll be manipulating from this view.
    elements: {
        login_modal: null
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

    },

    show_modal: function () {
        this.elements.login_modal.modal();
    },

    handle_login_response: function(data, textStatus, jqXHR) {

        if(!data.success) {
            COC.log.error(this.log_tag + " Login unsuccessful.");
            return;
        }


    }
});