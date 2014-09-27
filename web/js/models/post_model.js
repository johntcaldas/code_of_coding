"use strict";

COC.models.Post = Backbone.Model.extend({

    defaults: {
        _id: null,
        title: null,
        html: null,
        tags: null,
        date: null
    },

    initialize: function(){
        console.log("Music is the answer");
    },

    // Override backbone's 'save' because we want to be able to run cross-domain.
    // See http://stackoverflow.com/questions/7644767/backbone-js-use-different-urls-for-model-save-and-fetch
    // (Ted's answer)
    save: function(attributes, options) {
        var url = COC.server_url_root + "/posts/"; //this._id ? '/posts/' : '/posts/' + this._id;
        options = _.defaults((options || {}),
            {
                url: url,
                headers: { "X-AuthToken": COC.session_token }
            });

        return Backbone.Model.prototype.save.call(this, attributes, options);
    },

    url : function() {
        // In this case, POST to '/posts' and PUT to '/post/:id'
        var the_url = this._id === undefined ? '/posts/' : '/posts/' + this._id;
        return the_url;
    }
});

COC.models.PostCollection = Backbone.Collection.extend({
    model: COC.models.Post,
    url: "/posts/"
});