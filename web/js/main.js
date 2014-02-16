(function () {

    var self = null;

    /* Contains the topest level navigation elements (eg. home, systeminfo, about, contact etc) */
    var BodyContainer = Backbone.View.extend({

        initialize: function() {
            this.render();
        },

        render: function() {
            var template = templates['handlebars/body_container.handlebars'];
            var html = template();
            this.$el.html(html);
        }
    });


    var CodeOfCoding = window.CodeOfCoding = function() {initialize();};


    var initialize = function() {
        self = this;

        var TopLevelNavigation = new BodyContainer({el: $('#body_container_div')});
    };

})();

$(document).ready(function() {
    // Make any of the compiled templates available as a "partial," or sub-template.
    Handlebars.partials = templates;

    new CodeOfCoding();
});