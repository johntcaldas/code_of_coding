(function () {

    var self = null;

    /* Contains the topest level navigation elements (eg. home, systeminfo, about, contact etc) */
    var BodyContainer = Backbone.View.extend({

        /*id: "nav_container_div",*/

        events: {
            "click #home_div": "go_home",
            "click #system_info_div": "go_system_info"
        },

        home_div: $('#home_div'),
        system_info_div: $('#system_info_div'),

        initialize: function() {
            this.render();
        },

        render: function() {
            var template = templates['handlebars/body_container.handlebars'];
            var html = template();
            this.$el.html(html);
        },

        go_home: function() {
            if(!home_div.hasClass("active")) {
                system_info_div.removeClass("active");
                home_div.addClass("active");
            }
        },

        go_system_info: function() {
            if(!system_info_div.hasClass("active")) {
                home_div.removeClass("active");
                system_info_div.addClass("active");
            }
        }

    });


    var CodeOfCoding = window.CodeOfCoding = function() {this.initialize();};

    CodeOfCoding.prototype = {

        // Remove
        TEMPLATE_NAME: "",
        TEMPLATE_SELECTOR: "",


        initialize: function() {
            self = this;
            home_div = $('#home_div');
            system_info_div = $('#system_info_div');

            var TopLevelNavigation = new BodyContainer({el: $('#body_container_div')})

            /*
            var main_template = templates['handlebars/home.handlebars'];
            var html = main_template();
            home_div.html(html);

            var system_info_template = templates['handlebars/system_info.handlebars'];
            var html = system_info_template();
            system_info_div.html(html);
            */
        }

    }; // end prototype

})();

$(document).ready(function() {
    // Make any of the compiled templates available as a "partial," or sub-template.
    Handlebars.partials = templates;

    new CodeOfCoding();
});