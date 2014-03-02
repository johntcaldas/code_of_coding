"use strict";

/* Contains the topest level navigation elements (eg. home, systeminfo, about, contact etc) */
var BodyContainer = Backbone.View.extend({

    initialize: function() {
        this.render();

        window.COC.router.on('route:home', function() {
            // Calling show on the <a> of a nav tells bootstrap
            $('a[href="#home"]').tab('show');
        });
        window.COC.router.on('route:system_info', function() {
            $('a[href="#system_info"]').tab('show');
        });
        window.COC.router.on('route:story', function() {
            $('a[href="#story"]').tab('show');
        });
    },

    render: function() {
        var template = templates['handlebars/body_container.handlebars'];
        var html = template();
        this.$el.html(html);
    }
});