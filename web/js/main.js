(function () {

    var self = null,
        home_div = null

    var CodeOfCoding = window.CodeOfCoding = function() {this.initialize();};

    CodeOfCoding.prototype = {

        TEMPLATE_NAME: "settings/workflow_group_association",
        TEMPLATE_SELECTOR: "#workflow-group-association-template",


        initialize: function() {
            self = this;
            home_div = $('#home');
            console.log("Hello World.");

            var main_template = templates['handlebars/home.handlebars'];
            var html = main_template();
            home_div.html(html);
        }

    }; // end prototype

})();

$(document).ready(function() {
    Handlebars.partials = templates;
    new CodeOfCoding();
});