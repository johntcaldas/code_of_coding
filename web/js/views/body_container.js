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