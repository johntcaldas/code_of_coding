"use strict";

var CodeOfCoding = window.CodeOfCoding = (function () {
    // constructor
    var module = function () {
        // Make any of the compiled templates available as a "partial," or sub-template.
        Handlebars.partials = templates;

        module.server_url = 'http://127.0.0.1:5000';

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

    // Prove the model works. Pick up here.
    var sys = new SystemSummary();
    sys.on('change', function() {
        console.log(sys.toJSON());
    });


    sys.fetch();

});