"use strict";

window.COC.views.Welcome = Backbone.View.extend({

    log_tag: "welcome_view",


    initialize: function () {

        // Initialize "instance" variables.
        //this.elements = {
        //};


        this.render();
    },

    render: function () {
        // Render the welcome tab.
        var template = templates["handlebars/tabs/welcome.handlebars"];
        var welcome_html = template();
        this.$el.html(welcome_html);
    }
});
