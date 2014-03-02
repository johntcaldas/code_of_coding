"use strict";

(function () {
    // Make any of the compiled templates available as a "partial," or sub-template.
    Handlebars.partials = templates;

    var CodeOfCoding = window.COC = {
        router: {},
        views: {},
        models: {},
        serverUrlRoot: 'http://127.0.0.1:5000'
    }

})();
