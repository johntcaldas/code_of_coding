"use strict";

var CodeOfCoding = window.CodeOfCoding = (function () {
    // constructor
    var module = function () {
        // Make any of the compiled templates available as a "partial," or sub-template.
        Handlebars.partials = templates;

        var router = new Router();
        Backbone.history.start();
        module.router = router;


        var topLevelNavigation = new BodyContainer({el: $('#body_container_div')});
        module.topLevelNavigation = topLevelNavigation;
    };

    return module;
})();

$(document).ready(function() {
    var codeOfCoding = new CodeOfCoding();
});