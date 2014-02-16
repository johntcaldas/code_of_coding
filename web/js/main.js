(function () {

    var self = null,
        home_div = null,
        system_info_div = null;

    /*
    var TopLevelNavigation = Backbone.View.extend({

        id: "nav_container_div",

        events: {
            "click .icon":          "open",
            "click .button.edit":   "openEditDialog",
            "click .button.delete": "destroy"
        },

        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            return;
        }

    });*/

    var CodeOfCoding = window.CodeOfCoding = function() {this.initialize();};

    CodeOfCoding.prototype = {

        // Remove
        TEMPLATE_NAME: "",
        TEMPLATE_SELECTOR: "",


        initialize: function() {
            self = this;
            home_div = $('#home_div');
            system_info_div = $('#system_info_div');

            var main_template = templates['handlebars/home.handlebars'];
            var html = main_template();
            home_div.html(html);

            var system_info_template = templates['handlebars/system_info.handlebars'];
            var html = system_info_template();
            system_info_div.html(html);
        }

    }; // end prototype

})();

$(document).ready(function() {
    // Make any of the compiled templates available as a "partial," or sub-template.
    Handlebars.partials = templates;

    new CodeOfCoding();
});