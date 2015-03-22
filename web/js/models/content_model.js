"use strict";

COC.models.Content = Backbone.Model.extend({

    idAttribute: "content_id",

    defaults: {
        _id: null,
        content_id: null,
        html: null,
        date: null
    },

    initialize: function(){},

    // Override backbone's "save" because we want to be able to run cross-domain.
    // See http://stackoverflow.com/questions/7644767/backbone-js-use-different-urls-for-model-save-and-fetch
    // (Ted's answer)
    save: function(attributes, options) {
        var url = COC.server_url_root + "/content/";
        options = _.defaults((options || {}),
            {
                url: url,
                headers: { "X-AuthToken": COC.session_token }
            });

        return Backbone.Model.prototype.save.call(this, attributes, options);
    },

    url : function() {
        // In this case, POST to "/content" and PUT to "/content/<content_id>"
        var the_url = this._id === undefined ? "/content/" : "/content/" + this.content_id;
        return the_url;
    }
});

COC.models.ContentCollection = Backbone.Collection.extend({

    model: COC.models.Content,
    url: COC.server_url_root + "/content/",

    fetch: function() {
        $.get(this.url, this.handle_server_response.bind( this ));
    },

    handle_server_response: function(data) {
        this.reset(data.content)
    }
});