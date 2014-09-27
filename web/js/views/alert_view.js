// This view wraps a bootstrap js alert. It is initially hidden. The original intended consumer of this view is other
// views. (ie. it is a "sub"-view).
"use strict";

window.COC.views.Alert = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {

        // Render template html and place on page.
        //var html = '<div class="alert alert-danger hidden" role="alert"></div>';
        //this.$el.html(html);
        var alert_div = this.$el;
        alert_div.addClass('alert hidden');
        alert_div.attr('role', 'alert');
    },

    show_alert: function(text, bootstrap_class) {
        var alert_div = this.$el;

        alert_div.html(text);
        alert_div.addClass(bootstrap_class);
        alert_div.addClass('show');
        alert_div.removeClass('hidden');

        // Set alert to fade out.
        setTimeout(function() {
            alert_div.fadeTo(500, 0).slideUp(500, function() {

                // fadeTo and/or slideUp leave crumbs behind in the style. (eg. display: none; and opacity: 0)
                alert_div.removeAttr('style');

                alert_div.removeClass('show');
                alert_div.addClass('hidden');

                // Remove potentially used bootstrap classes
                alert_div.removeClass('alert-danger');
                alert_div.removeClass('alert-success');
            });
        }, 5000);
    }
});