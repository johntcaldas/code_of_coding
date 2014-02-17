(function () {

    var self = null;

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