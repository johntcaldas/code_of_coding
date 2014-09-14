window.COC.views.Story = Backbone.View.extend({

    log_tag: "story_view",

    initialize: function () {
        this.render();
    },

    render: function () {

        var template = templates['handlebars/story.handlebars'];
        var html = template();
        this.$el.html(html);

        var url = COC.serverUrlRoot + "/posts/";
        $.get(url, this.render_posts_from_server);
    },

    render_posts_from_server: function(data, textStatus, jqXHR) {

        if(!data.success) {
            COC.log.error(this.log_tag + " Get posts request unsuccessful.");
            return;
        }

        var posts = data.posts;

        var post_template = templates['handlebars/story_post.handlebars'];
        var post_attach_point_div = $('#story_posts_attach_point');

        for(var i = 0; i < posts.length; i++) {
            var post = posts[i];

            // Format the date.
            var momentDate = moment(post.date, moment.ISO_8601);
            var stringDate = momentDate.format("dddd, MMMM Do YYYY");

            var context = {
                "title": post.title,
                "html": post.html,
                "date": stringDate
            }
            var html = post_template(context);
            post_attach_point_div.append(html);
        }


    }
});