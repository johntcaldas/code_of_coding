"use strict";

COC.models.Post = Backbone.Model.extend({

    idAttribute: "_id",

    defaults: {
        _id: null,
        title: null,
        summary: null,
        html: null,
        tags: null,
        date: null
    },

    initialize: function(){},

    // Override backbone's "save" because we want to be able to run cross-domain.
    // See http://stackoverflow.com/questions/7644767/backbone-js-use-different-urls-for-model-save-and-fetch
    // (Ted's answer)
    save: function(attributes, options) {
        var url = COC.server_url_root + "/posts/";
        options = _.defaults((options || {}),
            {
                url: url,
                headers: { "X-AuthToken": COC.session_token }
            });

        return Backbone.Model.prototype.save.call(this, attributes, options);
    },

    url : function() {
        // TODO: I don't think this method is ever called.
        // In this case, POST to "/posts" and PUT to "/post/:id"
        var the_url = this._id === undefined ? "/posts/" : "/posts/" + this._id;
        return the_url;
    }
});

COC.models.PostCollection = Backbone.Collection.extend({

    model: COC.models.Post,
    url: COC.server_url_root + "/posts/",

    fetch: function() {
        $.get(this.url, this.handle_server_response.bind( this ));
    },

    handle_server_response: function(data) {
        this.reset(data.posts)
    }
});